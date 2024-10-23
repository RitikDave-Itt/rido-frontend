import React, { useState } from 'react';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@/redux/thunks/userThunks'; 
import { toast } from 'react-toastify';

const useLogin = () => {
    const dispatch = useDispatch<AppDispatch>(); 
    const loading = useSelector((state: RootState) => state.user.loading); 
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        try {
            
            await dispatch(loginUser({ email, password })).unwrap();
            toast.success('Login successful!');
        } catch (error) {
            
            console.error('Login failed:', error);
            toast.error('Login failed. Please check your credentials.');
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        loading,
        handleSubmit
    };
};

export default useLogin;
