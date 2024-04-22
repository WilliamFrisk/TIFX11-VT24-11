import React from "react";
import styles from "./UploadButton.module.css";
import { useTranslation } from "react-i18next";

interface UploadButtonProps {
  onClick: Function;
}

const UploadButton: React.FC<UploadButtonProps> = ({ onClick }) => {
  const { t } = useTranslation();
  return (
    <button className={styles.button} onClick={(e) => onClick(e)}>
      {t("upload-button")}
    </button>
  );
};

export default UploadButton;
