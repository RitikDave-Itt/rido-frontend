
import { ToastContainer, Bounce } from 'react-toastify';
import './App.css'
import AllRoutes from './Routes/AllRoutes'
import 'react-toastify/dist/ReactToastify.css';



function App() {

  return (
    <>
    <AllRoutes/>

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
