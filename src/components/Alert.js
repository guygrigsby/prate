import React from 'react'
import './Alert.css'

const Alert = ({ msg, onClose }) => (
  <div className="alert-wrapper">
    <div className="alert-error">
      {msg}
      <span className="closebtn" onClick={onClose}>
        &times;
      </span>
    </div>
  </div>
)

export default Alert
