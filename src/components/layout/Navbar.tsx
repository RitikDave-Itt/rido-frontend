import Modal from '../Modal';
import Auth from '@/pages/auth/Auth';
import { Link } from 'react-router-dom';
import { Home, History, Info } from '@mui/icons-material';
import {  Menu, MenuItem } from '@mui/material';
import useNavbar from './useNavbar';
import { AccountCircle, Wallet, ExitToApp } from '@mui/icons-material';


const Navbar = () => {
 const {    user,
  isModalOpen,
  anchorEl,
  openModal,
  closeModal,
  handleMenuOpen,
  handleMenuClose,
  handleLogout} = useNavbar();

  return (
    <nav className="bg-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 ">
        <div className="flex justify-between h-16">
            <Link to="/" className="flex flex-shrink-0 text-2xl font-bold text-white items-center w-[7rem]"> <img src="/images/logo.png" alt="" /></Link>
            <div className="flex text-xl space-x-6 items-center w-[50%] justify-evenly">
      <Link
        to="/"
        className="flex justify-center items-center text-white hover:text-primary border-b-2 border-transparent hover:border-primary h-[80%]"
      >
        <Home className="mr-2" />
        Home
      </Link>
      <Link
        to="/history"
        className="flex justify-center items-center text-white hover:text-primary border-b-2 border-transparent hover:border-primary h-[80%]"
      >
        <History className="mr-2" />
        History
      </Link>
      <Link
        to="/about"
        className="flex justify-center items-center text-white hover:text-primary border-b-2 border-transparent hover:border-primary h-[80%]"
      >
        <Info className="mr-2" />
        About
      </Link>
    </div>
          <div className="flex items-center">
            {user ? (
              <>
                              <p className='text-white mr-3'> {user.firstName}</p>

              <div className=' cursor-pointer w-[40px] aspect-square rounded-full overflow-hidden hover:scale-100' >
                <img 
                  src="/images/avatar.jfif"

                  className=" scale-125 "
                  onClick={handleMenuOpen} 
                />
                </div>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                    <MenuItem onClick={handleMenuClose}>
        <Link to="/profile" className="text-black flex items-center">
          <AccountCircle className="mr-2" />
          Profile
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link to="/wallet" className="text-black flex items-center">
          <Wallet className="mr-2" />
          Wallet
        </Link>
      </MenuItem>
      <MenuItem onClick={handleLogout} className="flex items-center">
        <ExitToApp className="mr-2" />
        Logout
      </MenuItem>
                </Menu>
              </>
            ) : (
              <button
                onClick={openModal}
                className=" py-1 px-5 rounded-md text-xl text-white bg-primary hover:bg-primary_hover"
                
              >
                Log In / Sign Up
              </button>
            )}
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Auth /> 
      </Modal>
    </nav>
  );
};

export default Navbar;
