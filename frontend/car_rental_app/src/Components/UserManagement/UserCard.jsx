import React from 'react';

const UserCard = ({ user, onDelete, onEdit }) => {
  return (
    <div className="user-card">
      <h3>{user.username} ({user.email})</h3>
      <p>Admin: {user.isAdmin ? 'Yes' : 'No'}</p>
      <div className="actions">
        <button onClick={() => onEdit(user)} className="edit-btn">Edit</button>
        <button onClick={() => onDelete(user._id)} className="delete-btn">Delete</button>
      </div>
    </div>
  );
};

export default UserCard;
