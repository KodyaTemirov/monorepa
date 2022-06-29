import s from './Button.module.css';

import React from 'react';

export interface ButtonProps {
  label: React.ReactNode;
}

const Button = ({ label }: ButtonProps): JSX.Element => {
  return <button className={s.button}>{label}</button>;
};

export default Button;
