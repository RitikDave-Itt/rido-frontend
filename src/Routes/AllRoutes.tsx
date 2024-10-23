import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/Home';

const AllRoutes = () => {
   
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
            
              <Home />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default AllRoutes;