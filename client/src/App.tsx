import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import HomePage from "./pages/HomePage";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AboutUs from "./pages/AboutUs/AboutUs";

function App() {
  return (
    <Router>
      <div className="App">
        <Container fluid className="p-0 d-flex flex-column vh-100">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about-us" element={<AboutUs />} />
          </Routes>
          <Footer />
        </Container>
      </div>
    </Router>
  );
}

export default App;
