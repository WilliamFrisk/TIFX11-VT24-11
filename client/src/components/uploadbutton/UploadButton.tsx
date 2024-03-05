import React from "react";
import styles from "./UploadButton.module.css";

const UploadButton: React.FC = () => {
  const handleClick = () => {
    // Display terms of use modal
  };

  return (
    <button className={styles.button} onClick={handleClick}>
      UPLOAD AN MP4-FILE
    </button>
  );
};

export default UploadButton;
