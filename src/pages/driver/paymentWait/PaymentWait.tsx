import { resetDrive } from '@/redux/slices/driveSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PaymentWait = () => {
    const { rideTransactionStatus, rideTransactionDetail } = useSelector((state: RootState) => state.drive);
    const navigate = useNavigate();

    const dispatch = useDispatch<AppDispatch>();

    const gotoHome = ()=>{
        dispatch(resetDrive())
        navigate("/")
    }


        
    



    return (
        <div className="flex flex-col items-center p-6 h-full">
            {rideTransactionStatus === "Completed" ? (
                <div className="flex flex-col items-center h-[70%]">
                    <h3 className="text-2xl font-bold mb-2 text-green-600">Payment Successful!</h3>
                    <p className="mb-4 text-gray-700">
                        Your rider has completed the payment. Thank you for your patience!
                    </p>
                    <p className='w-full text-center text-3xl mb-5 font-bold text-gray-700'>
                             ₹ {rideTransactionDetail?.amount.toFixed(2)}
                        </p>
                    <img src="/images/paymentSuccess.gif" alt="Payment Success" className="w-1/3 mb-9" />
                    <div className="mb-6 text-center text-xl flex flex-col items-center  font-semibold text-gray-800 ">
                        <p className='w-full'>
                            Rider: <span className="font-normal text-gray-600">{rideTransactionDetail?.riderName}</span>
                        </p>
                        <p className='w-full' >
                            Transaction ID: <span className="font-normal text-gray-600">{rideTransactionDetail?.transactionId}</span>
                        </p>
                        
                    </div>

                    <button
                        onClick={gotoHome}
                        className="mt-4 bg-primary text-white py-2 px-6 rounded-md hover:bg-primary_hover w-[80%]"
                    >
                        Go to Main Page
                    </button>
                </div>
            ) : (
                <div className="flex flex-col items-center">
                    <h3 className="text-2xl font-bold mb-2 text-yellow-600">Awaiting Payment from Rider...</h3>
                    <p className="mb-4 text-gray-700">
                        Hang tight! The rider is in the process of completing the payment.
                    </p>
                    <img src="/images/paymentWait.gif" alt="Waiting for Payment" className="w-64 h-64 mb-4" />
                </div>
            )}
        </div>
    );
};

export default PaymentWait;
