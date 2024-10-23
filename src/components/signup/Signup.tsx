import React from 'react';
import useSignup from './useSignup';
import  Input  from '@/components/ui/Input';
import { LinearProgress } from '@mui/material';


const Signup: React.FC = () => {
  const {
    formData,
    currentStep,
    handleChange,
    handleSubmit,
    loading,
    handleNextStep,
  } = useSignup();

  return (
    <div className="bg-background-light p-6 rounded-lg w-full h-full">
      <h2 className="text-2xl font-bold text-primary mb-3">Signup</h2>
     {loading&& <LinearProgress />}

      <form onSubmit={handleSubmit} className="mt-5 overflow-y-auto h-[80%] w-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        {currentStep === 1 && (
          <div className=' w-full'>
            <Input
              type="text"
              name = "firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required={true}
            />
         
            <Input
              type="text"
              name = "lastName"

              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              required={true}
            />
            <Input
              type="email"
              name = "email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required={true}
            />
            <Input
              type="tel"
              name = "phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              required={true}
            />
               <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full mt-2 border border-gray-300 rounded-md p-2"
              >
                <option value="user">User</option>
                <option value="driver">Driver</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full mt-2 border border-gray-300 rounded-md p-2"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <Input
              type="password"
              name = "password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required={true}
            />
            <Input
              type="password"
              name = "confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required={true}
            />
            
          </div>
        )}

        {currentStep === 2 && formData.role === 'driver' && (
          <div>
            <h3 className="text-xl font-bold mb-4">Driver Details</h3>
            <Input
              type="text"
              name = "licenseType"

              value={formData.licenseType}
              onChange={handleChange}
              placeholder="License Type"
              required={true}
            />
            <Input
              type="text"
              name = "licenseNumber"

              value={formData.licenseNumber}
              onChange={handleChange}
              placeholder="License Number"
              required={true}
            />
            <Input
              type="text"
              name = "vehicleModel"

              value={formData.vehicleModel}
              onChange={handleChange}
              placeholder="Vehicle Model"
              required={true}
            />
            <Input
              type="text"
              name = "vehicleMake"

              value={formData.vehicleMake}
              onChange={handleChange}
              placeholder="Vehicle Make"
              required={true}
            />
            <Input
              type="text"
              name = "vehicleRegistrationNumber"

              value={formData.vehicleRegistrationNumber}
              onChange={handleChange}
              placeholder="Vehicle Registration Number"
              required={true}
            />
          </div>
        )}

        {formData.role === 'user' || currentStep === 2 ? (
          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary_hover w-full mt-4"
            disabled={loading} 

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
