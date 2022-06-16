import React from "react";
import "./Button.css";

export interface ButtonProps {
  label: string;
}

const Button = ({ label }: ButtonProps) => {
  return (
    <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
      {label}
    </div>
  );
};

export default Button;
