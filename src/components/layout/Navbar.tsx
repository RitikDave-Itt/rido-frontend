import Modal from '../Modal';
import Auth from '../../pages/Auth';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const openModal = () => setIsModalOpen(true);   
  const closeModal = () => setIsModalOpen(false); 
  const navItems = {
    home: '/',
    history: '/history',
    about: '/about',
  };

  return (
    <nav className="bg-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
        <div className=" flex flex-shrink-0 text-2xl font-bold text-white items-center h-full">
              RIDO
            </div>
          <div className="flex  text-xl space-x-6 items-center w-[50%] justify-evenly ">
            {Object.entries(navItems).map(([key, value]) => (
            <Link
            key={key}
            to={value}
            className=" flex justify-center items-center text-white hover:text-primary border-b-2 border-transparent hover:border-primary h-[80%]"
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </Link>
          
            ))}
          </div>
          <div className="flex items-center">
            <button
              onClick={openModal}  
              className="text-white bg-primary hover:bg-primary_hover px-4 py-2 rounded-lg"
            >
              Login
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <Auth /> 
        </Modal>
      )}
    </nav>
  );
};

export default Navbar;
