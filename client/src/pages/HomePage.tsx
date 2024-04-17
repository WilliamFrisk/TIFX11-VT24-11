import React, { useState } from "react";
import { Row, Col, Container, Image } from "react-bootstrap";
import UploadButton from "../components/uploadbutton/UploadButton";
import TermsOfUseModal from "../components/termsofusemodal/TermsOfUseModal";
import picture from "../assets/example-result.png";
import Result from "../components/result/Result";

const HomePage: React.FC = () => {
  const [touModalShow, setTouModalShow] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (file: File) => {
    setFile(file);
  };

  return (
    <Container fluid className="flex-grow-1 m-2" style={{ maxWidth: "97%" }}>
      {file ? (
        <Row className="h-100">
          <Result file={file} />
        </Row>
      ) : (
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
            onFileChange={handleFileChange}
          />
        </Row>
      )}
    </Container>
  );
};

export default HomePage;
