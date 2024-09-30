// components/TextInput.jsx
import { useState } from 'react';

const LabelInput = ({ name, id, type, labelName}: {name: string, id: string, type: string, labelName: string}) => {
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div>
        <input
            name={name}
            id={id}
            type={type}
            value={value}
            onChange={handleChange}
            className={`bg-transparent border-none focus:ring-primary-500 focus:outline-none focus:ring w-full h-full p-2 peer`}
        />
        <label htmlFor={name} className={`absolute top-0 left-1.5 peer-focus:scale-95 peer-focus:-translate-y-7 transition ease-in-out ${
                value ? 'scale-95 -translate-y-7' : ''
            }`}>{labelName}</label>
    </div>
  );
};

export default LabelInput;