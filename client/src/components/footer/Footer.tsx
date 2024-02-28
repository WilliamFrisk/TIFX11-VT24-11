import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <Container fluid>
      <Row>
        <Col className="text-align">
          <h1>About us</h1>
          <p>
            We are a group of six students at Chalmers University of Technology.
            This website was made as a part of our bachelor's thesis to allow
            anyone to use our machine learning model.
          </p>
        </Col>
        <Col className="text-align" md={4}>
          <h1>Contact</h1>
          <p className="m-0">
            Mail: <br />
            <a href="mailto:weareprettycool@gmail.com" className="m-0">
              weareprettycool@gmail.com
            </a>
          </p>
        </Col>
        <Col>
          <h1>Code</h1>
          <a href="https://github.com/WilliamFrisk/TIFX11-VT24-01">GitHub</a>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
