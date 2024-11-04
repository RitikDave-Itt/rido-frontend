import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  return (
    <div className="flex flex-col h-[100vh] w-[100vw] overflow-y-auto">
          <Navbar />

    <main className=" flex-grow flex flex-col justify-center items-center bg-background-light ">

      {children}
    </main>
    <Footer />
  </div>
  
  );
};

export default Layout;
