
import { ToastContainer, Bounce } from 'react-toastify';
import './App.css'

import AllRoutes from './Routes/AllRoutes'
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from './redux/thunks/userThunks';
import { AppDispatch } from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import Cookies from 'js-cookie';




function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [refreshToken,setRefreshToken] = useState<string|null>(null)



  useEffect(()=>{
    if(refreshToken!=null){
    dispatch(getUser());
    }
  
  },[refreshToken])

  useEffect(()=>{
    const accessToken = Cookies.get("refreshToken");
    if(accessToken){
      setRefreshToken(accessToken)
    }
  },[])

  
  



  return (
    <>

<BrowserRouter>
<AllRoutes/>
    </BrowserRouter>

<ToastContainer
  position="top-right"
  autoClose={5000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="light"
  transition={Bounce} 
/>


    </>
  )
}

export default App
