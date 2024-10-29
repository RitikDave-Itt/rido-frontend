
import { LinearProgress } from '@mui/material';
import useRideRequestWait from './useRideRequestWait';
import { useEffect, useState } from 'react';

const RideRequestWait = () => {

    const {driver} = useRideRequestWait()
    const [progress, setProgress] = useState(0);


    useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prevProgress) =>
          prevProgress >= 100 ? 100 : prevProgress + (100 / 30) 
        );
      }, 1000);
  
      return () => {
        clearInterval(timer);
      };
    }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      
    <div className="flex flex-col items-center justify-center h-[60%] space-y-4">
      <h3 className="text-lg text-center text-secondary">Waiting for Driver to Accept Your Request</h3>
      <LinearProgress
          variant="determinate"
          value={progress}
          className="w-3/4 h-2 rounded bg-secondary mt-2"
          color="primary"
        />
      <div className="w-full h-[40%]flex items-center justify-center overflow-hidden">
        <img
          src="/images/waiting.gif"
          alt="No driver assigned"
          className="object-contain w-full h-full"
        />
      </div>
      
     
    </div>
    
    
  </div>
  );
};

export default RideRequestWait;
