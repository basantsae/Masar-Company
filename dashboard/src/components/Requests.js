import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import deleteIcon from '../assets/delete.svg';
import { delReq, getReq } from '../services/dataApi';

function Requests() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteItemLoading, setIsDeleteItemLoading] = useState(false);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getReq();
        // console.log(res);
        setRequests(res.requests);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  const handelDelReq = async (id) => {
    if (isDeleteItemLoading) {
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8bf349',
      color: '#06555a',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsDeleteItemLoading(true);

        try {
          await delReq(id);
        } finally {
          setIsDeleteItemLoading(false);
        }
      }
    });
  };

  return (
    <div className="Requests">
      <div className="headerReq">
        <h2>Requests</h2>
      </div>
      <div className="allReq">
        {isLoading ? (
          <p>Loading...</p>
        ) : requests.length === 0 ? (
          <p>No Data</p>
        ) : (
          requests.map((request) => (
            <div className="req" key={request.id}>
              <div className="main">
                <div>
                  <p>
                    First Name: <span>{request.firstName}</span>
                  </p>
                  <p>
                    Last Name: <span>{request.lastName}</span>
                  </p>
                  <p>
                    Email: <span>{request.email}</span>
                  </p>
                  <p>
                    Phone Number: <span>{request.phoneNumber}</span>
                  </p>
                  <p>
                    category: <span>{request.category}</span>
                  </p>
                  <p>
                    service: <span>{request.service}</span>
                  </p>
                </div>
                <div>
                  <p>
                    Details:
                    <br />
                    <span>{request.details}</span>
                  </p>
                </div>
              </div>
              <div className="delProp" onClick={()=>handelDelReq(request.id)}>
                <img src={deleteIcon} alt="delete" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Requests;
