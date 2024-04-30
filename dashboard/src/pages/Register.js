import React, { useState } from 'react';
import { registerAdmin } from '../services/adminApi';
function Register() {
   const [username, setUsername] = useState('');
   const [name, setName] = useState('');
   const [password, setPassword] = useState('');
   const [passcode, setPasscode] = useState('');
   const [isSubmitting, setIsSubmitting] = useState(false);
   const handleSubmit = async (event) => {
      event.preventDefault();
  
      // Check if already submitting
      if (isSubmitting) {
        return;
      }
  
      // Start the submission
      setIsSubmitting(true);
  
      try {
        // Send the form data to the backend server
        await registerAdmin(name,username, password,passcode);
      } finally {
        // Finish the submission, whether successful or not
        setIsSubmitting(false);
      }
    };
 
  return (
    <form className="Register-form" onSubmit={handleSubmit}>
      <h1>Register New Admin!</h1>
      <input type="text" placeholder="Name" required onChange={(event) => setName(event.target.value)} />
      <input type="text" placeholder="Username" required onChange={(event) => setUsername(event.target.value)}/>
      <input type="password" placeholder="Password" required onChange={(event) => setPassword(event.target.value)} />
      <hr />
      <input type="password" placeholder="PASSCODE" required onChange={(event) => setPasscode(event.target.value)}/>
      <input className="submit" type="submit"  value={isSubmitting ? "Loading..." : "Register"} />
    </form>
  );
}

export default Register;
