import React, { useState,useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SignaturesModal from '../components/SignaturesModal';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:3333/'

function HomePage() {

  const [show, setShow] = useState(false);
  const [documents, setDocuments] = useState([]);

  const navigate = useNavigate(); 

  const toSign = (id) => navigate( `sign/${id}`);

  const handleClose = () =>  setShow(false);

  const handleShow = () => setShow(true);
  
  const handleDownload = async (mifiel_document_id, type) => {  

     try {
      const response = await axios.get(`${API_BASE_URL}documents/download/${mifiel_document_id}?type=${type}`, {
        responseType: 'blob',
      });

      const pdfBlob = new Blob([response.data], { type: 'application/'+type });
      const pdfUrl = window.URL.createObjectURL(pdfBlob);

      const link = document.createElement('a');
      link.href = pdfUrl;
      link.style.display = 'none';
      link.download = `contract_signed_${mifiel_document_id}.${type}`; 

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(pdfUrl);
    } catch (error) {
      console.error('Error al descargar el PDF:', error);
    }
  };

  const createDocument = (signatories)=>{
    if(signatories.length ){
      axios.post(`${API_BASE_URL}documents`,{
        signatories
      }).then((result) => {
        setShow(false);
        window.location.reload();
      })
      .catch((error) => {
        alert('Error al cargar datos')
        console.error('Error al cargar datos:', error);
      });
    }

  }

  useEffect(() => {
    fetch(`${API_BASE_URL}documents`)
      .then((response) => response.json())
      .then((result) => {
        setDocuments(result);
      })
      .catch((error) => {
        alert('Error al cargar datos')
        console.error('Error al cargar datos:', error);
      });
  }, []);

  return (
    <div>
      <SignaturesModal show={show} handleClose={handleClose} callback={createDocument}></SignaturesModal>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <h2 className="navbar-brand mx-auto text-secondary">
            Generador de contratos de compra venta
          </h2>
        </div>
      </nav>
      <div className="container text-secondary">
        <Button onClick={handleShow} variant="success mt-4">Crear nuevo contrato de compraventa</Button>
        <table className="table mt-5">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Participantes</th>
              <th>Creado</th>
              <th>Estatus</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {documents.map((item) => (
              <tr key={item.widget_id}>
                <td>{item.documents.name}</td>
                <td>
                  {item.signatories.map((s, index)=>(
                    <p style={{
                      cursor: !s.is_signed ? 'pointer' : 'default',
                    }} key={index} className={'text-' + (s.is_signed ? 'success' : 'warning')} onClick={() => (!s.is_signed ? toSign(s.widget_id) : null)}>{s.email}</p>
                  ))}
                </td>
                <td>{item.documents.created_at}</td>
                <td>{item.documents.is_signed ? (
                    <p className="text-success">Firmado</p>
                  ) : (
                    <p className="text-warning">Pendiente</p>
                  )}</td>
                <td>
                {item.documents.is_signed ? (
                  <>
                  <Button variant="success" onClick={() => handleDownload(item.documents.mifiel_document_id,'zip')}>
                    Descargar zip
                  </Button><br></br>
                  <Button className='mt-2' variant="danger" onClick={() => handleDownload(item.documents.mifiel_document_id,'pdf')}>
                    Descargar PDF
                  </Button>
                  </>
                ) : (
                  item.is_signed ? (
                    <span>
                    </span>
                  ) : (
                    <Button variant="primary" onClick={() => toSign(item.widget_id)}>
                      Firmar
                    </Button>
                  )
                )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HomePage;
