import React from 'react'
import './Alert.css'

const Alert = ({ msg, onClose }) => (
  <div className="alert-wrapper">
    <div className="alert-error">
      This is an alert box.
      <span className="closebtn" onClick={onClose}>
        &times;
      </span>
    </div>
  </div>
)

export default Alert
