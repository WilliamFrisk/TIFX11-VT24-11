import React from "react";
import styles from "./ModalButton.module.css";
import { Col } from "react-bootstrap";

interface ModalButtonProps {
  text: string;
  onClick: Function;
}

const ModalButton: React.FC<ModalButtonProps> = ({ text, onClick }) => {
  return (
    <Col md={4} className="d-flex justify-content-center mb-2">
      <button className={styles.button} onClick={() => onClick()}>
        {text}
      </button>
    </Col>
  );
};

export default ModalButton;
