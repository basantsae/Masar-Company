import React, { useState, useEffect } from 'react';
import deleteIcon from '../assets/delete.svg';
import editIcon from '../assets/edit.svg';
import AddProp from './AddProp';
import { getAllProp, deleteProp } from '../services/dataApi';
import Swal from 'sweetalert2';

function Properties() {
  // Define the API endpoint URL
  const baseUrl = process.env.REACT_APP_API_URL;
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteItemLoading, setIsDeleteItemLoading] = useState(false);
  const [properties, setproperties] = useState([]);
  const [activeImageIndices, setActiveImageIndices] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getAllProp();
        // console.log(res);
        setproperties(res.properties);
        setIsLoading(false);

        // Set the initial active image indices when data is loaded
        const initialActiveImageIndices = res.properties.map(() => 0);
        setActiveImageIndices(initialActiveImageIndices);
      } catch (error) {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  const handleDotClick = (propertyIndex, index) => {
    // Create a new array to update the state immutably
    const newActiveImageIndices = [...activeImageIndices];

    // Update the active image index for the clicked property
    newActiveImageIndices[propertyIndex] = index;

    // Set the new state
    setActiveImageIndices(newActiveImageIndices);
  };

  const handelDelProp = async (id) => {
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
          await deleteProp(id);
        } finally {
          setIsDeleteItemLoading(false);
        }
      }
    });
  };
  const handelEditProp = async (id) => {
    window.location.href = `edit/${id}`;
  };

  return (
    <div className="Properties">
      <div className="headerProp">
        <h2>Properties</h2>
        <AddProp />
      </div>
      <div className="allPorp">
        {isLoading ? (
          <p>Loading..</p>
        ) : properties.length === 0 ? (
          <p>No Data</p>
        ) : (
          properties.map((property, propertyIndex) => (
            <div className="prop" key={property.id}>
              <div className="main">
                <div className="imagesSlider">
                  <div className="images">
                    {property.propertyPictures.map((picture, picIndex) => (
                      <img
                        key={picIndex}
                        className={
                          activeImageIndices[propertyIndex] === picIndex
                            ? 'active'
                            : ''
                        }
                        src={baseUrl + `/images/${picture}`}
                        alt={`img-${picIndex}`}
                      />
                    ))}
                  </div>
                  <div className="dots">
                    {property.propertyPictures.map((_, dotIndex) => (
                      <div
                        key={dotIndex}
                        className={`dot ${
                          activeImageIndices[propertyIndex] === dotIndex
                            ? 'active'
                            : ''
                        }`}
                        onClick={() => handleDotClick(propertyIndex, dotIndex)}
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="propinfo">
                  <div>
                    <p>
                      Type: <span>{property.propertyType}</span>
                    </p>
                    <p>
                      For: <span>{property.propertyFor}</span>
                    </p>
                    <p>
                      Size:{' '}
                      <span>{property.propertySize.toLocaleString('en')}</span>
                    </p>
                    <p>
                      Price:{' '}
                      <span>{property.propertyPrice.toLocaleString('en')}</span>
                    </p>
                    <p>
                      Location: <span>{property.propertyLocation}</span>
                    </p>
                    <p>
                      By: <span>{property.createdBy.name}</span>
                    </p>
                    <p>
                      Page: <span>{property.propertyPage}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      Section: <span>{property.propertySection}</span>
                    </p>
                    <p>
                      Bedrooms: <span>{property.bedrooms}</span>
                    </p>
                    <p>
                      Bathrooms: <span>{property.bathrooms}</span>
                    </p>
                    <p>
                      Title: <br /> <span>{property.propertyDescription}</span>
                    </p>
                    <p>
                      Description: <br />{' '}
                      <span>{property.propertyDescriptionFull}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="propBtns">
                <div
                  className="delProp"
                  onClick={() => handelDelProp(property.id)}
                >
                  <img src={deleteIcon} alt="delete" />
                </div>
                <div
                  className="editProp"
                  onClick={() => handelEditProp(property.id)}
                >
                  <img src={editIcon} alt="edit" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Properties;
