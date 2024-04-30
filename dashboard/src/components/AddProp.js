
import React from 'react';
import addIcon from '../assets/add.svg';

function AddProp() {
  const navToNewProp =()=>{
    window.location.href='/newProperty'
  }
  return (
    <div className="addProp" onClick={navToNewProp}>
      <img src={addIcon} alt="add" />
    </div>
  );
}

export default AddProp;