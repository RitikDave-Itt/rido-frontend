import React from 'react';

interface ConfirmRideRequestProps {
  pickupLocation: string;
  destination: string;
  selectedVehicle: string;
  fare: number;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmRideRequest: React.FC<ConfirmRideRequestProps> = ({
  pickupLocation,
  destination,
  selectedVehicle,
  fare,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-[100%]  mx-auto md:w-[70%]">
      <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">Confirm Ride Request</h3>
      
      <div className="mb-4 text-lg">
        <strong className="text-gray-700">Pickup Location:</strong> {pickupLocation}
      </div>

      <div className="mb-4 text-lg">
        <strong className="text-gray-700">Destination:</strong> {destination}
      </div>

      <div className="mb-4 text-lg">
        <strong className="text-gray-700">Vehicle Type:</strong> {selectedVehicle}
      </div>

      <div className="mb-6 text-lg text-blue-600 font-semibold">
        <strong>Fare:</strong> ₹{Math.ceil(fare!)}
      </div>

      <div className="flex justify-end space-x-4">
        <button 
          className="px-4 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition-colors"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button 
          className="px-4 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition-colors"
          onClick={()=>{
            onConfirm();
            onCancel();
          }}
        >
          Confirm Ride
        </button>
      </div>
    </div>
  );
};

export default ConfirmRideRequest;
