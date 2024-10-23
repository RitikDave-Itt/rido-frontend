import axiosRequest from '@/common/request';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(''); 

    try {
      const response = await axiosRequest({
        route: '/auth/login',
        method: 'POST',
        body: {
          email,
          password,
        },
      });

      console.log('Signup successful:', response);
      toast.success('login successful');

      
    } catch (error) {
      console.error('Signup error:', error);
      setError('An error occurred during signup. Please try again.');
      toast.error('Signup error');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="bg-background-light    p-6 rounded-lg w-full h-full ">
      <h2 className="text-2xl font-bold   text-primary mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
        
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block   w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-primary"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-primary"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary_hover w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
