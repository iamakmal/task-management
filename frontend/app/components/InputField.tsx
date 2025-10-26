import React from "react";

interface Props {
  name?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ name, required, onChange }: Props) => {
  return (
    <div>
      <input
        type="text"
        id={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-2.5 "
        placeholder={name}
        required={required}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
