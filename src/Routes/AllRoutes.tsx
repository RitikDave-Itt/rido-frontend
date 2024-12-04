import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "../components/layout/Layout";

import History from "@/pages/History/History";
import Wallet from "@/pages/wallet/Wallet";
import About from "@/pages/about/About";
import Contact from "@/pages/contact/Contact";
import PrivacyPolicy from "@/pages/privacyPolicy/PrivacyPolicy";
import NotFound from "@/pages/notFound/NotFound";
import UserProfile from "@/pages/userProfile/UserProfile";
import ConditionalRender from "@/Routes/ConditionalRender";

const AllRoutes = () => {
  
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route
        path="/"
        element={
          <Layout>
           <ConditionalRender />
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
        path="/wallet"
        element={
          <Layout>
            <Wallet />
          </Layout>
        }
      />
      <Route
        path="/about"
        element={
          <Layout>
            <About />
          </Layout>
        }
      />
      <Route
        path="/contact"
        element={
          <Layout>
            <Contact />
          </Layout>
        }
      />
      <Route
        path="/privacy-policy"
        element={
          <Layout>
            <PrivacyPolicy />
          </Layout>
        }
      />
      <Route path="/*" element={<NotFound />} />
      <Route
        path="/profile"
        element={
          <Layout>
            <UserProfile />
          </Layout>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
