import React from 'react';
import { Button } from 'react-bootstrap';

const UserDetails = ({ userData, handleSave, handleCancel, handleDelete }) => {
  const {
    idNumber,
    name,
    last_name,
    date_of_birth,
    date_of_issue,
    date_of_expiry,
    
  } = userData;

  return (
    <div>
      <div className="d-flex flex-column align-items-center">
        <h6 className="my-2">ID Number: {idNumber}</h6>
        <h6 className="my-2">Name: {name}</h6>
        <h6 className="my-2">Last Name: {last_name}</h6>
        <h6 className="my-2">Date Of Birth: {date_of_birth}</h6>
        <h6 className="my-2">Date Of issue: {date_of_issue}</h6>
        <h6 className="my-2">Date Of expiry: {date_of_expiry}</h6>
        {/* Render other fields */}
      </div>
      <div className="my-3">
        <Button className="mt-3 ml-2" variant="success" onClick={handleSave}>
          Save To Database
        </Button>
        <Button className="mt-3 mr-2" variant="primary" onClick={handleCancel}>
          Clear Details
        </Button>
        <Button className="mt-3 ml-2" variant="danger" onClick={handleDelete}>
          Delete From Database
        </Button>
      </div>
    </div>
  );
};

export default UserDetails;
