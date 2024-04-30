import React from 'react';
import  {logOut}  from '../services/adminApi';

function Logout() {
  function logOutUser() {
    logOut();
  }
  return (
    <div className="logout">
      <button onClick={logOutUser}>
        LogOut
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.6667 21.3334L28 16M28 16L22.6667 10.6667M28 16H9.33333M17.3333 21.3334V22.6667C17.3333 23.7276 16.9119 24.745 16.1618 25.4951C15.4116 26.2453 14.3942 26.6667 13.3333 26.6667H8C6.93913 26.6667 5.92172 26.2453 5.17157 25.4951C4.42143 24.745 4 23.7276 4 22.6667V9.33337C4 8.27251 4.42143 7.25509 5.17157 6.50495C5.92172 5.7548 6.93913 5.33337 8 5.33337H13.3333C14.3942 5.33337 15.4116 5.7548 16.1618 6.50495C16.9119 7.25509 17.3333 8.27251 17.3333 9.33337V10.6667"
            stroke="black"
            strokeWidth="2.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="145"
        height="12"
        viewBox="0 0 145 12"
        fill="none"
      >
        <rect width="145" height="12" rx="6" ry="6" fill="#3C3C3C" />
      </svg>
    </div>
  );
}

export default Logout;
