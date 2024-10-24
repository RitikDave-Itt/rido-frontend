import MyLocationIcon from '@mui/icons-material/MyLocation';
import useHome from './useHome';
import SearchIcon from '@mui/icons-material/Search';
import FareList from './components/FareList';
import ConfirmRideRequest from './components/ConfirmRideRequest';
import Modal from '@/components/Modal';
import { useEffect, useState } from 'react';

const Home = () => {
  const {
    pickupLocationInput,
    destinationInput,
    fetchNearbyPlaces,
    handlePickupChange,
    nearbyPlaces,
    handleCurrentLocationPickup,
    handleDestinationChange,
    handleLocationSelection,
    activeInput,
    wrapperRef,
    setActiveInput,
    fareList,
    handleGetFareList,
    selectedVehicle,
    pickupLocation,
    isConfirmRideOpen,
    setIsConfirmRideOpen,
    destination  } = useHome();

   

console.log(pickupLocation,"ritik")
  return (
    <div className="flex flex-col md:flex-row justify-evenly mt-4 w-[95%] h-full ">
      <div className=" flex flex-col items-center  p-4 h-full md:w-1/2 w-full " ref={wrapperRef}>
        <h2 className="text-2xl font-bold mb-6 w-full">Where's Next? Set Your Ride</h2>

        <div className='mb-4 w-[80%]'>
          <div className="mb-4 relative w-full">
            <label className="block text-sm font-medium text-gray-700" htmlFor="pickup">
              Pickup Location
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                id="pickup"
                value={pickupLocationInput}
                onChange={handlePickupChange}
                onFocus={() => setActiveInput("pickup")}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-primary"
                placeholder="Enter pickup location"
              />
              <button
                onClick={() => fetchNearbyPlaces("pickup")}
                className="mt-1 p-2 bg-primary text-white rounded-md flex items-center justify-center"
                title="Search pickup location"
              >
                <SearchIcon />
              </button>
              <button
                onClick={handleCurrentLocationPickup}
                className="mt-1 p-2 bg-primary text-white rounded-md flex items-center justify-center"
                title="Get current location"
              >
                <MyLocationIcon />
              </button>
            </div>

            {activeInput === "pickup" && nearbyPlaces.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-auto overflow-x-hidden shadow-lg">
                {nearbyPlaces.map((place, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleLocationSelection(place, "pickup")}
                  >
                    {place.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mb-4 relative w-full">
            <label className="block text-sm font-medium text-gray-700" htmlFor="destination">
              Destination
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                id="destination"
                value={destinationInput}
                onChange={handleDestinationChange}
                onFocus={() => setActiveInput("destination")}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-primary"
                placeholder="Enter destination"
              />
              <button
                onClick={() => fetchNearbyPlaces("destination")}
                className="mt-1 p-2 bg-primary text-white rounded-md flex items-center justify-center"
                title="Search destination"
              >
                <SearchIcon />
              </button>
            </div>

            {activeInput === "destination" && nearbyPlaces.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-auto overflow-x-hidden shadow-lg">
                {nearbyPlaces.map((place, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleLocationSelection(place, "destination")}
                  >
                    {place.name}
                  </li>
                ))}
              </ul>
            )}


          </div>
          <div className='flex justify-center w-full'>
            <button
              className="bg-primary mt-5 text-white py-2 px-4 rounded-md hover:bg-primary_hover w-[90%] "
              onClick={handleGetFareList}
            >
              Get Fare List
            </button>
          </div>
        </div>
        {pickupLocation&& <div>

<p>{pickupLocation.name}</p>

</div>}
{
  destination&&<div>
    {destination.name}
    </div>
}

{selectedVehicle&&<div>
  {selectedVehicle}
  </div>}

      </div>
      <div className='md:w-1/2 w-full'>
        {fareList ? <FareList fareList={fareList} /> :

          <div className=" flex items-center justify-center h-full ">
            <img src="/images/taxi.gif" alt="" />
          </div>

        }</div>
        
     
        {isConfirmRideOpen && (
      <Modal
        isOpen={isConfirmRideOpen}  // or whatever prop your modal requires
        onClose={() => setIsConfirmRideOpen(false)}
      >
        <ConfirmRideRequest isconfirmed/>
      </Modal>
    )}

    </div>
  );
};

export default Home;
