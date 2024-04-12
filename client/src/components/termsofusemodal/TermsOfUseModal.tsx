import React, { useEffect, useState } from "react";
import { Container, Modal, ModalBody, Row } from "react-bootstrap";
import styles from "./TermsOfUseModal.module.css";
import ModalButton from "./modalbutton/ModalButton";
import { useTranslation } from "react-i18next";
import ChooseFileButton from "./choosefilebutton/ChooseFileButton";

interface TermsOfUseModalProps {
  show: boolean;
  hide: Function;
  onFileChange: Function;
}

const TermsOfUseModal: React.FC<TermsOfUseModalProps> = ({
  show,
  hide,
  onFileChange,
}) => {
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
  };

  const handleUpload = (file: File | null) => {
    if (file) {
      onFileChange(file);
    }
  };

  // Determine whether the Upload button should be disabled
  const isUploadDisabled = !selectedFile;

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
            <ChooseFileButton onFileSelected={handleFileSelected} />
            <ModalButton
              text={t("terms-of-use.upload-button")}
              onClick={() => handleUpload(selectedFile)}
              disabled={isUploadDisabled}
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
