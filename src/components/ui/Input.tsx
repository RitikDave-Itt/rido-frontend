import React from 'react';

interface InputProps {
  type: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => any;
  placeholder?: string;
  id?: string;
  className?: string;
  name?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  type,
  value,
  onChange,
  placeholder = '',
  name ,
  id,
  className = '',
  required = false,
}) => {

   
  return (
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      name={name}
      className={`mt-4 block w-[95%] border border-gray-300 rounded-md p-2 focus:ring focus:ring-primary mb-4${className}`}
      placeholder={placeholder}
      required = {required}
    
    />
  );
};

export default Input;
