import React from "react";
import styles from "./ModalButton.module.css";
import { Col } from "react-bootstrap";

interface ModalButtonProps {
  text: string;
  onClick: Function;
  disabled?: boolean; // Add disabled prop
}

const ModalButton: React.FC<ModalButtonProps> = ({
  text,
  onClick,
  disabled,
}) => {
  return (
    <Col md={4} className="d-flex justify-content-center mb-2">
      <button
        className={styles.button}
        onClick={() => onClick()}
        disabled={disabled}
      >
        {text}
      </button>
    </Col>
  );
};

export default ModalButton;
