import React from 'react';
import useDriverDetail from './useDriverDetail';

const DriverDetail: React.FC = () => {
  const {
    driver,
    rideData,
    makePayment
  } = useDriverDetail();
 
  if (!driver) {
    return (
      <div className="flex items-center justify-center h-screen text-secondary p-4">
        No driver assigned yet.
      </div>
    );
  }
  
  const googleMapsUrl = `https://www.google.com/maps?q=${driver.latitude},${driver.longitude}`;

  return (
    <div className="mt-5 flex flex-col md:flex-row items-center justify-center h-full w-full md:w-[60%] bg-background-light border border-background-medium rounded-lg shadow-lg space-y-4 md:space-y-0 md:space-x-4 p-4 md:p-6">
      
      <div className="flex flex-col w-full md:w-[70%] h-full p-4 md:mx-4">
        <div className="w-full h-full flex flex-col">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-secondary mb-4 text-center">Driver Details</h2>
            <div className="grid grid-cols-2 gap-y-2">
              <div className="font-medium text-gray-600 text-center">Name</div>
              <div className="text-black text-center">{driver.driverName}</div>

              <div className="font-medium text-gray-600 text-center">Mobile No:</div>
              <div className="text-black text-center">{driver.mobileNo}</div>

              <div className="font-medium text-gray-600 text-center">Vehicle Type:</div>
              <div className="text-black text-center">{driver.vehicleType}</div>

              {driver.latitude && driver.longitude && (
                <>
                  <div className="font-medium text-gray-600 text-center">Location:</div>
                  <div className="text-black text-center">
                    <a 
                      href={googleMapsUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-500 hover:underline"
                    >
                      {driver.latitude}, {driver.longitude}
                    </a>
                  </div>
                </>
              )}

              <div className="font-medium text-gray-600 text-center">OTP:</div>
              <div className="text-blue-500 font-bold text-center">{driver.otp}</div>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold text-secondary text-center">Ride Details</h3>
            <div className="grid grid-cols-2 gap-y-2 mt-2">
              <div className="font-medium text-gray-600 text-center">Pickup Address:</div>
              <div className="text-black text-center">{rideData?.pickupAddress}</div>

              <div className="font-medium text-gray-600 text-center">Destination Address:</div>
              <div className="text-black text-center">{rideData?.destinationAddress}</div>
            </div>
          </div>

          <button
            onClick={makePayment}
            className="mt-4 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary_hover w-full"
          >
            Check Status
          </button>
        </div>
      </div>

      <div className="flex md:w-[30%] w-full h-[200px] md:h-[60%]">
        <img 
          src="/images/driver.gif" 
          alt="Driver Image" 
          className="object-contain w-full  rounded-lg"
        />
      </div>
    </div>
  );
};

export default DriverDetail;
