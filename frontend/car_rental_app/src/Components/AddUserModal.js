import React, { useState } from 'react';

const AddUserModal = ({ isOpen, onClose, onConfirm }) => {

 const [formState, setFormState] = useState({
    username: '',
    email: '',
    password:'',
    isAdmin: false
 });

 if (!isOpen) return null;

 const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
 };

 const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      ...formState,
      isAdmin: formState.isAdmin,
    };
    onConfirm(newUser);
    onClose();
 };

 return (
    <div className="modal-background">
      <div className="modal">
        <h2>Add New User</h2>
        <form onSubmit={handleSubmit}>
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
            Password:
            <input type="text" name="password" value={formState.password} onChange={handleChange} />
          </label>
          <br />
          <label>
            Is Admin:
            <input type="checkbox" name="isAdmin" checked={formState.isAdmin} onChange={handleChange} />
          </label>
          <div className="actions">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Add User</button>
          </div>
        </form>
      </div>
    </div>
 );
};

export default AddUserModal;
