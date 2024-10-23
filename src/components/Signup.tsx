import React, { useState } from 'react';
import axiosRequest from './../common/request';
import { toast } from 'react-toastify';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    gender: 'male' as 'male' | 'female' | 'other',
    role: 'user' as 'user' | 'driver',
    licenseType: '',
    licenseNumber: '',
    vehicleModel: '',
    vehicleMake: '',
    vehicleRegistrationNumber: '',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (formData.password !== formData.confirmPassword) {
          alert('Passwords do not match');
          return;
        }
    
        setLoading(true); 
        setError(null); 
    
        try {
          
          const response = await axiosRequest({
            route: '/auth/register',
            method: 'POST',
            body: {
              email: formData.email,
              password: formData.password,
              firstName: formData.firstName,
              lastName: formData.lastName,
              phoneNumber: formData.phoneNumber,
              gender: formData.gender,
              role: formData.role,
              ...(formData.role === 'driver' && {
                licenseType: formData.licenseType,
                licenseNumber: formData.licenseNumber,
                vehicleModel: formData.vehicleModel,
                vehicleMake: formData.vehicleMake,
                vehicleRegistrationNumber: formData.vehicleRegistrationNumber,
              }),
            },
          });
    
          console.log('Signup successful:', response);
          toast.success('Signup successful');
          
        } catch (error) {
          console.error('Signup error:', error);
          setError('An error occurred during signup. Please try again.'); 
          toast.error('Signup error');
        } finally {
          setLoading(false); 
        }
      };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };
  
  const classString = "mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-primary";

  return (
    <div className="bg-background-light p-6 rounded-lg w-full h-full">
      <h2 className="text-2xl font-bold text-primary mb-2">Signup</h2>
      <form  onSubmit={handleSubmit} className='overflow-y-auto h-[80%]'>
        {currentStep === 1 && (
          <div>
            <div className="mb-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={classString}
                placeholder="First Name"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={classString}
                placeholder="Last Name"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={classString}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={classString}
                placeholder="Phone Number"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={classString}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={classString}
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={classString}
                placeholder="Confirm your password"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={classString}
              >
                <option value="user">User</option>
                <option value="driver">Driver</option>
              </select>
            </div>
          </div>
        )}

        {currentStep === 2 && formData.role === 'driver' && (
          <div>
            <h3 className="text-xl font-bold mb-4">Driver Details</h3>
            <div className="mb-4">
              <input
                type="text"
                name="licenseType"
                value={formData.licenseType}
                onChange={handleChange}
                className={classString}
                placeholder="License Type"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleChange}
                className={classString}
                placeholder="License Number"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="vehicleModel"
                value={formData.vehicleModel}
                onChange={handleChange}
                className={classString}
                placeholder="Vehicle Model"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="vehicleMake"
                value={formData.vehicleMake}
                onChange={handleChange}
                className={classString}
                placeholder="Vehicle Make"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="vehicleRegistrationNumber"
                value={formData.vehicleRegistrationNumber}
                onChange={handleChange}
                className={classString}
                placeholder="Vehicle Registration Number"
                required
              />
            </div>
          </div>
        )}
        
        {formData.role === "user" || currentStep === 2 ? (
          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary_hover w-full mt-4"
          >
            Signup
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNextStep}
            className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary_hover w-full mt-4"
          >
            Next
          </button>
        )}
      </form>
    </div>
  );
};

export default Signup;
