import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import styles from "./AboutUs.module.css";
import { useTranslation } from "react-i18next";

const AboutUs: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Container fluid className={`${styles.container} flex-grow-1`}>
      <div className={styles.background}>
        <Col>
          <Row>
            <h1>{t("about-us.about-us-title")}</h1>
            <p>{t("about-us.about-us-body")}</p>
          </Row>
          <Row>
            <h1>{t("about-us.about-our-model")}</h1>
            <p>{t("about-us.about-our-model-body")}</p>
          </Row>
          <Row>
            <h1>{t("about-us.code")}</h1>
            <p>
              <a href="https://github.com/WilliamFrisk/TIFX11-VT24-01">
                GitHub
              </a>
            </p>
          </Row>
          <Row>
            <h1>{t("about-us.contact-us")}</h1>
            <p className="text-padding">
              {t("about-us.mail")}
              <br />
              <a href="mailto:isachans@chalmers.se">isachans@chalmers.se</a>
            </p>
          </Row>
        </Col>
      </div>
    </Container>
  );
};

export default AboutUs;
