import React, { useState } from "react";
import { Row, Col, Container, Image } from "react-bootstrap";
import UploadButton from "../components/uploadbutton/UploadButton";
import TermsOfUseModal from "../components/termsofusemodal/TermsOfUseModal";
import picture from "../assets/example-result.png";

const HomePage: React.FC = () => {
  const [touModalShow, setTouModalShow] = useState(false);
  return (
    <Container fluid className="flex-grow-1 m-2" style={{ maxWidth: "97%" }}>
      <Row className="h-100">
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center"
        >
          <UploadButton onClick={() => setTouModalShow(true)} />
        </Col>
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center"
        >
          <Image style={{ maxWidth: "100%", height: "auto" }} src={picture} />
        </Col>
        <TermsOfUseModal
          show={touModalShow}
          hide={() => setTouModalShow(false)}
        />
      </Row>
    </Container>
  );
};

export default HomePage;
