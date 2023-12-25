import React, { useState } from 'react';
import Header from './components/Header';
import IDUpload from './components/IDUpload';
import IDSearch from './components/IDSearch';
import UserDetails from './components/UserDetails';
import MyVerticallyCenteredModal from './components/Modal';
import axios from 'axios';
import './App.css';
import './bootstrap.min.css';

const App = () => {
  const [modalShow, setModalShow] = useState(false);
  const [image, setImage] = useState();
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [userData, setUserData] = useState({
    idNumber: 'Enter ID Manually',
    name: 'Enter Name Manually',
    last_name: 'Enter Last Name Manually',
    date_of_birth: 'Enter Date of Birth Manually',
    date_of_issue: 'Enter Date of Issue Manually',
    date_of_expiry: 'Enter Date of Expiry Manually',
    // Add other fields here
  });
  const [imageloading, setImageLoading] = useState(false);
  const [isFindingID, setisFindingID] = useState(false);

  const handleSave = async () => {
    
    setIsImageUploaded(false);
    try {
      const requiredFields = ['idNumber', 'name', 'last_name', 'date_of_birth', 'date_of_issue', 'date_of_expiry'];

      // Check if any required fields are missing
      const missingFields = requiredFields.filter(field => !userData[field]);

      if (missingFields.length > 0) {
        // Show an alert listing the missing fields
        const missingFieldsUppercase = missingFields.map(field => field.toUpperCase());
        alert(`Data Saved but with these fields empty: ${missingFieldsUppercase.join(', ')}`);
  
        return;
      }
      await axios.post('http://localhost:5000/api/citizen', userData);
      alert('Data Saved Successfully');
    } catch (error) {
      console.error('Error saving data:', error.message);
      alert('Error saving data');
      // Handle error as needed
    }

  };

  const handleUploadID = () => {
    setModalShow(true);
    setisFindingID(false);
    
  };

  const handleCancel = () => {
    setUserData({ });
    setIsImageUploaded(false);
    setisFindingID(false);
  };

  const handleDelete = async () => {
    try {
      // Assuming userData contains the idNumber of the citizen to be deleted
      const idNumber = userData.idNumber; // Modify this according to your userData structure
  
      if (!idNumber) {
        // Handle case where idNumber is not available in userData
        alert('No idNumber available to delete.');
        console.error('No idNumber available to delete.');
        return;
      }
  
      // Make a DELETE request to your server to delete the citizen with the specified idNumber
      await axios.delete('http://localhost:5000/api/citizen', {
        data: { idNumber }, // Send idNumber in the request body
      });
  
      // Perform any necessary client-side updates or actions after successful deletion
      setUserData({}); // Clear user data or perform other actions as needed
      setIsImageUploaded(false);
      setisFindingID(false);
      alert('Details Deleted Successfully')
      // Additional actions after successful deletion...
    } catch (error) {
      console.error('Error deleting data:', error.message);
      alert('Error Deleting Data');
      // Handle error as needed
    }
  };
  

  const handleFind = async (idNumber) => {
    if (!idNumber) {
      // Handle case where idNumber is not available in userData
      alert('Enter idNumber available to Find.');
      console.error('No idNumber available to delete.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/citizen', {
        idNumber,
      });
  
      

      setUserData({
        idNumber: response.data.idNumber,
        name: response.data.name,
        last_name: response.data.last_name,
        date_of_birth: response.data.date_of_birth,
        date_of_issue: response.data.date_of_issue,
        date_of_expiry: response.data.date_of_expiry,

      });
      setisFindingID(true);
      alert('Details found of given idNumber');
    } catch (error) {
      console.error('Error during data retrieval:', error.message);
      alert('No Details found of given idNumber');
      // Handle error as needed
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="form_outline">
          <IDUpload
            isImageUploaded={isImageUploaded}
            imageloading={imageloading}
            handleUploadID={handleUploadID}
            image={image}
          />
          <IDSearch handleFind={handleFind} />
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            setImage={setImage}
            setIsImageUploaded={setIsImageUploaded}
            setUserData={setUserData}
            setImageLoading={setImageLoading}
          />
          <UserDetails
            userData={userData}
            handleSave={handleSave}
            handleCancel={handleCancel}
            handleDelete={handleDelete}
          />
          {/* Render other components */}
        </div>
      </div>
    </>
  );
};

export default App;
