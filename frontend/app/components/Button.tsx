import React from "react";

interface Props {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  customStyle?: string;
}
const Button = ({ label, onClick, customStyle, disabled }: Props) => {
  return (
    <button
      type="button"
      className={`font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${
        disabled ? "opacity-50 pointer-events-none" : ""
      } ${customStyle}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
