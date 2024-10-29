import { checkRideStatus } from './../../../redux/thunks/rideThunks';
import { AppDispatch, RootState } from '@/redux/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useRideRequestWait = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { rideRequestId, driver, rideStatus, error } = useSelector((state: RootState) => state.ride);
  
    useEffect(() => {
      let intervalId: NodeJS.Timeout | undefined;
      let elapsedSeconds = 0;

      if (rideStatus === "Requested" &&rideStatus!==null) {
          intervalId = setInterval(() => {
              elapsedSeconds += 10; 
                  dispatch(checkRideStatus());
              if (elapsedSeconds >= 200) {
                  clearInterval(intervalId);
              }
          }, 10000); 
      }
     
      
      return () => {
          if (intervalId) clearInterval(intervalId); 
      };
    
  }, [dispatch, rideStatus]); 

    return {
        driver,
        rideStatus, 
        rideRequestId,
        error, 
    };
};

export default useRideRequestWait;
