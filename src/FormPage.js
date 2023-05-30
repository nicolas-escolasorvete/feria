import React, { useState } from "react";
import axios from "axios";
import { QrReader } from "react-qr-reader";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FormPage.css";
import Logo from "./assets/logo-horizontal.png";

function FormPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [barcodeData, setBarcodeData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert("Por favor complete todos los campos.");
      return;
    }
    const data = { name, email, phone, barcode: barcodeData };
    axios
      .get(
        `https://sheet2api.com/v1/o9EZiCzTliju/leads-feria?phone=${phone}&email=${email}`
      )
      .then((response) => {
        if (response.data.length > 0) {
          alert(
            "Este número de teléfono o correo electrónico ya está registrado."
          );
        } else {
          axios
            .post("https://sheet2api.com/v1/o9EZiCzTliju/leads-feria", data)
            .then(() => {
              alert("Sus datos han sido enviados correctamente.");
              setName("");
              setEmail("");
              setPhone("");
              setBarcodeData(null);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleBarcodeScan = (data) => {
    if (data) {
      setBarcodeData(data);
    }
  };

  return (
    <div className="formcito">
      <div className="form-container">
        <div className="logo-container">
          <img src={Logo} alt="Logo" className="logo" />
        </div>
        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nombre:</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Teléfono:</label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="barcode">Código de Barras:</label>
              <QrReader
                delay={300}
                onError={(error) => console.error(error)}
                onScan={handleBarcodeScan}
                style={{ width: "100%" }}
              />
              <input
                type="text"
                className="form-control"
                id="barcode"
                value={barcodeData || ""}
                readOnly
              />
            </div>
            <div className="form-group-button">
              <button type="submit" className="botoncito">
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormPage;
