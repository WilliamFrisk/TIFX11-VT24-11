import React from "react";
import { Col, Container, Modal, ModalBody, Row } from "react-bootstrap";
import styles from "./TermsOfUseModal.module.css";
import ModalButton from "./modalbutton/ModalButton";
import { useTranslation } from "react-i18next";

interface TermsOfUseModalProps {
  show: boolean;
  hide: Function;
}

const TermsOfUseModal: React.FC<TermsOfUseModalProps> = ({ show, hide }) => {
  const { t } = useTranslation();

  const handleChooseFile = () => {
    // Interact with devices native file upload
  };

  const handleUpload = () => {
    // Send video to backend
  };

  return (
    <Modal
      show={show}
      onHide={() => hide()}
      dialogClassName={styles.dialog}
      contentClassName={styles.content}
      animation={false}
      centered
    >
      <ModalBody>
        <Container>
          <Row>
            <h4 className={`${styles.text} ${styles.title}`}>
              {t("terms-of-use.title")}
            </h4>
            <p className={styles.text}>{t("terms-of-use.first-line")}</p>
            <p className={styles.text}>{t("terms-of-use.second-line")}</p>
            <p className={styles.text}>{t("terms-of-use.third-line")}</p>
            <p className={styles.text}>{t("terms-of-use.fourth-line")}</p>
          </Row>
          <Row>
            <ModalButton
              text={t("terms-of-use.choose-button")}
              onClick={handleChooseFile}
            />
            <ModalButton
              text={t("terms-of-use.upload-button")}
              onClick={handleUpload}
            />
            <ModalButton
              text={t("terms-of-use.quit-button")}
              onClick={() => hide()}
            />
          </Row>
        </Container>
      </ModalBody>
    </Modal>
  );
};

export default TermsOfUseModal;
