import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="bg-background-light h-full p-8 flex flex-col items-center">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-center text-black">Contact Us</h1>
        <p className="text-lg text-gray-600 text-center mb-12">
          Rido is here to assist you with any questions or feedback. We value your input and aim to provide the best service possible.
        </p>

        <div className="bg-background-medium p-6 rounded-lg shadow-md text-center">
          <h2 className="text-3xl font-semibold mb-4 text-black">Get in Touch</h2>
          <p className="text-gray-600 mb-4">
            If you have questions, feedback, or need assistance, please reach out to us. Our support team is committed to helping you.
          </p>
          <p className="text-gray-600 mb-2">
            <strong className="text-black">Email:</strong> <a href="mailto:ritikdave9@gmail.com" className="text-black hover:text-black_hover">ritikdave9@gmail.com</a>
          </p>
          <p className="text-gray-600">
            <strong className="text-black">Phone:</strong> <a href="tel:+919587769429" className="text-black hover:text-black_hover">+91 9587769429</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
