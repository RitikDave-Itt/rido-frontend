import useDriverRideStartPage from "./useDriverRideStartPage";
import { format } from "date-fns";
import Input from "@/components/ui/Input";

const DriverRideStartPage = () => {
  const {
    acceptedRide,
    otp,
    setOtp,
    handleVerifyOtp,
    handleMapRedirect,
    driveStatus,
    handleCancel,
    handleRideCompleted,
  } = useDriverRideStartPage();

  return (
    <div className="flex flex-col md:flex-row w-full justify-evenly">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Ride Request Details</h2>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">Detail</th>
              <th className="border border-gray-300 p-2 text-left">
                Information
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">
                <strong>Pickup Address:</strong>
              </td>
              <td className="border border-gray-300 p-2">
                {acceptedRide?.pickupAddress}
              </td>
            </tr>
            {acceptedRide?.pickupTime && (
              <tr>
                <td className="border border-gray-300 p-2">
                  <strong>Pickup Time:</strong>
                </td>
                <td className="border border-gray-300 p-2">
                  {format(
                    new Date(
                      new Date(acceptedRide?.pickupTime).getTime() +
                        5.5 * 60 * 60 * 1000
                    ),
                    "eeee, MMMM do yyyy, h:mm a"
                  )}
                </td>
              </tr>
            )}
            <tr>
              <td className="border border-gray-300 p-2">
                <strong>Destination Address:</strong>
              </td>
              <td className="border border-gray-300 p-2">
                {acceptedRide?.destinationAddress}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">
                <strong>Price:</strong>
              </td>
              <td className="border border-gray-300 p-2">
                INR {acceptedRide?.price.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">
                <strong>Vehicle Type:</strong>
              </td>
              <td className="border border-gray-300 p-2">
                {acceptedRide?.vehicleType}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">
                <strong>Distance:</strong>
              </td>
              <td className="border border-gray-300 p-2">
                {acceptedRide?.distanceInKm.toFixed(2)} km
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">
                <strong>User Name:</strong>
              </td>
              <td className="border border-gray-300 p-2">
                {acceptedRide?.userName}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">
                <strong>Gender:</strong>
              </td>
              <td className="border border-gray-300 p-2">
                {acceptedRide?.gender}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">
                <strong>Phone Number:</strong>
              </td>
              <td className="border border-gray-300 p-2">
                {acceptedRide?.phoneNumber}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="md:w-[40%] md:flex md:flex-col items-center justify-center md:h-full">
        <div className="w-[40%]">
          <img src="/images/map.gif" alt="" />
        </div>
        <button
          onClick={handleMapRedirect}
          className="mt-4 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary_hover w-full"
        >
          Navigation On Map
        </button>
        {driveStatus === "InProgress" && (
          <button
            onClick={handleRideCompleted}
            className="mt-4 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary_hover w-full"
          >
            Ride Completed
          </button>
        )}

        {driveStatus === "Accepted" && (
          <div className="flex flex-col w-full items-center mt-4">
            <h3 className="font-bold w-full text-xl mt-4">Verify Otp</h3>
            <Input
              type="tel"
              name="otp"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
              }}
              placeholder="Enter Otp"
              required={true}
            />

            <button
              onClick={handleVerifyOtp}
              className="mt-4 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary_hover w-full"
            >
              Verify OTP
            </button>
          </div>
        )}
        {
          driveStatus==="Accepted"&&<>
          <div className="w-full">
            <button 
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 w-full"
              onClick={handleCancel}
              >
              Cancel Ride
            </button>

          </div>
          </>
        }
      </div>
    </div>
  );
};

export default DriverRideStartPage;
