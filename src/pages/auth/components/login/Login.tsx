import React from 'react';
import useLogin from './useLogin';
import Input  from '@/components/ui/Input';
import { LinearProgress } from '@mui/material';


const Login: React.FC = () => {
  const { email, setEmail,loading, password, setPassword, handleSubmit } = useLogin();

  return (
    <div className="bg-background-light p-6 rounded-lg w-full ">
           {loading && <LinearProgress />}

      <h2 className="text-2xl font-bold text-primary mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full"
          />
        </div>
        <div className="mb-4">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full"
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
