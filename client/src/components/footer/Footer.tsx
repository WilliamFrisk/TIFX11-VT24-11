import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";
import { useTranslation } from "react-i18next";
const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Container fluid className="background-container">
      <Row>
        <Col className="text-align">
          <h1>{t("footer.about-us-title")}</h1>
          <p>{t("footer.about-us-body")}</p>
        </Col>
        <Col className="text-align" md={4}>
          <h1>{t("footer.contact-us")}</h1>
          <p className="text-padding">
            {t("footer.mail")}
            <br />
            <a href="mailto:isachans@chalmers.se">isachans@chalmers.se</a>
          </p>
        </Col>
        <Col>
          <h1>{t("footer.code")}</h1>
          <p>
            <a href="https://github.com/WilliamFrisk/TIFX11-VT24-01">GitHub</a>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
