import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const IDSearch = ({ handleFind }) => {
  const [idNumber, setIdNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFind(idNumber);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter ID number"
          value={idNumber}
          onChange={(e) => setIdNumber(e.target.value)}
        />
        <Button variant="light" type="submit">
          Find Details by ID number
        </Button>
      </form>
    </div>
  );
};

export default IDSearch;
