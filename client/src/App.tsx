import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import HomePage from "./pages/HomePage";
import { Container } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <Container fluid className="p-0 d-flex flex-column vh-100">
        <Header />
        <HomePage />
        <Footer />
      </Container>
    </div>
  );
}

export default App;
