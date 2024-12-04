import { resetRide } from '@/redux/slices/rideSlice';
import { checkRideStatus } from './../../../redux/thunks/rideThunks';
import { AppDispatch, RootState } from '@/redux/store';
import { cancelRideByRider } from '@/Service/rideServices';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useRideRequestWait = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { rideRequestId, driver, rideStatus, error } = useSelector((state: RootState) => state.ride);

    useEffect(() => {
      let intervalId: NodeJS.Timeout | undefined;
      let elapsedSeconds = 0;

      if (rideStatus === "Requested" &&rideStatus!==null) {
          intervalId = setInterval(() => {
              elapsedSeconds += 10; 
              dispatch(checkRideStatus())
              .unwrap()
              .catch(() => {
                clearInterval(intervalId); 
                dispatch(resetRide()); 
                toast.error("driver canceled Ride");
              });
              if (elapsedSeconds >= 200) {
                  clearInterval(intervalId);
              }
          }, 10000); 
      }
     
     
      
      return () => {
          if (intervalId) clearInterval(intervalId); 
      };
    
  }, [dispatch, rideStatus]); 
  const handleCancelRide = async () => {
    try {
      const result = await cancelRideByRider(); 
  
      if (!result) {
        
        console.error("Failed to cancel the ride.");
        
      }
      else{
        toast.success("Ride Cancelled Successfully");
        dispatch(resetRide());
      }
    } catch{

        toast.error("Something went wrong");
        
      
    }
  };
  
    return {
        driver,
        rideStatus, 
        rideRequestId,
        error, 
        handleCancelRide
    };
};

export default useRideRequestWait;
