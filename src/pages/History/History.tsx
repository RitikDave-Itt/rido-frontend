import useHistory from './useHistory';



const History = () => {
    const {
        historyList,
        loadMore,
        hasMore,

    } = useHistory();

    return (
        <div className="flex justify-center p-6 bg-background-light h-full w-full ">
            <div className='w-full md:w-[60%] justify-center'>
            <h1 className="w-full text-2xl font-semibold mb-4 text-secondary">History</h1>
                <div className="space-y-4">
                    {historyList.map((ride) => (
                        <div key={ride.id} className=" flex p-2 border border-background-medium rounded-lg shadow-sm bg-background-light cursor-pointer hover:bg-gray-100">

                            <div className='w-[70%] ml-5'>
                                <p className="text-gray-700">
                                    <span className="font-normal text-gray-500">Pickup:</span>  {ride.pickupAddress}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-normal text-gray-500">Destinition:</span>  {ride.destinationAddress}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-normal text-gray-500">Vehicle:</span>  {ride.vehicleType}
                                </p>
                            </div>
                            <div className='flex-grow'>
                                <p className="  text-secondary text-center">
                                    <span className=" text-gray-800 font-bold">₹ {ride.amount.toFixed(2)}</span>
                                </p>
                                <p className="  text-secondary  text-center">
                                    <span className="font-normal text-gray-800">{new Date(ride.pickupTime).toLocaleDateString()}</span>
                                </p>
                                <p className="  text-secondary  text-center" >
                                    <span className="font-normal text-gray-800">{new Date(ride.pickupTime).toLocaleTimeString()}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                {hasMore && (<button
                    className="mt-1 p-2 bg-primary text-white rounded-md flex items-center justify-center"
                    onClick={loadMore}
                >loadMore</button>)}
            </div>
        </div>
    );
};

export default History;
