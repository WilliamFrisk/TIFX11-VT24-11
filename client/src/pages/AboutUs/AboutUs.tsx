import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import styles from "./AboutUs.module.css";
// background: #D9D9D9;

const AboutUs: React.FC = () => {
  return (
    <Container fluid className={`${styles.container} flex-grow-1`}>
      <div className={styles.background}>
        <Col>
          <Row>
            <h1>About us</h1>
            <p>
              We are a group of six students at Chalmers University of
              Technology. This website was made as a part of our bachelor's
              thesis to allow anyone to use our machine learning model.
            </p>
          </Row>
          <Row>
            <h1>About our model</h1>
            <p></p>
          </Row>
          <Row>
            <h1>Code</h1>
            <p>
              <a href="https://github.com/WilliamFrisk/TIFX11-VT24-01">
                GitHub
              </a>
            </p>
          </Row>
          <Row>
            <h1>Contact us</h1>
            <p className="text-padding">
              Mail: <br />
              <a href="mailto:weareprettycool@gmail.com">
                weareprettycool@gmail.com
              </a>
            </p>
          </Row>
        </Col>
      </div>
    </Container>
  );
};

export default AboutUs;
