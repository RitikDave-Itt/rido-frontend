import MyLocationIcon from '@mui/icons-material/MyLocation';
import useHome from './useHome';
import SearchIcon from '@mui/icons-material/Search';
import FareList from './components/FareList';
import ConfirmRideRequest from './components/ConfirmRideRequest';
import Modal from '@/components/Modal';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LinearScaleIcon from '@mui/icons-material/LinearScale';



const Home = () => {
  const {
    pickupLocationInput,
    destinationInput,
    handlePickupChange,
    nearbyPlaces,
    wrapperRef,
    handleDestinationChange,
    destination,
    fetchNearbyPlaces,
    pickupLocation,
    handleCurrentLocationPickup,
    handleLocationSelection,
    activeInput,
    setActiveInput,
    fareList,
    handleGetFareList,

    selectedVehicle,
    handleConfirmRideRequest,
    isConfirmRideOpen,
    setIsConfirmRideOpen,
    handleSelectVehicle } = useHome();



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
                onKeyDown={(e) => e.key === "Enter" && fetchNearbyPlaces("pickup")}   
                autoComplete='off'  
                       

                
                className={`mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-primary ${(pickupLocation != null) ? 'border-blue-500' : 'border-gray-300'}`}
                placeholder="Enter pickup location"
              />
              <button
                onClick={() => fetchNearbyPlaces("pickup")}
                className="mt-1 p-2 bg-primary text-white rounded-md flex items-center justify-center hover:bg-primary_hover"
                title="Search pickup location"

              >
                <SearchIcon />
              </button>
              <button
                onClick={handleCurrentLocationPickup}
                className="hover:bg-primary_hover mt-1 p-2 bg-primary text-white rounded-md flex items-center justify-center"
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
                onKeyDown={(e) => e.key === "Enter" && fetchNearbyPlaces("destination")}            
                className={`mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-primary ${(destination != null) ? 'border-blue-500' : 'border-gray-300'}`}
                placeholder="Enter destination"
              />
              <button
                onClick={() => fetchNearbyPlaces("destination")}
                className="hover:bg-primary_hover mt-1 p-2 bg-primary text-white rounded-md flex items-center justify-center"
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
        <div className='w-[80%] flex flex-col'>
          {pickupLocation && 
          <div className='w-full mt-4 flex'>
            <LocationOnIcon />


            <p><span className='text-gray-500 mr-3 ml-1'>Pickup location: </span>{pickupLocation.name}</p>

          </div>
}


            {
              destination &&
              <>
                <LinearScaleIcon sx={{ transform: "rotate(90deg)" }} />
                <div className='w-full flex'>
                  <LocationCityIcon />

                  <p><span className='text-gray-500 mr-3 ml-1'>Destinition location: </span>{destination.name}</p>

                </div></>
            }
          </div>

          {selectedVehicle && <div>
          </div>}

        </div>
        <div className='md:w-1/2 w-full'>
          {fareList ? <FareList fareList={fareList} selectedVehicle={selectedVehicle} handleSelectVehicle={handleSelectVehicle} /> :

            <div className="flex flex-col items-center justify-center h-full w-full ">
              

              <img src="/images/taxi2.gif" alt="" className='w-[75%]' />
            </div>

          }</div>


        {isConfirmRideOpen && (
          <Modal
            isOpen={isConfirmRideOpen}
            onClose={() => setIsConfirmRideOpen(false)}
          >
            <ConfirmRideRequest
              pickupLocation={pickupLocation!.name!}
              destination={destination!.name!}
              selectedVehicle={selectedVehicle!.vehicle!}
              fare={selectedVehicle!.price!}
              onConfirm={handleConfirmRideRequest}
              onCancel={() => setIsConfirmRideOpen(false)



              }

            />
          </Modal>
        )}

      </div>
      );
};

      export default Home;
