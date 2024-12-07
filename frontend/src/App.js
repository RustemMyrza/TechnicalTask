import './App.css';
import React from "react";
import Form from "./Form.js";
import Table from "./Table.js";
import DeleteButton from "./DeleteButton.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Добавление расхода</h1>
      </header>
      <div className="App-content">
        <div className="form-container">
          <Form />
        </div>
        <div className="table-container">
          <Table />
          <DeleteButton />
        </div>
      </div>
    </div>
  );
}


export default App;
