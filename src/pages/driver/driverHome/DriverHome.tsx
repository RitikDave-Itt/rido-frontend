import React from "react";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import useDriverHome from "./useDriverHome";
import { format } from 'date-fns';
import Modal from "@/components/Modal";
import ConfirmAcceptRide from "./components/ConfirmAcceptRide";


const DriverHome: React.FC = () => {
  const {
    loading,
    setLoading,
    rideRequests,
    getRideRequestList,
    location,
    selectRide,
    modalIsOpen,
    setModalIsOpen,
    setSelectedRide,
    selectedRide,
    confirmRideRequest,

  } = useDriverHome();

  return (
    <div className="flex flex-col-reverse md:flex-row justify-evenly mt-4 w-[95%] h-full bg-background-light">
      <div className="flex flex-col items-center p-4 h-full md:w-1/2 w-full ">
      {/* <img src="images/nearbyRides.png" className="w-[40%] drop-shadow-lg  " alt="" /> */}
        <h2 className="text-2xl font-bold mb-6 w-full">Nearby Rides</h2>


        {rideRequests && rideRequests.length > 0 ? (
          <div className="space-y-4 w-full">
            {rideRequests.map((request) => (
              <div
                key={request.id}
                onClick={() => selectRide(request)}
                className={`flex items-center p-4 shadow-md rounded-md cursor-pointer ${selectedRide?.id === request.id ? 'bg-gray-200' : 'bg-background-light'
                  }`}
              >
                <div className="flex flex-col w-[80%]">
                  <p><span className="text-gray-500">Destination:</span> {request.destinationAddress}</p>

                  <p>
                    <span className="text-gray-500">Pickup Time:</span> {
                      format(
                        new Date(new Date(request.pickupTime).getTime() + 5.5 * 60 * 60 * 1000),
                        'eeee, MMMM do yyyy, h:mm a'
                      )
                    }
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${request.pickupLatitude},${request.pickupLongitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View on Google Maps
                  </a>

                </div>
                <div className="flex  flex-col justify-center items-center w-[20%] h-full">
                  {" "}
                  <p>
                    Fare:{" "}
                    <span className="font-medium">₹{request.price}</span>
                    <p className="font-bold">{request.distanceInKm.toFixed(2)} km</p>

                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No nearby rides available.</p>
        )}
        <div className="flex justify-center w-full mb-4 mt-6">
          <button
            className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary_hover w-full"
            onClick={getRideRequestList}
          >
            Refresh Rides <MyLocationIcon />
          </button>
        </div>
      </div>

      <div className="md:w-1/3  w-full flex justify-center items-center md:flex-col ">
        <p className="font-bold text-2xl text-gray-500 mb-5 text-center" style={{ fontFamily: "'Georgia', serif" }}>Your Drive, Their Comfort <br /> Ride Safely, Arrive Proudly.</p>
        <img
          src="/images/homeGif.gif"
          alt="Home"
          className="object-contain md:w-1/2 w-1/3"
        />
      </div>
      <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <ConfirmAcceptRide onConfirm={confirmRideRequest} rideRequest={selectedRide!} onCancel={() => setModalIsOpen(false)} />
      </Modal>
    </div>
  );
};

export default DriverHome;
