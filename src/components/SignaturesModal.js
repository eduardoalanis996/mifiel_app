import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function SignaturesModal({ show, handleClose, callback }) {

  const styleP = {
    marginBottom: '2px', 
  };

  const [formData, setFormData] = useState({ name: '', email: '', rfc: '' });
  const [signatories, setSignatories] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddSignature = () => {
    if (formData.name && formData.email && formData.rfc) {
      if(signatories.find((sign)=> sign.rfc == formData.rfc || sign.email == formData.email)){
        alert('Ya existe un firmante con los mismos datos')
      }else{
        setSignatories([...signatories, formData]);
        setFormData({ name: '', email: '', rfc: '' });
      }
    }
  };

  const handleSendData = () => {
    callback(signatories)
    cleanData()
  };

  const cleanData=()=>{
    setSignatories([])
    setFormData({ name: '', email: '', rfc: '' })
  }

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Formulario de Firmantes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>RFC</Form.Label>
              <Form.Control
                type="text"
                name="rfc"
                value={formData.rfc}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
          <Button className="mt-3" onClick={handleAddSignature}>Agregar Firmante</Button>
          <Button variant='danger' style={{marginLeft:'2px'}} className="mt-3" onClick={cleanData}>Limpiar Datos</Button>
          {signatories.map((signatory, index) => (
            <div className="mt-3" key={index}>
              <p style={styleP}>Firmante {index + 1}:</p>
              <p style={styleP}>Nombre: {signatory.name}</p>
              <p style={styleP}>Email: {signatory.email}</p>
              <p style={styleP}>RFC: {signatory.rfc}</p>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar Modal
          </Button>
          <Button variant="success" onClick={handleSendData}>
            Enviar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SignaturesModal;
