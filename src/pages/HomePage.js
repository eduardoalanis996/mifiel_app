import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Navbar, Form, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function HomePage() {

  let navigate = useNavigate(); 

  const sing = (id) => {
    let path = `sign/${id}`; 
    navigate(path);
  };


  const data = [
    {
      id: 'BH4kkeZoJJs',
      name: "Contrato 1",
      signatures: ["eduardoalanis996@gmail.com"],
      created_at: "02/11/2023",
      signature_date: "02/11/2023",
      is_signature: true,
    },
    {
      id: 'BH4kkeZoJJ',
      name: "Contrato 2",
      signatures: ["eduardoalanis996@gmail.com", "jonh@mail.com"],
      created_at: "02/11/2023",
      signature_date: null,
      is_signature: false,
    },
    {
      id: 'XA34Ac3zYF',
      name: "Contrato 3",
      signatures: ["eduardoalanis996@gmail.com"],
      created_at: "02/11/2023",
      signature_date: null,
      is_signature: false,
    },
  ];

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <h2 className="navbar-brand mx-auto text-secondary">
            Generador de contratos de compra venta
          </h2>
        </div>
      </nav>
      <div className="container text-secondary">
        <Button variant="success mt-4">Crear nuevo contrato de compraventa</Button>
        <table className="table mt-5">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Participantes</th>
              <th>Creado</th>
              <th>Firmado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.signatures}</td>
                <td>{item.created_at}</td>
                <td>{item.signature_date}</td>
                <td>
                  {item.is_signature ? (
                    <Button variant="success">Descargar</Button>
                  ) : (
                    <Button variant="primary" onClick={() => sing(item.id)}>Firmar</Button>
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
