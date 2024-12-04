import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-background-light min-h-screen p-8 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-center ">Privacy Policy</h1>
      

        <section className="bg-background-medium p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-3xl font-semibold mb-4 ">Introduction</h2>
          <p className="text-gray-600">
            Welcome to Rido. Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your information when you use our services.
          </p>
        </section>

        <section className="bg-background-medium p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-3xl font-semibold mb-4 ">Information We Collect</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Personal Information: Name, email address, phone number, etc.</li>
            <li>Location Data: We may collect information about your location to provide our services.</li>
            <li>Payment Information: We collect payment details when you make transactions.</li>
          </ul>
        </section>

        <section className="bg-background-medium p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-3xl font-semibold mb-4 ">How We Use Your Information</h2>
          <p className="text-gray-600">
            We use the information we collect for various purposes, including:
          </p>
          <ul className="list-disc list-inside text-gray-600">
            <li>To provide and maintain our service.</li>
            <li>To notify you about changes to our service.</li>
            <li>To allow you to participate in interactive features of our service.</li>
            <li>To provide customer support.</li>
          </ul>
        </section>

        <section className="bg-background-medium p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-3xl font-semibold mb-4 ">Data Security</h2>
          <p className="text-gray-600">
            We take the security of your data seriously and implement appropriate measures to protect it. However, no method of transmission over the internet or electronic storage is 100% secure.
          </p>
        </section>

        <section className="bg-background-medium p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-3xl font-semibold mb-4 ">Changes to This Privacy Policy</h2>
          <p className="text-gray-600">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
          </p>
        </section>

        <section className="bg-background-medium p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-3xl font-semibold mb-4 ">Contact Us</h2>
          <p className="text-gray-600">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <p className="text-gray-600 mb-2">
            <strong className="">Email:</strong> <a href="mailto:ritikdave9@gmail.com" className=" hover:_hover">ritikdave9@gmail.com</a>
          </p>
          <p className="text-gray-600">
            <strong className="">Phone:</strong> <a href="tel:+919587769429" className=" hover:_hover">+91 9587769429</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
