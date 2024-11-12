import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="bg-background-light min-h-screen flex flex-col items-center justify-center p-8">
      <h2 className="text-4xl font-bold mb-4 text-primary text-center">Oops! Page Not Found</h2>
      <p className="text-lg text-gray-600 text-center mb-8">
        We couldn't find the page you were looking for.<br/> The URL might be incorrect.
      </p>
      <img 
        src="images/404.gif" 
        alt="404 Not Found" 
        className="w-1/2 md:w-1/3 lg:w-1/4" 
      />
      <div className="mt-8">
        <Link 
          to="/" 
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary_hover transition duration-200"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
