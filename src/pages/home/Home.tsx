
import MyLocationIcon from '@mui/icons-material/MyLocation';
import useHome from './useHome';

const Home = () => {

  const { pickupLocation,handlePickupChange, destination, handleDestinationChange, handleGetCurrentLocation } = useHome();
 

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
     
 
    </div>
  );
};

export default Home;
