import React from 'react';
import { Button, Image } from 'react-bootstrap';

const IDUpload = ({ isImageUploaded, imageloading, handleUploadID, image }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {!isImageUploaded && !imageloading ? (
        <Button variant="light" onClick={handleUploadID}>
          Upload ID Card
        </Button>
      ) : isImageUploaded && !imageloading ? (
        <Image src={image} thumbnail style={{ maxHeight: '300px'  }} />
      ) : null}
    </div>
  );
};

export default IDUpload;
