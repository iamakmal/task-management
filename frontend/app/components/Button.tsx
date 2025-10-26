import React from "react";

interface Props {
  label: string;
  onClick?: () => void;
  customStyle?: string;
}
const Button = ({ label, onClick, customStyle }: Props) => {
  return (
    <button
      type="button"
      className={`font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${customStyle}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
