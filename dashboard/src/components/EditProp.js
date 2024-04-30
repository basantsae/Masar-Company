import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getByID, updateProp } from '../services/dataApi';
import cross from '../assets/cross.svg';
import { suggestions } from '../assets/data';
function EditProp() {
  const baseUrl = process.env.REACT_APP_API_URL;
  const { id } = useParams();
  const [propertyType, setPropertyType] = useState();
  const [propertyFor, setPropertyFor] = useState();
  const [propertyPage, setPropertyPage] = useState();
  const [propertySection, setPropertySection] = useState();
  const [propertySize, setPropertySize] = useState();
  const [propertyPrice, setPropertyPrice] = useState();
  const [propertyDescription, setPropertyDescription] = useState();
  const [propertyDescriptionFull, setPropertyDescriptionFull] = useState();
  const [propertyLocation, setPropertyLocation] = useState();
  const [bedrooms, setBedrooms] = useState();
  const [bathrooms, setBathrooms] = useState();
  const [propertyPictures, setpropertyPictures] = useState([]);
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getByID(id);
        // console.log(res);
        // Set state values with property data
        setPropertyType(res.property.propertyType);
        setPropertyFor(res.property.propertyFor);
        setPropertyPage(res.property.propertyPage);
        setPropertySection(res.property.propertySection);
        setPropertySize(res.property.propertySize);
        setPropertyPrice(res.property.propertyPrice);
        setPropertyDescription(res.property.propertyDescription);
        setPropertyDescriptionFull(res.property.propertyDescriptionFull);
        setPropertyLocation(res.property.propertyLocation);
        setBedrooms(res.property.bedrooms);
        setBathrooms(res.property.bathrooms);
        setpropertyPictures(res.property.propertyPictures);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    getData();
  }, [id]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if already submitting
    if (isSubmitting) {
      return;
    }

    // Start the submission
    setIsSubmitting(true);

    try {
      // Send the form data to the backend server
      await await updateProp(
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
      );
    } finally {
      // Finish the submission, whether successful or not
      setIsSubmitting(false);
    }
  };
  const handelCloseBtn = () => {
    window.location.href = '../dashboard';
  };
  const handleDeleteImage = (index) => {
    // Create a copy of the propertyPictures array
    const updatedPropertyPictures = [...propertyPictures];
    // Remove the image at the specified index
    updatedPropertyPictures.splice(index, 1);
    // Update the state with the new propertyPictures array
    setpropertyPictures(updatedPropertyPictures);
  };
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="newProp">
          <div className="header">
            <h2>Edit</h2>
            <div className="close" onClick={handelCloseBtn}>
              <img src={cross} alt="" />
            </div>
          </div>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="dataForm">
              <div>
                <label htmlFor="propertyType">Property Type:</label>
                <input
                  type="text"
                  name="propertyType"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  required
                  list="propertyTypeSuggestions"
                  autoComplete="off"
                />
                <datalist id="propertyTypeSuggestions">
                  {suggestions.propertyTypeSuggestions.map((type, index) => (
                    <option key={index} value={type} />
                  ))}
                </datalist>
                <label htmlFor="propertyFor">Property For:</label>
                <div>
                  <div>
                    {' '}
                    <input
                      type="radio"
                      id="propertyForRent"
                      name="propertyFor"
                      value="Rent"
                      checked={propertyFor === 'Rent'}
                      onChange={(e) => setPropertyFor(e.target.value)}
                      required
                    />
                    <label htmlFor="propertyForRent">Rent</label>
                  </div>

                  <div>
                    {' '}
                    <input
                      type="radio"
                      id="propertyForSale"
                      name="propertyFor"
                      value="Sale"
                      checked={propertyFor === 'Sale'}
                      onChange={(e) => setPropertyFor(e.target.value)}
                      required
                    />
                    <label htmlFor="propertyForSale">Sale</label>
                  </div>

                  <div>
                    {' '}
                    <input
                      type="radio"
                      id="propertyForOffPlan"
                      name="propertyFor"
                      value="Off-plan"
                      checked={propertyFor === 'Off-plan'}
                      onChange={(e) => setPropertyFor(e.target.value)}
                      required
                    />
                    <label htmlFor="propertyForOffPlan">Off-plan</label>
                  </div>
                </div>

                <label htmlFor="propertySize">Property Size:</label>
                <input
                  type="number"
                  name="propertySize"
                  value={propertySize}
                  onChange={(e) => setPropertySize(e.target.value)}
                  required
                />
                <label htmlFor="propertyPrice">Property Price:</label>
                <input
                  type="number"
                  name="propertyPrice"
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(e.target.value)}
                  required
                />
                <label htmlFor="propertyDescription">Property title:</label>
                <textarea
                  name="propertyDescription"
                  value={propertyDescription}
                  onChange={(e) => setPropertyDescription(e.target.value)}
                  required
                ></textarea>
                <label htmlFor="propertyDescriptionFull">
                  Property Description:
                </label>
                <textarea
                  name="propertyDescriptionFull"
                  value={propertyDescriptionFull}
                  onChange={(e) => setPropertyDescriptionFull(e.target.value)}
                  required
                ></textarea>
              </div>

              <div>
                <label htmlFor="propertyPage">Property Page:</label>
                <div>
                  <div>
                    <input
                      type="radio"
                      id="propertyPageHome"
                      name="propertyPage"
                      value="Home"
                      checked={propertyPage === 'Home'}
                      onChange={(e) => setPropertyPage(e.target.value)}
                      required
                    />
                    <label htmlFor="propertyPageHome">Home</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="propertyPageRent"
                      name="propertyPage"
                      value="Rent"
                      checked={propertyPage === 'Rent'}
                      onChange={(e) => setPropertyPage(e.target.value)}
                      required
                    />
                    <label htmlFor="propertyPageRent">Rent</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="propertyPageSale"
                      name="propertyPage"
                      value="Sale"
                      checked={propertyPage === 'Sale'}
                      onChange={(e) => setPropertyPage(e.target.value)}
                      required
                    />
                    <label htmlFor="propertyPageSale">Sale</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="propertyPageOffPlan"
                      name="propertyPage"
                      value="Off-plan"
                      checked={propertyPage === 'Off-plan'}
                      onChange={(e) => setPropertyPage(e.target.value)}
                      required
                    />
                    <label htmlFor="propertyPageOffPlan">Off-plan</label>
                  </div>
                </div>
                <label htmlFor="propertySection">Property Section:</label>
                <input
                  type="text"
                  name="propertySection"
                  value={propertySection}
                  onChange={(e) => setPropertySection(e.target.value)}
                  required
                  list="propertySectionSuggestions"
                  autoComplete="off"
                />
                <datalist id="propertySectionSuggestions">
                  {suggestions.propertySectionSuggestions.map((type, index) => (
                    <option key={index} value={type} />
                  ))}
                </datalist>
                <label htmlFor="propertyLocation">Property Location:</label>
                <input
                  type="text"
                  name="propertyLocation"
                  value={propertyLocation}
                  onChange={(e) => setPropertyLocation(e.target.value)}
                  required
                  list="propertyLocationSuggestions"
                  autoComplete="off"
                />
                <datalist id="propertyLocationSuggestions">
                  {suggestions.propertyLocationSuggestions.map(
                    (type, index) => (
                      <option key={index} value={type} />
                    )
                  )}
                </datalist>

                <label htmlFor="bedrooms">Bedrooms:</label>
                <input
                  type="number"
                  name="bedrooms"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  required
                />

                <label htmlFor="bathrooms">Bathrooms:</label>
                <input
                  type="number"
                  name="bathrooms"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                  required
                />
                <label htmlFor="images">Select Images:</label>
                <input
                  type="file"
                  name="images"
                  accept="image/*"
                  onChange={(e) => setImages([...images, ...e.target.files])}
                  multiple
                />
              </div>
            </div>
            <div className="imagePreviews">
              {propertyPictures.map((image, index) => (
                <div key={index} className="imagePreview">
                  <div>
                    <a href={`${baseUrl}/images/${image}`}>
                      <img
                        src={`${baseUrl}/images/${image}`}
                        alt={`${index}`}
                      />
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(index)}
                  >
                    <img src={cross} alt="Delete" />
                  </button>
                </div>
              ))}
            </div>

            <input
              type="submit"
              value={isSubmitting ? 'Loading...' : 'Update Property'} // Change button text
              disabled={isSubmitting}
            />
          </form>
        </div>
      )}
    </>
  );
}

export default EditProp;
