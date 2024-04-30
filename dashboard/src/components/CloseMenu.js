import React from 'react';


function CloseMenu() {
  function closTheMenu() {
    document.querySelector('.sidebar').classList.remove('opend');
  }
  return (
    <button className="closeMenu" onClick={closTheMenu}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_301_330)">
          <path
            d="M7.01214 21.0121L21.0364 6.98786M21.0364 21.0121L7.01214 6.98786"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_301_330">
            <rect width="28" height="28" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </button>
  );
}

export default CloseMenu;
