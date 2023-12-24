import React from 'react';
import { Button, Image } from 'react-bootstrap';

const IDUpload = ({ isImageUploaded, imageloading, handleUploadID, image }) => {
  return (
    <div>
      {!isImageUploaded && !imageloading ? (
        <Button variant="light" onClick={handleUploadID}>
          Upload ID Card
        </Button>
      ) : isImageUploaded && !imageloading ? (
        <Image src={image} thumbnail style={{ maxHeight: '200px' }} />
      ) : null}
    </div>
  );
};

export default IDUpload;
