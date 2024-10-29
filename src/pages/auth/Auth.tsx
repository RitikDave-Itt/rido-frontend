import Login from '@/pages/auth/components/login/Login';
import Signup from '@/pages/auth/components/signup/Signup';
import React, { useState } from 'react';


const Auth: React.FC = () => {
  const [activeTab, setActiveTab] = useState('login'); 

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col md:flex-row bg-background-light p-6 rounded-lg shadow-md w-full max-w-4xl mx-auto h-[80%] ">
      
      <div className='md:w-3/4 w-full overflow-y-auto'>
        <div className="flex justify-between ">
          <button
            onClick={() => handleTabChange('login')}
            className={`w-1/2 py-2 font-semibold rounded-l-md ${
              activeTab === 'login' ? 'bg-primary text-white' : 'bg-gray-200 text-black'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => handleTabChange('signup')}
            className={`w-1/2 py-2 font-semibold rounded-r-md ${
              activeTab === 'signup' ? 'bg-primary text-white' : 'bg-gray-200 text-black'
            }`}
          >
            Signup
          </button>
        </div>
        <div className=" flex justify-center items-center mt-4 h-[90%] ">
          {activeTab === 'login' ? <div className='h-full w-full flex '><Login /></div> : <div className='h-full w-full flex '><Signup /></div> }
        </div>
      </div>

      <div className="hidden md:flex md:w-1/2 justify-center items-center p-4">
  <img
    src="/images/auth2.gif"
    alt="Auth Illustration"
    className="rounded-lg w-full h-full object-contain"
  />
</div>

      
    </div>
  );
};

export default Auth;
