import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import DriverRideStartPage from '@/pages/driver/startRide/DriverRideStartPage';
import PaymentWait from '@/pages/driver/paymentWait/PaymentWait';
import DriverHome from '@/pages/driver/driverHome/DriverHome';
import RideRequestWait from '@/pages/rider/rideRequestWait/RideRequestWait';
import DriverDetail from '@/pages/rider/driverDetail/DriverDetail';
import RidePaymentAndReview from '@/pages/rider/ridePaymentAndReview/RidePaymentAndReview';
import Home from '@/pages/rider/home/Home';
import PaymentDone from '@/pages/driver/paymentDone/PaymentDone';

const ConditionalRender: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.user);
    const { rideStatus } = useSelector((state: RootState) => state.ride);
    const { driveStatus } = useSelector((state: RootState) => state.drive);

    if (user?.role === "Driver") {
        if (driveStatus === "Accepted" || driveStatus === "InProgress") {
            return <DriverRideStartPage />;
        } else if (driveStatus === "Unpaid") {
            return <PaymentWait />;
        } 
        else if (driveStatus === "Completed") {
            return <PaymentDone />;
        }
        else {
            return <DriverHome />;
        }
    } else {
        if (rideStatus === "Requested") {
            return <RideRequestWait />;
        } else if (rideStatus === "Accepted" || rideStatus === "InProgress") {
            return <DriverDetail />;
        } else if (rideStatus === "Unpaid") {
            return <RidePaymentAndReview />;
        } else {
            return <Home />;
        }
    }
};

export default ConditionalRender;
