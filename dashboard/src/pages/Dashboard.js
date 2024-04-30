import React, { useState } from 'react';
import Logout from '../components/Logout';
import CloseMenu from '../components/CloseMenu';
import OpenMenu from '../components/OpenMenu';
import Properties from '../components/Properties';
import Contact from '../components/Contact';
import Requests from '../components/Requests';
import Account from '../components/Account';
import logo from '../logo.svg';

function Dashboard() {
  const [activeButton, setActiveButton] = useState('Properties');

  const handleButtonClick = (buttonName) => {
    document.querySelector('.sidebar').classList.remove('opend');

    setActiveButton(buttonName);
  };

  const renderComponent = () => {
    switch (activeButton) {
      case 'Properties':
        return <Properties />;
      case 'Requests':
        return <Requests />;
      case 'Contact':
        return <Contact />;
      case 'Account':
        return <Account />;
      default:
        return null;
    }
  };
  const admin = window.localStorage.getItem('admin');
  const adminData = JSON.parse(admin);
  const adminName =adminData.username;

  return (
    <div className="dashboard">
      <div className="sidebar">
        <CloseMenu />
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        
        <div className='allBtns'>
        <h2 className="adminName">{adminName}</h2>
        <button
          className={`mainBtn ${activeButton === 'Properties' ? 'active' : ''}`}
          onClick={() => handleButtonClick('Properties')}
        >
          Properties
        </button>
        <button
          className={`mainBtn ${activeButton === 'Requests' ? 'active' : ''}`}
          onClick={() => handleButtonClick('Requests')}
        >
          Requests
        </button>
        <button
          className={`mainBtn ${activeButton === 'Contact' ? 'active' : ''}`}
          onClick={() => handleButtonClick('Contact')}
        >
          Contacts
        </button>
        <button
          className={`mainBtn ${activeButton === 'Account' ? 'active' : ''}`}
          onClick={() => handleButtonClick('Account')}
        >
          Account
        </button>
        </div>
        <Logout />
       
      </div>
      <div className="main-content">
        <OpenMenu />
        {renderComponent()}
      </div>
    </div>
  );
}

export default Dashboard;
