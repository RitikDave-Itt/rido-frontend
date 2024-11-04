import { IRideRequest } from '@/Interfaces/ride';
import React from 'react';


interface ConfirmAcceptRideProps {
  rideRequest: IRideRequest; 
  onConfirm: () => void; 
  onCancel: () => void; 
}

const ConfirmAcceptRide: React.FC<ConfirmAcceptRideProps> = ({
  rideRequest,
  onConfirm,
  onCancel,
}) => {
  
  return (
    <div className="p-4 border rounded-lg shadow-md bg-background-light">
      <h2 className="text-lg font-bold mb-4">Confirm Accept Ride</h2>
      <p>
        Are you sure you want to accept this ride request?
      </p>
      <div className="mt-4">
        <p>
          <strong>Destination:</strong> {rideRequest.destinationAddress}
        </p>
        <p>
          <strong>Fare:</strong> ₹{rideRequest.price}
        </p>
        <p>
          <strong>Pickup Time:</strong> {new Date(rideRequest.pickupTime).toLocaleString()}
        </p>
      </div>
      <div className="flex justify-between mt-6">
        <button
          onClick={onConfirm}
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
        >
          Confirm
        </button>
        <button
          onClick={onCancel}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmAcceptRide;
