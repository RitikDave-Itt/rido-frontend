import { formatUTCPlus530 } from "@/utils/time";
import React from "react";
import { useSelector } from "react-redux";

const DetailRideBooking = ({ selectedRide }: any) => {
  
  const { bookingData, user } = selectedRide || {};
  console.log(user)
  const userData = useSelector((state: any) => state.user);


  return (
    <div className="w-full md:w-[40%] ml-8">
      {selectedRide ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-primary">Ride Details</h2>

          <div>
            <p>
              <strong>Pickup Address: </strong>
              {bookingData?.pickupAddress || "N/A"}
            </p>
            <p>
              <strong>Destination Address: </strong>
              {bookingData?.dropoffAddress || "N/A"}
            </p>
            <p>
              <strong>Vehicle Type: </strong>
              {bookingData?.vehicleType || "N/A"}
            </p>
            <p>
              <strong>Status: </strong>
              {bookingData?.status || "N/A"}
            </p>
            {bookingData?.status === "Completed" && (
              <p>
                <strong>Amount: </strong> ₹ {bookingData?.amount?.toFixed(2)}
              </p>
            )}
            <p>
  <strong>Pickup Time: </strong>
  {bookingData?.pickupTime ? formatUTCPlus530(bookingData.pickupTime) : "N/A"}
</p>
<p>
  <strong>Dropoff Time: </strong>
  {bookingData?.dropoffTime ? formatUTCPlus530(bookingData.dropoffTime) : "N/A"}
</p>
          </div>

          <div className="mt-6">
            <p>
              <strong> {userData.role==="User"? "Rider ":"Driver "}</strong>
              {user?.name }
            </p>
          </div>

       
        </div>
      ) : (
        <div className="text-center p-6">
          <p>Select a ride to view details</p>
        </div>
      )}
    </div>
  );
};

export default DetailRideBooking;
