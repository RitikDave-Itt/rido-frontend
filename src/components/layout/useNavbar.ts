import { AppDispatch, RootState } from '@/redux/store';
import { logoutUser } from '@/redux/thunks/userThunks';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const useNavbar = () => {
    const { user } = useSelector((state: RootState) => state.user);
    const [isModalOpen, setIsModalOpen] = useState(!user);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const dispatch = useDispatch<AppDispatch>();
  
    const openModal = () => setIsModalOpen(true);   
    const closeModal = () => setIsModalOpen(!user); 
  
    useEffect(() => {
      if (user) {
        closeModal();
      }
      else{
        setIsModalOpen(true);
      }
      
    }, [user]);
  
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
  
    const handleLogout =   () => {
      dispatch(logoutUser());
      handleMenuClose();
    };
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
      setMenuOpen(!isMenuOpen);
    };
  return (

{
    user,
    isModalOpen,
    anchorEl,
    openModal,
    closeModal,
    handleMenuOpen,
    handleMenuClose,
    handleLogout,
    toggleMenu,
    isMenuOpen,

})
}

export default useNavbar