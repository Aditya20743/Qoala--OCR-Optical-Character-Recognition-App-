import React from 'react';
import { Button } from 'react-bootstrap';

const UserDetails = ({ userData, handleSave, handleCancel, handleDelete }) => {
  const {
    name,
    last_name,
    date_of_birth,
    // Add other fields here
  } = userData;

  return (
    <div>
      <div className="d-flex flex-column align-items-center">
        <h6 className="my-2">Name: {name}</h6>
        <h6 className="my-2">Last Name: {last_name}</h6>
        <h6 className="my-2">Date Of Birth: {date_of_birth}</h6>
        {/* Render other fields */}
      </div>
      <div className="my-3">
        <Button className="mt-3 ml-2" variant="success" onClick={handleSave}>
          Save
        </Button>
        <Button className="mt-3 mr-2" variant="primary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button className="mt-3 ml-2" variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default UserDetails;
