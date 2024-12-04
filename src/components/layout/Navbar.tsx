import Modal from '../Modal';
import Auth from '@/pages/auth/Auth';
import { Link } from 'react-router-dom';
import { Home, History, Info, Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { Menu, MenuItem } from '@mui/material';
import useNavbar from './useNavbar';
import { AccountCircle, Wallet, ExitToApp } from '@mui/icons-material';

const Navbar = () => {
  const {
    user,
    isModalOpen,
    anchorEl,
    openModal,
    closeModal,
    handleMenuOpen,
    handleMenuClose,
    handleLogout,
    isMenuOpen,
    toggleMenu,
  } = useNavbar();

  

  return (
    <nav className="bg-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-2">
        <div className="flex justify-between h-16 items-center ">
          <Link to="/" className=" flex items-center text-2xl font-bold text-white w-[7rem]">
            <img src="/images/logo.png" alt="Logo" />
          </Link>

          <div className="hidden lg:flex text-xl space-x-6 items-center w-[50%] justify-evenly">
            <Link
              to="/"
              className="py-2 flex justify-center items-center text-white hover:text-primary border-b-2 border-transparent hover:border-primary h-[80%]"
            >
              <Home className="mr-2" />
              Home
            </Link>
            <Link
              to="/history"
              className="py-2 flex justify-center items-center text-white hover:text-primary border-b-2 border-transparent hover:border-primary h-[80%]"
            >
              <History className="mr-2" />
              History
            </Link>
            <Link
              to="/about"
              className=" py-2 flex justify-center items-center text-white hover:text-primary border-b-2 border-transparent hover:border-primary h-[80%]"
            >
              <Info className="mr-2" />
              About
            </Link>
          </div>

          <div className="hidden lg:flex items-center">
            {user ? (
              <>
                <p className="text-white mr-3">{user.firstName}</p>
                <div className="cursor-pointer w-[40px] aspect-square rounded-full overflow-hidden" onClick={handleMenuOpen}>
                  <img src="/images/avatar.jfif" alt="User avatar" className="object-cover" />
                </div>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
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
                  <MenuItem onClick={handleLogout}>
                    <ExitToApp className="mr-2" />
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <button
                onClick={openModal}
                className="py-1 px-5 rounded-md text-xl text-white bg-primary hover:bg-primary_hover"
              >
                Log In / Sign Up
              </button>
            )}
          </div>

          <button
            className="text-white lg:hidden"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
          </button>
        </div>

        <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-gray-700 space-y-4 py-4`}>
          <Link to="/" className="block text-white hover:text-primary">
            Home
          </Link>
          <Link to="/history" className="block text-white hover:text-primary">
            History
          </Link>
          
          <Link to="/profile" className="text-white flex items-center">
                      Profile
                    </Link>
          <Link to="/wallet" className="text-white flex items-center">
                      Wallet
                    </Link>
                    <Link to="/about" className="block text-white hover:text-primary">
            About
          </Link>
          {user ? (
            <>
              <button onClick={handleLogout} className="block text-white hover:text-primary mt-2">
                Logout
              </button>
            </>
          ) : (
            <button onClick={openModal} className="block text-white hover:text-primary mt-2">
              Log In / Sign Up
            </button>
          )}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Auth />
      </Modal>
    </nav>
  );
};

export default Navbar;
