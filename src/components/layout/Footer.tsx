import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-300 text-white py-3 mt-[2vh] w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="text-gray-900 text-sm font-semibold">
            © 2024 Rido App. All rights reserved.
          </div>
          <div className="flex space-x-6 text-gray-800">
            <Link to="/" className=" hover:text-blue-700 transition duration-300">
              Home
            </Link>
            <Link to="/contact" className=" hover:text-blue-700 transition duration-300">
              Contact
            </Link>
            <Link to="/privacy-policy" className=" hover:text-blue-700 transition duration-300">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
