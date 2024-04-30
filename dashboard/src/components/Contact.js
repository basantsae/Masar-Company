import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import deleteIcon from '../assets/delete.svg';
import { delCont, getCont } from '../services/dataApi';

function Contacts() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteItemLoading, setIsDeleteItemLoading] = useState(false);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getCont();
        // console.log(res);
        setContacts(res.contacts);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  const handelDelCont = async (id) => {
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
          await delCont(id);
        } finally {
          setIsDeleteItemLoading(false);
        }
      }
    });
  };
  return (
    <div className="Contacts">
      <div className="headerCont">
        <h2>Contacts</h2>
      </div>
      <div className="allCont">
        {isLoading ? (
          <p>Loading...</p>
        ) : contacts.length === 0 ? (
          <p>No Data</p>
        ) : (
          contacts.map((contact) => (
            <div className="cont" key={contact.id}>
              <div className="main">
                <div>
                  <p>
                    First Name: <span>{contact.firstName}</span>
                  </p>
                  <p>
                    Last Name: <span>{contact.lastName}</span>
                  </p>
                  <p>
                    Email: <span>{contact.email}</span>
                  </p>
                  <p>
                    Phone Number: <span>{contact.phone}</span>
                  </p>
                </div>
                <div>
                  <p>
                    Message:
                    <br />
                    <span>{contact.message}</span>
                  </p>
                </div>
              </div>
              <div
                className="delProp"
                onClick={() => handelDelCont(contact.id)}
              >
                <img src={deleteIcon} alt="delete" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Contacts;
