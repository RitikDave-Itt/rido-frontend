import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "@/pages/rider/home/Home";
import RideRequestWait from "@/pages/rider/rideRequestWait/RideRequestWait";
import DriverDetail from "@/pages/rider/driverDetail/DriverDetail";
import DriverHome from "@/pages/driver/driverHome/DriverHome";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import DriverRideStartPage from "@/pages/driver/startRide/DriverRideStartPage";
import { useEffect } from "react";
import RidePaymentAndReview from "@/pages/rider/ridePaymentAndReview/RidePaymentAndReview";
import History from "@/pages/History/History";
import PaymentWait from "@/pages/driver/paymentWait/PaymentWait";
import Wallet from "@/pages/wallet/Wallet";
import ProtectedRoute from "./ProtectedRoute";

const AllRoutes = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { rideStatus } = useSelector((state: RootState) => state.ride);
  const { driveStatus ,acceptedRide} = useSelector((state: RootState) => state.drive);
  const navigate = useNavigate();
  const location = useLocation(); 

  
  useEffect(() => {
    
    if (location.pathname === "/"||location.pathname==="/driver-home") {
      if (user?.role === "Driver") {
        if (driveStatus === "Accepted" || driveStatus==="InProgress") {
          navigate("/driver/start-ride");
        } else if (driveStatus == "Completed") {
          navigate("/payment-wait");
        }
      } else {
        if (rideStatus === "Requested") {
          navigate("/ride-request-waiting");
        } else if (rideStatus === "Accepted"||rideStatus==="InProgress") {
          navigate("/driver-detail");
        }
        else if(rideStatus==="Completed"){
          navigate("/payment-review")
        }
       
        else{
          navigate("/")
        }
      }
    }
  }, [user, driveStatus, rideStatus, navigate, location.pathname,acceptedRide]); 

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            {user?.role === "Driver" ? 
                <DriverHome />
             :
              <Home />
            }
          </Layout>
        }
      />
      <Route
        path="/ride-request-waiting"
        element={
          <Layout>
            <ProtectedRoute condition={rideStatus === "Requested"}>
            <RideRequestWait />
            </ProtectedRoute>
          </Layout>
        }
      />
      <Route
        path="/driver-detail"
        element={
          <Layout>
            <ProtectedRoute condition={rideStatus==="Accepted"||rideStatus==="InProgress"}>
            <DriverDetail />
            </ProtectedRoute>
          </Layout>
        }
      />
      <Route
        path="/driver-home"
        element={
          <Layout>
            <DriverHome />
          </Layout>
        }
      />
      <Route
        path="/driver/start-ride"
        element={
          <Layout>
            <ProtectedRoute condition={driveStatus=== "Accepted"||driveStatus==="InProgress"}>
            <DriverRideStartPage />
            </ProtectedRoute>
          </Layout>
        }
      />
      <Route
        path="/payment-review"
        element={
          <Layout>
            <ProtectedRoute condition={rideStatus === "Completed"}>

            <RidePaymentAndReview />
            </ProtectedRoute>
          </Layout>
        }
      />
      <Route
        path="/history"
        element={
          <Layout>
            <History />
          </Layout>
        }
      />
       <Route
        path="/payment-wait"
        element={
          <Layout>
            <ProtectedRoute condition={driveStatus === "Completed"}>
            <PaymentWait />
            </ProtectedRoute>

          </Layout>
        }
      />
         <Route
        path="/wallet"
        element={
          <Layout>
            <Wallet />
          </Layout>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
