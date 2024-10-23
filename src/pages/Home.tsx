import React, { useState } from 'react';

import MyLocationIcon from '@mui/icons-material/MyLocation';

const Home = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [location , setLocation] = useState<[number,number]|null>(null);

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
  

  return (
    <div className="flex  justify-center items-center md:flex-row w-[90%] ">
      <div className="md:w-1/2 p-4 h-[70%]">
        <h2 className="text-2xl font-bold mb-4">Ride Booking</h2>
        <div className="mb-4">
  <label className="block text-sm font-medium text-gray-700" htmlFor="pickup">
    Pickup Location
  </label>
  <div className="flex space-x-2">
    <input
      type="text"
      id="pickup"
      value={pickupLocation}
      onChange={handlePickupChange}
      className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-primary"
      placeholder="Enter pickup location"
    />
    <button
      onClick={handleGetCurrentLocation}
      className="mt-1 p-2 bg-primary text-white rounded-md flex items-center justify-center"
      title="Get current location"
    >
        <MyLocationIcon/>
    </button>
  </div>
</div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="destination">
            Destination
          </label>
          <input
            type="text"
            id="destination"
            value={destination}
            onChange={handleDestinationChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-primary"
            placeholder="Enter destination"
          />
        </div>
      </div>
      {/* <div className="md:w-1/2 h-96 p-4">
        {location ? (
          <Map center={{ lat: location[0], lng: location[1] }} />
        ) : (
          <p className="text-gray-500">Location not available</p>
        )}
      </div> */}
 
    </div>
  );
};

export default Home;
