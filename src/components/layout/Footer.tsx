import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-300 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="text-secondary text-sm">
            Rido app

          </div>
          <div className="flex space-x-6">
            <Link to="/" className=" text-black hover:text-blue-500 ">
              Home
            </Link>
       
            <Link to="/" className=" text-black hover:text-blue-500 ">
              Contact
            </Link>
            <Link to="/" className=" text-black hover:text-blue-500 ">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
