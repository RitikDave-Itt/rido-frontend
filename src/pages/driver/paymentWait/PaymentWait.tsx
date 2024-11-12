import { AppDispatch, RootState } from '@/redux/store';
import  { useEffect } from 'react';
import { checkRideTransactionStatus } from '@/redux/thunks/driveThunk';
import { useDispatch, useSelector } from 'react-redux';

const PaymentWait = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {acceptedRide} = useSelector((state:RootState)=>state.drive)
    useEffect(() => {
        const fetchTransactionStatus = async () => {
            if (acceptedRide?.id) {
                await dispatch(checkRideTransactionStatus(acceptedRide.id));
            }
        };

        fetchTransactionStatus();
    }, [acceptedRide]); 
    return (
        <div className="flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-2 text-yellow-600">Awaiting Payment from Rider...</h3>
            <p className="mb-4 text-gray-700">
                Hang tight! The rider is in the process of completing the payment.
            </p>
            <img src="/images/paymentWait.gif" alt="Waiting for Payment" className="w-64 h-64 mb-4" />
        </div>
    );
};

export default PaymentWait;
