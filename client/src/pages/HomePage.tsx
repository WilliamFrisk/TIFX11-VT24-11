import React from "react";

import { Row, Col, Container } from "react-bootstrap";
import UploadButton from "../components/uploadbutton/UploadButton";
const HomePage: React.FC = () => {
  return (
    <Container fluid className="flex-grow-1">
      <Row className="h-100">
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center"
        >
          <UploadButton />
        </Col>
        <Col md={6}></Col>
      </Row>
    </Container>
  );
};

export default HomePage;
