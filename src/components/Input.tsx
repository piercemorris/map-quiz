import React, { ChangeEvent } from 'react';

interface InputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ value, onChange }) => {
  return (
    <input className=' px-2 text-gray-950 font-black' type="text" value={value} onChange={onChange} />
  );
};

export default Input;