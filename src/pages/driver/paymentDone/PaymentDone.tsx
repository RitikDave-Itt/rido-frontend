import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { resetDrive } from '@/redux/slices/driveSlice';


const PaymentDone = () => {

    const {  rideTransactionDetail } = useSelector((state: RootState) => state.drive);

    const dispatch = useDispatch<AppDispatch>();


    const handleGoHome = async ()=>{
        dispatch(resetDrive());
    }

    return (
        <div className="flex flex-col items-center mt-5">
            <h3 className="text-2xl font-bold mb-2 text-green-600">Payment Successful!</h3>
            <p className="mb-4 text-gray-700">
                Your rider has completed the payment. Thank you for your patience!
            </p>
            <p className='w-full text-center text-3xl mb-5 font-bold text-gray-700'>
                ₹ {rideTransactionDetail?.amount.toFixed(2)}
            </p>
            <img src="/images/paymentSuccess.gif" alt="Payment Success" className="w-1/3 mb-9" />
            <div className="mb-6 text-center text-xl flex flex-col items-center font-semibold text-gray-800">
                <p className='w-full'>
                    Rider: <span className="font-normal text-gray-600">{rideTransactionDetail?.riderName}</span>
                </p>
                <p className='w-full'>
                    Transaction ID: <span className="font-normal text-gray-600">{rideTransactionDetail?.transactionId}</span>
                </p>
            </div>
            <button
                        onClick={handleGoHome}
                        className="mt-4 bg-primary text-white py-2 px-6 rounded-md hover:bg-primary_hover w-[80%] mb-5"
                    >
                        Go to Main Page
                    </button>
            
        </div>
    );
};

export default PaymentDone;
