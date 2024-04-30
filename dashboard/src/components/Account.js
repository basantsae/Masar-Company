import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { updateAdminInfo } from '../services/adminApi';

function Account() {
  const [editing, setEditing] = useState(false);
  const admin = JSON.parse(localStorage.getItem('admin'))
  const username =  admin.username
  const name = admin.name

  const handleEditClick = async () => {
    if (editing) {
      return;
    }
    setEditing(true);

    try {
      Swal.fire({
        title: 'Edit Account Information',
        html: `
          <input
            type="text"
            placeholder="New Name"
            id="swal-input1"
            class="swal2-input"
          />
          <input
            type="text"
            placeholder="New Username"
            id="swal-input2"
            class="swal2-input"
          />
          <input
            type="password"
            placeholder="Current Password"
            id="swal-input3"
            class="swal2-input"
          />
          <input
            type="password"
            placeholder="New Password"
            id="swal-input4"
            class="swal2-input"
          />`,
        showCancelButton: true,
        confirmButtonText: 'Save Changes',
        preConfirm: () => {
          // Retrieve input values
          const newNameInput = document.getElementById('swal-input1').value;
          const newUsernameInput = document.getElementById('swal-input2').value;
          const currentPasswordInput = document.getElementById('swal-input3').value;
          const newPasswordInput = document.getElementById('swal-input4').value;

          // Call the updateAdminInfo function with the new values
          updateAdminInfo(newUsernameInput, newNameInput, newPasswordInput, currentPasswordInput);
        },
      });
    } finally {
      // Finish the submission, whether successful or not
      setEditing(false);
    }
  };

  return (
    <div className="Account">
      <div className="headerAcc">
        <h2>Account</h2>
      </div>
      <div className="main">
        <div className="info">
          <div>
            <p>Name:</p>
            <div className="label">
              <span>{name}</span>
            </div>
          </div>
          <div>
            <p>Username:</p>
            <div className="label">
              <span>{username}</span>
            </div>
          </div>
        </div>
      </div>
      <button onClick={handleEditClick} disabled={editing}>
      {editing ? "Loading..." : "Edit"}
      </button>
    </div>
  );
}

export default Account;
