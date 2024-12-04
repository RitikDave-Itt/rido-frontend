import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative flex flex-col h-[100vh] w-[100vw] overflow-y-auto ">
      <header>
        <Navbar />
      </header>
      <main className=" flex-grow bg-background-light ">
        {children}

      </main>
      <Footer />

    </div>
  );
};

export default Layout;
