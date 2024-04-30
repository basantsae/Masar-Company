import React, { useState } from 'react';
import logo from '../logo.svg';
import { loginAdmin } from '../services/adminApi';

function Login() {
  const navToReg = () => {
    window.location.href = '/register';
  };
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
      await loginAdmin(username, password);
    } finally {
      // Finish the submission, whether successful or not
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login">
      <div className="logoImg">
        <img src={logo} alt="logo" />
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Welcome!</h1>
        <input type="text" placeholder="Username" required  onChange={(event) => setUsername(event.target.value)}/>
        <input type="password" placeholder="Password" required onChange={(event) => setPassword(event.target.value)}/>
        <input className="submit" type="submit"  value={isSubmitting ? "Loading..." : "Login"} // Change button text
          disabled={isSubmitting} />
        <button onClick={navToReg}>Register</button>
      </form>
    </div>
  );
}

export default Login;
