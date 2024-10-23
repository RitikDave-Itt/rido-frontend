import  { useState } from 'react';
import axiosRequest from '../../common/request';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/slices/loadingSlice';
import { RootState } from '@/redux/store';

const useSignup = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state:RootState) => state.loading.loading);


    
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
     
    
      const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };
    
    
        
        const handleSubmit = async (e:any) => {
            e.preventDefault();
            dispatch(setLoading(true));

        
            if (formData.password !== formData.confirmPassword) {
              alert('Passwords do not match');
              return;
            }

     
        
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
              toast.error('Signup error');
            } finally {
                dispatch(setLoading(false));

            }
          };
    
      const handleNextStep = () => {
        setCurrentStep((prevStep) => prevStep + 1);
      };
      
  return (
    {
        formData,
        setFormData,
        currentStep,
        loading,
        setCurrentStep,
        handleChange,
        handleSubmit,
        handleNextStep
    }
  )
}

export default useSignup