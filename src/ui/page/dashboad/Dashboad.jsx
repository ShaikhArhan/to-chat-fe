import React, { useState } from "react";
import "./Dashboad.css";

export function Dashboad() {
  const [checkedItems, setCheckedItems] = useState({
    installAuth: true,
    insertCardReader: false,
    cardNotRead: false,
  });

  const handleCheckboxChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <button className="menu-btn">☰</button>
        <button className="icon-btn">📄</button>
        <button className="icon-btn">🖼️</button>
        <button className="icon-btn">⚙️</button>
      </aside>
      <main className="content">
        <div className="card">
          <h2>Nem todos os pré-requisitos são cumpridos</h2>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="installAuth"
              checked={checkedItems.installAuth}
              onChange={handleCheckboxChange}
            />
            Instalar Autenticação.gov
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="insertCardReader"
              checked={checkedItems.insertCardReader}
              onChange={handleCheckboxChange}
            />
            Inserir o leitor de cartão
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="cardNotRead"
              checked={checkedItems.cardNotRead}
              onChange={handleCheckboxChange}
            />
            Cartão não pode ser lido
          </label>
          <button className="reload-btn">RECARREGAR</button>
        </div>
      </main>
    </div>
  );
}
