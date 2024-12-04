import { resetDrive } from '@/redux/slices/driveSlice';
import { AppDispatch, RootState } from '@/redux/store';
import {   rideCompleted ,verifyOtp} from '@/redux/thunks/driveThunk';
import { cancelRideByDriver } from '@/Service/driverService';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { toast } from 'react-toastify';

const useDriverRideStartPage = () => {
    const {acceptedRide,driveStatus} = useSelector((state:RootState)=>state.drive);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const dispatch = useDispatch<AppDispatch>();


    const [otp,setOtp] = useState<string>("");

    const handleVerifyOtp = async () => {
        if (acceptedRide) {
          try {
            const resultAction = await dispatch(verifyOtp({ rideRequestId: acceptedRide.id, otp }));
            const result = resultAction.payload; 
      
            if (result === true) {
              toast.success("OTP Verified Successfully");
            } else {
              toast.error("OTP Verification Failed");
            }
          } catch (error) {
            console.error("Error verifying OTP:", error);
            toast.error("An error occurred while verifying OTP. Please try again.");
          }
        }
      };
      
      const handleMapRedirect = () => {
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${acceptedRide?.pickupLatitude},${acceptedRide?.pickupLongitude}&destination=${acceptedRide?.destinationLatitude},${acceptedRide?.destinationLongitude}`;
        window.open(googleMapsUrl, '_blank');
    };

    const handleRideCompleted = async () => {
        const result = await dispatch(rideCompleted())
        if(result){
            toast.success("Ride Completed Successfully");
            
        }
        else{
            toast.error("Ride Completion Failed")
        }
    } 

    const handleCancel = async()=>{
      const result = await cancelRideByDriver();
      if(result){
        toast.success("Ride Canceled Successfully");
        dispatch(resetDrive());
      }
      else{
        toast.error("Ride Cancellation Failed");
      }
    }
    
  return (
    {
        acceptedRide,
        otp,
        setOtp,
        isModalOpen,
        setIsModalOpen,
        handleVerifyOtp,
        handleMapRedirect,
        driveStatus,
        handleRideCompleted,
        handleCancel
        
    }
  )
}

export default useDriverRideStartPage