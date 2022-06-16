import React from "react";
import s from "./Button.module.css";

export interface ButtonProps {
  label: string;
}

const Button = ({ label }: ButtonProps) => {
  return <button className={s.button}>{label}</button>;
};

export default Button;
