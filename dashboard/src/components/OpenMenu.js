import React from 'react';
function OpenMenu() {
  function openTheMenu() {
    document.querySelector('.sidebar').classList.add('opend');
  }
  return (
    <button className="openMenu" onClick={openTheMenu}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 5H20M4 12H20M4 19H20"
          stroke="black"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default OpenMenu;
