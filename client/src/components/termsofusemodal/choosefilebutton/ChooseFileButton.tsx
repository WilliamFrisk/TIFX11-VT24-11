import React, { ChangeEvent, useRef, useState } from "react";
import styles from "../modalbutton/ModalButton.module.css";
import { Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

interface ChooseFileButtonProps {
  onFileSelected: (file: File) => void;
}

const ChooseFileButton: React.FC<ChooseFileButtonProps> = ({
  onFileSelected,
}) => {
  const { t } = useTranslation();
  const [text, setText] = useState<string>(t("terms-of-use.choose-button"));
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      onFileSelected(selectedFile);
      setText(selectedFile.name);
    }
  };

  return (
    <Col md={4} className="d-flex justify-content-center mb-2">
      <div className="w-100 d-flex justify-content-center p-0">
        <input
          type="file"
          accept="video/mp4"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <button
          className={styles.button}
          onClick={() => fileInputRef.current?.click()}
        >
          {text}
        </button>
      </div>
    </Col>
  );
};

export default ChooseFileButton;
