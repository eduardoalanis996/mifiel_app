import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Navbar, Form, FormControl } from "react-bootstrap";

function HomePage() {
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
        <Button variant="success">Crear nuevo contrato de compraventa</Button>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </div>
    </div>
  );
}

export default HomePage;
