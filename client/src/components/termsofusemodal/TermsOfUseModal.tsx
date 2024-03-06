import React from "react";
import { Col, Container, Modal, ModalBody, Row } from "react-bootstrap";
import styles from "./TermsOfUseModal.module.css";
import ModalButton from "./modalbutton/ModalButton";

interface TermsOfUseModalProps {
  show: boolean;
  hide: Function;
}

const TermsOfUseModal: React.FC<TermsOfUseModalProps> = ({ show, hide }) => {
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
            <h4 className={`${styles.text} ${styles.title}`}>TERMS OF USE</h4>
            <p className={styles.text}>
              This model does not aim to give medical advice, consult with a
              doctor or other specialist before adjusting your running gait{" "}
            </p>
            <p className={styles.text}>
              When analysing your data the data is locally saved and then
              deleted, you can pull back your data anytime by pressing quit{" "}
            </p>
            <p className={styles.text}>
              The model has best results when only one person is in frame and
              when at least 5 running gaits are included
            </p>
            <p className={styles.text}>
              By using the model I agree with these terms
            </p>
          </Row>
          <Row>
            <ModalButton text="CHOOSE FILE" onClick={handleChooseFile} />
            <ModalButton text="UPLOAD" onClick={handleUpload} />
            <ModalButton text="QUIT" onClick={() => hide()} />
          </Row>
        </Container>
      </ModalBody>
    </Modal>
  );
};

export default TermsOfUseModal;
