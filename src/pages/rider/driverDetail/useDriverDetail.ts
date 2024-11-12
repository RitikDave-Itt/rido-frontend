import { resetRide } from '@/redux/slices/rideSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { checkRideStatus, getRideAndDriverDetail } from '@/redux/thunks/rideThunks';
import  { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useDriverDetail = () => {
    const { driver, rideData } = useSelector((state: RootState) => state.ride);
    const dispatch = useDispatch<AppDispatch>();
    const [isModalOpen , setIsModalOpen] = useState<boolean>(false);



    useEffect(()=>{
      dispatch(getRideAndDriverDetail())
      
  
    },[])


    const makePayment = async () => {
      try {  
        const response = await dispatch(checkRideStatus()).unwrap();
    
        if (response === "Unpaid") {
          toast.success("Reached Destination");
        } else {
          toast.warning(response);
        }
      } catch (error) {
        dispatch(resetRide()); 
        toast.error("Driver canceled the ride");
        console.log('Error:', error);
      }
    };


  return (
    {
        driver,
        rideData,
        isModalOpen,
        setIsModalOpen,
        makePayment

    }

)
}

export default useDriverDetail