import Swal from 'sweetalert2';
// Define the API endpoint URL
const baseUrl = process.env.REACT_APP_API_URL;

export const getAllProp = async () => {
  const endpoint = '/property/all';
  const url = baseUrl + endpoint;
  const response = await fetch(url);
  const responseData = response.json();
  if (response.ok) {
    return responseData;
  } else {
    console.log(responseData);
  }
};
export const getByID = async (id) => {
  const endpoint = `/property/view/${id}`;
  const url = baseUrl + endpoint;
  const response = await fetch(url);
  const responseData = response.json();
  if (response.ok) {
    return responseData;
  } else {
    console.log(responseData);
  }
};

export const deleteProp = async (id) => {
  const endpoint = `/property/delete/${id}`;
  const url = baseUrl + endpoint;
  const token = window.localStorage.getItem('token');
  // update request
  const delPrp = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `${token}`, // Add the authorization header with the token
    },
  });

  const res = await delPrp.json();

  if (delPrp.ok) {
    Swal.fire({
      title: 'Deleted successfully',
      icon: 'success',
      confirmButtonColor: '#8bf349',
      color: '#06555a',
    }).then((isConfirmed) => {
      window.location.reload();
    });
  } else {
    // Handle join date request error
    const errorMessage = res.message;
    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: errorMessage,
      confirmButtonColor: '#8bf349',
      color: '#06555a',
    });
  }
};

export const createProp = async (
  propertyType,
  propertyFor,
  propertyPage,
  propertySection,
  propertySize,
  propertyPrice,
  propertyDescription,
  propertyDescriptionFull,
  propertyLocation,
  bedrooms,
  bathrooms,
  images
) => {
  const endpoint = '/property/create';
  const url = baseUrl + endpoint;
  const token = window.localStorage.getItem('token');
  const formData = new FormData();
  formData.append('propertyType', propertyType);
  formData.append('propertyFor', propertyFor);
  formData.append('propertyPage', propertyPage);
  formData.append('propertySection', propertySection);
  formData.append('propertySize', propertySize);
  formData.append('propertyPrice', propertyPrice);
  formData.append('propertyDescription', propertyDescription);
  formData.append('propertyDescriptionFull', propertyDescriptionFull);
  formData.append('propertyLocation', propertyLocation);
  formData.append('bedrooms', bedrooms);
  formData.append('bathrooms', bathrooms);

  // Append each image to the FormData
  for (let i = 0; i < images.length; i++) {
    formData.append('images', images[i]);
  }

  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: `${token}`,
    },
    body: formData,
  };

  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();

    // console.log('Request:', requestOptions);
    // console.log('Response:', data);

    if (response.status === 201) {
      // Show success alert
      Swal.fire({
        title: 'Successful!',
        text: data.message,
        icon: 'success',
      }).then((isConfirmed) => {
        window.location.reload();
      });
    } else {
      // Show error alert with the response message
      Swal.fire({
        title: 'Error!',
        text: data.message,
        icon: 'error',
      });
    }
  } catch (error) {
    console.error('Error:', error);
    // Show error alert with the response message
    Swal.fire({
      title: 'Error!',
      icon: 'error',
    });
  }
};
export const updateProp = async (
  id,
  propertyType,
  propertyFor,
  propertyPage,
  propertySection,
  propertySize,
  propertyPrice,
  propertyDescription,
  propertyDescriptionFull,
  propertyLocation,
  bedrooms,
  bathrooms,
  propertyPictures,
  images
) => {
  const endpoint = `/property/update/${id}`;
  const url = baseUrl + endpoint;
  const token = window.localStorage.getItem('token');
  const formData = new FormData();
  formData.append('propertyType', propertyType);
  formData.append('propertyFor', propertyFor);
  formData.append('propertyPage', propertyPage);
  formData.append('propertySection', propertySection);
  formData.append('propertySize', propertySize);
  formData.append('propertyPrice', propertyPrice);
  formData.append('propertyDescription', propertyDescription);
  formData.append('propertyDescriptionFull', propertyDescriptionFull);
  formData.append('propertyLocation', propertyLocation);
  formData.append('bedrooms', bedrooms);
  formData.append('bathrooms', bathrooms);

  // Convert propertyPictures array to a string with comma-separated values
  const propertyPicturesString = propertyPictures.join(',');
  formData.append('propertyPictures', propertyPicturesString);

  // Append each image to the FormData
  for (let i = 0; i < images.length; i++) {
    formData.append('images', images[i]);
  }

  const requestOptions = {
    method: 'PUT',
    headers: {
      Authorization: `${token}`,
    },
    body: formData,
  };

  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();

    console.log('Request:', requestOptions);
    console.log('Response:', data);

    if (response.status === 200) {
      // Show success alert
      Swal.fire({
        title: 'Successful!',
        text: data.message,
        icon: 'success',
      }).then((isConfirmed) => {
        window.location.reload();
      });
    } else {
      // Show error alert with the response message
      Swal.fire({
        title: 'Error!',
        text: data.message,
        icon: 'error',
      });
    }
  } catch (error) {
    console.error('Error:', error);
    // Show error alert with the response message
    Swal.fire({
      title: 'Error!',
      icon: 'error',
    });
  }
};

export const getReq = async () => {
  const endpoint = '/request/all';
  const url = baseUrl + endpoint;
  const token = window.localStorage.getItem('token');
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `${token}`, // Add the authorization header with the token
    },
  });
  const responseData = response.json();
  if (response.ok) {
    return responseData;
  } else {
    console.log(responseData);
  }
};
export const delReq = async (id) => {
  const endpoint = `/request/delete/${id}`;
  const url = baseUrl + endpoint;
  const token = window.localStorage.getItem('token');
  // update request
  const delPrp = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `${token}`, // Add the authorization header with the token
    },
  });

  const res = await delPrp.json();

  if (delPrp.ok) {
    Swal.fire({
      title: 'Deleted successfully',
      icon: 'success',
      confirmButtonColor: '#8bf349',
      color: '#06555a',
    }).then((isConfirmed) => {
      window.location.reload();
    });
  } else {
    // Handle join date request error
    const errorMessage = res.message;
    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: errorMessage,
      confirmButtonColor: '#8bf349',
      color: '#06555a',
    });
  }
};

export const getCont = async () => {
  const endpoint = '/contact/all';
  const url = baseUrl + endpoint;
  const token = window.localStorage.getItem('token');
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `${token}`, // Add the authorization header with the token
    },
  });
  const responseData = response.json();
  if (response.ok) {
    return responseData;
  } else {
    console.log(responseData);
  }
};
export const delCont = async (id) => {
  const endpoint = `/contact/delete/${id}`;
  const url = baseUrl + endpoint;
  const token = window.localStorage.getItem('token');
  // update request
  const delPrp = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `${token}`, // Add the authorization header with the token
    },
  });

  const res = await delPrp.json();

  if (delPrp.ok) {
    Swal.fire({
      title: 'Deleted successfully',
      icon: 'success',
      confirmButtonColor: '#8bf349',
      color: '#06555a',
    }).then((isConfirmed) => {
      window.location.reload();
    });
  } else {
    // Handle join date request error
    const errorMessage = res.message;
    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: errorMessage,
      confirmButtonColor: '#8bf349',
      color: '#06555a',
    });
  }
};
