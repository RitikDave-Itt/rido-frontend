import { VehicleType } from '../../../Interfaces/ride';
import React, { useEffect, useRef, useState } from "react";
import { IAddressResponse, INearbyLocation } from "@/Interfaces/location";
import { setLoading } from "@/redux/slices/loadingSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getAddress, getNearbyAddress } from "@/Service/locationService";
import { IFareList, ISelectedVehicle } from "@/Interfaces/ride";
import { getFareList } from "@/Service/rideServices";
import { toast } from "react-toastify";
import { requestRide } from '@/redux/thunks/rideThunks';
import { useNavigate } from 'react-router-dom';
import { getGeoLocationCords } from '@/utils/getGeoLocationCords';


const useHome = () => {
  const navigate = useNavigate();

  const wrapperRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch<AppDispatch>();
  const [pickupLocationInput, setPickupLocationInput] = useState("");
  const [destinationInput, setDestinationInput] = useState("");
  const [location, setLocation] = useState<[string,string] | null>(null);
  const [addressData, setAddressData] = useState<IAddressResponse | null>(null);
  const loading = useSelector((state: RootState) => state.loading.loading);
  const [nearbyPlaces, setNearbyPlaces] = useState<INearbyLocation[]>([]);
  const [destination, setDestinition] = useState<INearbyLocation | null>();
  const [pickupLocation, setPickupLocation] = useState<INearbyLocation | null>(
    null
  );
  const [selectedVehicle, setSelectedVehicle] = useState<ISelectedVehicle | null>(null);
  const [isConfirmRideOpen, setIsConfirmRideOpen] = useState<boolean>(false);

  const { user } = useSelector((state: RootState) => state.user);


  const [activeInput, setActiveInput] = useState<
    "pickup" | "destination" | null
  >(null);

  const [fareList, setFareList] = useState<IFareList | null>(null);





  const handleCurrentLocationPickup = async () => {
    if (addressData && location) {
      setPickupLocation({
        name: addressData.displayName,
        latitude: location[0].toString(),
        longitude: location[1].toString(),
        type: null,
      });
      setPickupLocationInput(addressData.displayName);
    }
  };

  const handleLocationSelection = (
    selection: INearbyLocation,
    type: "pickup" | "destination"
  ) => {
    if (addressData && location) {
      if (type == "destination") {
        setDestinition(selection);
        setDestinationInput(selection.name || "");
      }

      if (type == "pickup") {
        setPickupLocation(selection);
        setPickupLocationInput(selection.name || "");
      }
    }

    setNearbyPlaces([]);
  };

  const fetchAddressDataOnce = async () => {
    dispatch(setLoading(true));
    try {
      const currentLocationPoint = await getGeoLocationCords();
      setLocation(currentLocationPoint); 
  
      
      if (currentLocationPoint) {
        const response = await getAddress(
          currentLocationPoint[0], 
          currentLocationPoint[1]  
        );
  
        setAddressData(response);
        setPickupLocationInput(response.displayName);
      }
    } catch (error) {
      console.error("Error fetching address data:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  

  const fetchNearbyPlaces = async (type: "pickup" | "destination") => {
    if (addressData) {
      setNearbyPlaces([]);
      const Search = type === "pickup" ? pickupLocationInput : destinationInput;

      try {
        const nearbyResponse = await getNearbyAddress(
          Search,
          addressData.address
        );
        setNearbyPlaces(nearbyResponse as INearbyLocation[]);
      } catch (error) {
        console.error("Error fetching nearby places:", error);
      }
    }
  };

  useEffect(() => {
    if(user){
    fetchAddressDataOnce();
    }
  }, [user]);

  const handlePickupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!activeInput) {
      setActiveInput("pickup");
    }
    setPickupLocationInput(e.target.value);
  };

  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!activeInput) {
      setActiveInput("destination");
    }
    setDestinationInput(e.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setActiveInput(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setActiveInput]);

  const handleGetFareList = async () => {
    if (!pickupLocation) {
      toast.warning("Please select a pickup location");
      return;
    }

    if (!destination) {
      toast.warning("Please select a destinition location");

      return;
    }
    try {
      const response = await getFareList(
        `${pickupLocation?.latitude.toString()},${pickupLocation?.longitude.toString()}`,
        `${destination?.latitude},${destination?.longitude}`
      );
      
      console.log(response);
      setFareList(response);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSelectVehicle = 
    (vehicle: VehicleType, fare: number, estimatedTime: string | null) => {
      setSelectedVehicle({
        vehicle,
        price: fare,
        estimatedTime
      });
    }
  
  useEffect(()=>{
    if(selectedVehicle){
      setIsConfirmRideOpen(true);
    }
  },[selectedVehicle]);

  const handleConfirmRideRequest = async () => {
    if(destination && pickupLocation && selectedVehicle){

    try {
      
      const resultAction = await dispatch(requestRide(
        {destinationAddress:destination?.name,
        destinationLatitude:destination?.latitude,
        destinationLongitude:destination?.longitude,
        pickupAddress:pickupLocation?.name,
        pickupLatitude:pickupLocation?.latitude,
        pickupLongitude:pickupLocation?.longitude,
        vehicleType:selectedVehicle?.vehicle,
        pickupTime:new Date().toISOString()
      
      }));
    
      
      if (requestRide.fulfilled.match(resultAction)) {
        
        toast.success("Ride request successful");
        navigate("/ride-request-waiting"); 

      } else {
        
        toast.error("Ride request failed:");
      }
    } catch {
      
      toast.error("An error occurred:");
    }
  }
  };

  return {
    pickupLocationInput,
    setPickupLocationInput,
    destinationInput,
    setDestinationInput,
    location,
    setLocation,
    handlePickupChange,
    loading,
    nearbyPlaces,
    wrapperRef,
    address: addressData?.displayName,
    handleDestinationChange,
    destination,
    setDestinition,
    fetchNearbyPlaces,
    pickupLocation,
    setPickupLocation,
    handleCurrentLocationPickup,
    handleLocationSelection,
    activeInput,
    setActiveInput,
    fareList,
    handleGetFareList,
    
    setSelectedVehicle,
    selectedVehicle,
    handleConfirmRideRequest,
    isConfirmRideOpen,
    setIsConfirmRideOpen,
    handleSelectVehicle
  };
};

export default useHome;
