
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="bg-background-light  min-h-screen p-8 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-center">About Rido</h1>
        <p className="text-lg text-gray-600 text-center mb-12">
          Rido is your trusted companion for convenient, reliable rides. We make ride-sharing simple and accessible, so you can focus on what matters.
        </p>
        
        <section className=" p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-600 ">
            Rido was created to connect people with drivers quickly and affordably, ensuring safety and ease at every step. We are committed to offering a seamless experience for riders and drivers alike.
          </p>
        </section>

        <section className=" p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-3xl font-semibold mb-4">Key Features</h2>
          <ul className=" list-disc list-inside text-gray-600 ">
            <li>Instant booking and real-time tracking</li>
            <li>Secure payment options</li>
            <li>Reliable and professional drivers</li>
            <li>User-friendly interface</li>
          </ul>
        </section>

        <section className=" p-6 rounded-lg shadow-md text-gray-600 ">
          <h2 className="text-3xl font-semibold mb-4 text-black">Get in Touch</h2>
          <p className=" mb-4 ">
            Have questions or need help? Contact us, and we’ll be happy to assist.
          </p>
          <p className="">Email: ritikdave9@gmail.com</p>
          <p className="">Phone: +91 9587769429</p>
        </section>
      </div>
    </div>
  );
};

export default About;
