import { setDriveStatus } from '@/redux/slices/driveSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { checkRideTransactionStatus, rideCompleted ,verifyOtp} from '@/redux/thunks/driveThunk';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const useDriverRideStartPage = () => {
    const {acceptedRide,driveStatus} = useSelector((state:RootState)=>state.drive);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const dispatch = useDispatch<AppDispatch>();

    const navigate = useNavigate();

    const [otp,setOtp] = useState<string>("");

    const handleVerifyOtp  = async() => {
        if(acceptedRide){

            const result = await dispatch(verifyOtp({ rideRequestId: acceptedRide.id, otp }));
            if(result){
            toast.success("Otp Verified Successfully")
            dispatch(setDriveStatus(""))

        }
        else{
            toast.error("Otp Verification Failed")
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
            dispatch(checkRideTransactionStatus({rideRequestId:acceptedRide!.id}))
            navigate("/payment-wait")
            
        }
        else{
            toast.error("Ride Completion Failed")
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
        handleRideCompleted
        
    }
  )
}

export default useDriverRideStartPage