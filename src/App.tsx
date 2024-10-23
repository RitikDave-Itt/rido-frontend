
import { ToastContainer, Bounce } from 'react-toastify';
import './App.css'
import { Provider } from 'react-redux';

import AllRoutes from './Routes/AllRoutes'
import 'react-toastify/dist/ReactToastify.css';
import store from '@/redux/store';




function App() {

  return (
    <>
      <Provider store={store}>

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
</Provider>,


    </>
  )
}

export default App
