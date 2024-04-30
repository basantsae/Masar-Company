import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode'; // Import the jwt-decode library
// Define the API endpoint URL
const baseUrl = process.env.REACT_APP_API_URL;
// Function to register a new Admin
export const registerAdmin = async (name, username, password, passcode) => {
  const endpoint = '/admin/register';
  const url = baseUrl + endpoint;

  // User data to be sent in the request body
  const userData = {
    name: name,
    username: username,
    password: password,
  };
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: passcode,
    },
    body: JSON.stringify(userData),
  });
  const responseData = await response.json();
  if (response.ok) {
    // Status code is OK (e.g., 200)
    Swal.fire({
      title: 'Registerd successfully',
      icon: 'success',
      confirmButtonColor: '#8bf349',
      color: '#06555a',
    }).then((isConfirmed) => {
      window.location.href = './login';
    });
  } else {
    // Status code is not OK
    const errorMessage = responseData.message || responseData.errors[0].msg;

    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: errorMessage,
      confirmButtonColor: '#8bf349',
      color: '#06555a',
    });
  }
};

// Function to login user and get join date
export const loginAdmin = async (username, password) => {
  const loginEndpoint = '/admin/login';
  const url = (endpoint) => baseUrl + endpoint;
  // User data to be sent in the request body for login
  const userData = {
    username: username,
    password: password,
  };

  // Login request
  const loginResponse = await fetch(url(loginEndpoint), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const loginData = await loginResponse.json();

  if (loginResponse.ok) {
    window.localStorage.setItem('token', loginData.token);
    window.localStorage.setItem('admin', JSON.stringify(loginData.admin));
    // Redirect to dashboard
    window.location.href = './dashboard';
  } else {
    // Handle join date request error
    const errorMessage = loginData.message;
    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: errorMessage,
      confirmButtonColor: '#8bf349',
      color: '#06555a',
    });
  }
};

//functin to update admin info
export const updateAdminInfo = async (
  newUsername,
  newName,
  newPassword,
  currentPassword
) => {
  const updateEndpoint = '/admin/update';
  const url = (endpoint) => baseUrl + endpoint;
  const token = window.localStorage.getItem('token');
  // User data to be sent in the request body for login
  const userData = {
    username: newUsername,
    name: newName,
    newPassword: newPassword,
    currentPassword: currentPassword,
  };
  // update request
  const updateResponse = await fetch(url(updateEndpoint), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(userData),
  });

  const updateDate = await updateResponse.json();

  if (updateResponse.ok) {
    Swal.fire({
      title: 'Edited successfully',
      icon: 'success',
      confirmButtonColor: '#8bf349',
      color: '#06555a',
    }).then((isConfirmed) => {
      logOut();
    });
  } else {
    // Handle join date request error
    const errorMessage = updateDate.message;
    // console.log(updateDate);
    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: errorMessage,
      confirmButtonColor: '#8bf349',
      color: '#06555a',
    });
  }
};

export const logOut = () => {
  window.localStorage.clear();
  window.location.href = '/login';
};

export const isAuthenticated = () => {
  const token = window.localStorage.getItem('token');

  if (token) {
    try {
      const decoded = jwtDecode(token);
      const expirationTime = decoded.exp;
      // console.log("token",expirationTime);
      // console.log("date",Date.now() / 1000);

      // Check if the token is expired
      if (Date.now() / 1000 > expirationTime) {
        return false; // Token has expired
      }

      return true; // Token is valid and not expired
    } catch (error) {
      // Handle any errors during decoding, such as invalid tokens
      return false; // Assume invalid token if decoding fails
    }
  } else {
    return false; // No token found
  }
};
