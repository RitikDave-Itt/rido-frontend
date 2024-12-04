import { vehicleData } from "@/data/fareListVehicleData";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { IAddressResponse, INearbyLocation } from "@/Interfaces/location";
import { setLoading } from "@/redux/slices/loadingSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getAddress, getNearbyAddress } from "@/Service/locationService";
import { IFareList } from "@/Interfaces/ride";
import { getFareList } from "@/Service/rideServices";
import { toast } from "react-toastify";

const useHome = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch<AppDispatch>();
  const [pickupLocationInput, setPickupLocationInput] = useState("");
  const [destinationInput, setDestinationInput] = useState("");
  const [location, setLocation] = useState<[number, number] | null>(null);
  const [addressData, setAddressData] = useState<IAddressResponse | null>(null);
  const loading = useSelector((state: RootState) => state.loading.loading);
  const [nearbyPlaces, setNearbyPlaces] = useState<INearbyLocation[]>([]);
  const [destination, setDestinition] = useState<INearbyLocation | null>();
  const [pickupLocation, setPickupLocation] = useState<INearbyLocation | null>(
    null
  );
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [isConfirmRideOpen, setIsConfirmRideOpen] = useState<boolean>(false);

  const [activeInput, setActiveInput] = useState<
    "pickup" | "destination" | null
  >(null);

  const [fareList, setFareList] = useState<IFareList | null>(null);

  const handleSelectVehicleType = (type: string) => {
    setSelectedVehicle(selectedVehicle === type ? null : type);
  };

  const handleCurrentLocationPickup = () => {
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
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setLocation([latitude, longitude]);

            const response = await getAddress(
              latitude.toString(),
              longitude.toString()
            );
            setAddressData(response);
            setPickupLocationInput(response.displayName);
          },
          (error) => {
            console.error("Error getting location:", error);
            alert("Failed to retrieve location. Please ensure GPS is enabled.");
          }
        );
      } else {
        alert("Geolocation is not supported by your browser.");
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
    fetchAddressDataOnce();
  }, []);

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
    const handleClickOutside = (event) => {
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

      setFareList(response);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSelectVehicle = useCallback((vehicle: string) => {
    console.log("handle v call hua hau");
    setSelectedVehicle(vehicle); 
    setIsConfirmRideOpen(true); 
  },[]);

  useEffect(()=>{
    if(selectedVehicle){
      setIsConfirmRideOpen(true);
    }
  },[selectedVehicle]);

  const handleConfirmRideRequest = () => {
    console.log("rideRequest confirmed");
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
    handleSelectVehicleType,
    setSelectedVehicle,
    selectedVehicle,
    handleConfirmRideRequest,
    isConfirmRideOpen,
    setIsConfirmRideOpen,
    handleSelectVehicle
  };
};

export default useHome;
