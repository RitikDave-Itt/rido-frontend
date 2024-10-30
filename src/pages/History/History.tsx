import HistorySkeleton from "@/components/skeleton/HistorySkeleton";
import useHistory from "./useHistory";

const History = () => {
  const { historyList, loadMore, hasMore ,loading} = useHistory();

  if(loading){
    return(
        <HistorySkeleton/>
    )
  }

  return (
    <div className="flex justify-center p-6 bg-background-light h-full w-full ">
      <div className="w-full md:w-[60%] ">
        <h1 className="w-full text-2xl font-semibold mb-4 text-secondary">
          History
        </h1>
        <div className="space-y-4">
          {historyList.map((ride) => (
            <div
              key={ride.id}
              className=" flex p-2 border border-background-medium rounded-lg shadow-sm bg-background-light cursor-pointer hover:bg-gray-100"
            >
              <div className="w-[70%] ml-5">
                <p className="text-gray-700">
                  <span className="font-normal text-gray-500">Pickup:</span>{" "}
                  {ride.pickupAddress}
                </p>
                <p className="text-gray-700">
                  <span className="font-normal text-gray-500">
                    Destinition:
                  </span>{" "}
                  {ride.destinationAddress}
                </p>
                <p className="text-gray-700">
                  <span className="font-normal text-gray-500">Vehicle:</span>{" "}
                  {ride.vehicleType}
                </p>
                <p className="text-gray-700">
                  <span className="font-normal text-gray-500">Status:</span>
                  <span
                    className={`font-semibold ml-1 ${
                      {
                        Completed: "text-green-500",
                        Canceled: "text-red-500",
                        Failed: "text-yellow-500",
                      }[ride.status]
                    }`}
                  >
                    {ride.status}
                  </span>
                </p>
              </div>
              <div className="flex-grow flex flex-col justify-center items-center">
               { ride.status==="Completed" && <p className="text-center text-base text-gray-800 font-bold">
                    ₹ {ride.amount.toFixed(2)}
                </p>}
                <p className="font-normal text-gray-800 text-center">
                    {new Date(ride.pickupTime).toLocaleTimeString("en-IN", {
                      timeZone: "Asia/Kolkata",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                </p>
                <p className="  font-normal text-gray-800  text-center">
                    {new Date(ride.pickupTime).toLocaleDateString("en-IN", {
                      timeZone: "Asia/Kolkata",
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex justify-center items-center">
        {hasMore && (
          <button
            className="mt-1 p-2 bg-primary text-white rounded-md flex items-center justify-center w-1/4"
            onClick={loadMore}
          >
            loadMore
          </button>
        )}
        </div>
      </div>
    </div>
  );
};

export default History;
