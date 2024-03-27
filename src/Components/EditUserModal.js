import React, { useState } from 'react';
import './EditUserModal.css'; 

const EditUserModal = ({ isOpen, onClose, user, onConfirm }) => {
  // Initialize form with the current user details
  const [formState, setFormState] = useState({
    username: user.username,
    email: user.email,
    isAdmin: user.isAdmin
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = () => {
    onConfirm(user._id, formState);
    onClose();
  };

  return (
    <div className="modal-background">
      <div className="modal">
        <h2>Edit User</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            Username:
            <input type="text" name="username" value={formState.username} onChange={handleChange} />
          </label>
          <br />
          <label>
            Email:
            <input type="email" name="email" value={formState.email} onChange={handleChange} />
          </label>
          <br />
          <label>
            Is Admin:
            <input type="checkbox" name="isAdmin" checked={formState.isAdmin} onChange={handleChange} />
          </label>
          <div className="actions">
            <button type="button" onClick={handleSubmit}>Save Changes</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
