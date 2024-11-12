import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import { useLocation } from 'react-router-dom';
import "@/pageTransitions.css"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // const location = useLocation();


  return (
    <div className="flex flex-col h-[100vh] w-[100vw] overflow-y-auto">
          <Navbar />
          {/* <TransitionGroup>
          <CSSTransition key={location.key} timeout={200} classNames="page"> */}

    <main className=" flex-grow flex flex-col justify-center items-center bg-background-light ">

      {children}
    </main>
    {/* </CSSTransition>
    </TransitionGroup> */}
    <Footer />
  </div>
  
  );
};

export default Layout;
