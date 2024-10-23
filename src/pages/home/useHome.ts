import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'; 
import { IAddressResponse } from '@/Interfaces/location';
import { setLoading } from '@/redux/slices/loadingSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { getAddress } from '@/Service/locationService';


const useHome = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [pickupLocation, setPickupLocation] = useState('');
    const [destination, setDestination] = useState('');
    const [location , setLocation] = useState<[number,number]|null>(null);
    const [addressData, setAddressData] = useState<IAddressResponse | null>(null);
    const loading = useSelector((state: RootState) => state.loading.loading); 


  
    const fetchAddressData = async () => {
        if (location) {
          dispatch(setLoading(true));
          try {
            
            const response = await getAddress(location[0].toString(), location[1].toString());
    
            
            setAddressData(response);
          } catch (error) {
            console.error('Error fetching address data:', error);
            
          } finally {
            dispatch(setLoading(false)); 
          }
        }
      };
    
      useEffect(() => {
        if (location) {
          fetchAddressData(); 
        }
      }, []); 
    const handlePickupChange = (e :React.ChangeEvent<HTMLInputElement>) => {
      setPickupLocation(e.target.value);
    };
  
    const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setDestination(e.target.value);
    };
  
    const handleGetCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation([latitude, longitude]);
          },
          (error) => {
            console.error("Error getting location: ", error);
            alert("Failed to retrieve location. Please ensure GPS is enabled.");
          }
        );
      } else {
        alert("Geolocation is not supported by your browser.");
      }
    };
    const token = Cookies.get('accessToken');
    
  return (
{
    pickupLocation,
    setPickupLocation,
    destination,
    setDestination,
    location,
    setLocation,
    handlePickupChange,
    token,
    loading,
    address:addressData?.displayName,
    handleDestinationChange,
    handleGetCurrentLocation
}  )
}

export default useHome