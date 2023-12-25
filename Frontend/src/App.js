import React, { useState } from 'react';
import Header from './components/Header';
import IDUpload from './components/IDUpload';
import IDSearch from './components/IDSearch';
import UserDetails from './components/UserDetails';
import MyVerticallyCenteredModal from './components/Modal';
import axios from 'axios';
import './App.css';

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
      await axios.post('http://localhost:5000/api/citizen', userData);
    } catch (error) {
      console.error('Error saving data:', error.message);
      // Handle error as needed
    }
  };

  const handleUploadID = () => {
    setModalShow(true);
    setisFindingID(false);
  };

  const handleCancel = () => {
    setIsImageUploaded(false);
    setisFindingID(false);
  };

  const handleDelete = () => {
    setUserData({ });
    setIsImageUploaded(false);
    setisFindingID(false);
  };

  const handleFind = async (idNumber) => {
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
    } catch (error) {
      console.error('Error during data retrieval:', error.message);
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
