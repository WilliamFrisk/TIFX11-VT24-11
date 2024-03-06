import React from "react";
import styles from "./UploadButton.module.css";

interface UploadButtonProps {
  onClick: Function;
}

const UploadButton: React.FC<UploadButtonProps> = ({ onClick }) => {
  return (
    <button className={styles.button} onClick={(e) => onClick(e)}>
      UPLOAD AN MP4-FILE
    </button>
  );
};

export default UploadButton;
