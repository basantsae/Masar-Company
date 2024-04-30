import React, { useState } from 'react';
import cross from '../assets/cross.svg';
import { createProp } from '../services/dataApi';
import { suggestions } from '../assets/data';

const PropertyForm = () => {
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
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      await await createProp(
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
      );
    } finally {
      // Finish the submission, whether successful or not
      setIsSubmitting(false);
    }
  };

  const handelCloseBtn = () => {
    window.location.href = './dashboard';
  };

  return (
    <div className="newProp">
      <div className="header">
        <h2>Create New</h2>
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
              autoComplete='off'
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
            <label htmlFor="propertyDescription">Property Title:</label>
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
              autoComplete='off'
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
              autoComplete='off'
            />
            <datalist id="propertyLocationSuggestions">
              {suggestions.propertyLocationSuggestions.map((type, index) => (
                <option key={index} value={type} />
              ))}
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
              required
            />
          </div>
        </div>

        <input
          type="submit"
          value={isSubmitting ? 'Loading...' : 'Create Property'} // Change button text
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
};

export default PropertyForm;
