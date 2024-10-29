import { IRideRequestForDriver } from "@/Interfaces/drive";
import { setAcceptedRide } from "@/redux/slices/driveSlice";
import { AppDispatch } from "@/redux/store";
import { acceptRideRequest } from "@/redux/thunks/driveThunk";
import {   getRideList } from "@/Service/rideServices";
import { getGeoLocationCords } from "@/utils/getGeoLocationCords";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useDriverHome = () => {
  const [location, setLocation] = useState<[string, string] | null>(null);

  const [rideRequests, setRideRequests] = useState<IRideRequestForDriver[] | null>(null);

  const [selectedRide, setSelectedRide] = useState<IRideRequestForDriver | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const getLocationCoordinates = async () => {
    try {
      const locationCoorde = await getGeoLocationCords();
      setLocation(locationCoorde);
    } catch (error) {
      console.error("Error fetching address data:", error);
    }
  };

  const getRideRequestList = async () => {
    if (location) {
      try {
        const response = await getRideList(location[0], location[1]);
        setRideRequests(response);
      } catch (error) {
        console.error("Error fetching ride requests:", error);
      }
    }
  };

  useEffect(() => {
    getLocationCoordinates();
  }, []);

  useEffect(() => {
    if (location) {
      getRideRequestList();
    }
  }, [location]);

  const selectRide = (ride: IRideRequestForDriver) => {
    setSelectedRide(ride);
    setModalIsOpen(true);
  };

  const confirmRideRequest = async () => {
    try{
    if (selectedRide) {
      const result = await dispatch(acceptRideRequest(selectedRide?.id));

      if (result) {
        dispatch(setAcceptedRide(selectedRide));
        toast.success("Ride Accepted Successfully");
        navigate("/driver/start-ride");
      } else {
        toast.error("Error Accepting Ride")
        
      }
    }
}
    catch(error){
        console.error("Error Accepting Ride", error);
        toast.error("Error Accepting Ride");
        


    }
    finally{
        setModalIsOpen(false);
        setSelectedRide(null);
    }
  };
  return {
    loading,
    setLoading,
    rideRequests,
    getRideRequestList,
    location,
    selectRide,
    modalIsOpen,
    setModalIsOpen,
    setSelectedRide,
    selectedRide,
    confirmRideRequest,
  };
};

export default useDriverHome;
