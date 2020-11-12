import React from 'react'
import './styles.scss'

//children allows passing custom HTML
const Button = ({ children, ...otherProps }) => {
  return (
    <button className="btn" {...otherProps}>
      {children}
    </button>
  );
}

export default Button
