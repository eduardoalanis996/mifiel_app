import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import MifielWidget from "../components/MiFielWidget";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://127.0.0.1:3333/";

function SignPage() {

  const [encode, setEncode] = useState("");

  const navigate = useNavigate();

  const callback = () => {
    navigate(`/`);
  };

  let { widgetId } = useParams();

  const mifielConfig = {
    widgetId: widgetId,
    successBtnText: "Finalizar",
    onSuccess: {
      callToAction: callback,
    },
    pdf: encode,
    onError: {
      listener: function (e) {
        console.log(e);
      },
      callToAction: "",
    },
    sandbox: true,
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}documents/${widgetId}`)
      .then((response) => response.json())
      .then((result) => {
        setEncode(result.document.encode);
      })
      .catch((error) => {
        alert("Error al cargar datos");
        console.error("Error al cargar datos:", error);
      });
  }, [widgetId]);

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
        <div id="widgets">
          <MifielWidget {...mifielConfig} />
        </div>
      </div>
    </div>
  );
}

export default SignPage;
