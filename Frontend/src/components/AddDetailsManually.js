import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const AddDetailsManually = ({ handleAddManually }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    idNumber: '',
    name: '',
    last_name: '',
    date_of_birth: '',
    date_of_issue: '',
    date_of_expiry: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    handleAddManually(formData); // Pass the entered data to the parent component
    setFormData({
      idNumber: '',
      name: '',
      last_name: '',
      date_of_birth: '',
      date_of_issue: '',
      date_of_expiry: '',
    });
    setShowModal(false);
  };

  return (
    <div style={ {display: 'flex', justifyContent: 'center' }}>
      <Button variant="light" onClick={() => setShowModal(true)}>
        Add Details Manually
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Details Manually</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="idNumber">
              <Form.Label>ID Number: </Form.Label>
              <Form.Control
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="name">
              <Form.Label>Name: </Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="last_name">
              <Form.Label>Last Name: </Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="date_of_birth">
              <Form.Label>Date of Birth: </Form.Label>
              <Form.Control
                type="text"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="date_of_issue">
              <Form.Label>Date of Issue: </Form.Label>
              <Form.Control
                type="text"
                name="date_of_issue"
                value={formData.date_of_issue}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="date_of_expiry">
              <Form.Label>Date of Expiry: </Form.Label>
              <Form.Control
                type="text"
                name="date_of_expiry"
                value={formData.date_of_expiry}
                onChange={handleInputChange}
              />
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Save Details
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddDetailsManually;
