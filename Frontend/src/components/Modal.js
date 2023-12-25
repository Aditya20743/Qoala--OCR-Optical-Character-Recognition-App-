import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
// import './Modal.css';




const MyVerticallyCenteredModal = (props) => {
  const [file, setFile] = useState(null);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    props.setImageLoading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        const response = await axios.post('http://localhost:5000/upload', formData, config);

      // Log the entire response for debugging
      console.log('Response:', response);

      // Destructure the data and update state
      const {
        idNumber,
        name,
        last_name,
        date_of_birth,
        date_of_issue,
        date_of_expiry,
      } = response.data;
      props.setUserData({
        idNumber: idNumber,
        name,
        last_name,
        date_of_birth,
        date_of_issue,
        date_of_expiry,
      });
      props.setIsImageUploaded(true);
      props.setImageLoading(false);
    } catch (error) {
      // Log the entire error for debugging
      console.error('Error uploading image:', error);

      // Check if the error has a response
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        // The request was made, but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
      }
    }
  };



  const handleUpload = () => {
    props.setImage(URL.createObjectURL(file));
    setFile(null);
    props.onHide();
  };

  return (
    <Modal className="Modal"
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="Modal-Header">
        <Modal.Title id="contained-modal-title-vcenter">
          Upload Image
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-3"
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleUpload} disabled={!file}>
          Upload
        </Button>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyVerticallyCenteredModal;
