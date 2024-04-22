import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import SideMenu from "../offcanvas/SideMenu";
import { Image } from "react-bootstrap";
import styles from "./Header.module.css";
import swedenFlag from "../../assets/flags/sweden-flag-icon.svg";
import ukFlag from "../../assets/flags/united-kingdom-flag-icon.svg";
import { useTranslation } from "react-i18next";

/**
 * @author Isac Hansson
 */
const Header: React.FC = () => {
  const [modalShow, setModalShow] = useState(false);
  const { t, i18n } = useTranslation();
  const handleHideModal = () => {
    setModalShow(false);
  };
  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "se" : "en");
  };
  const isEnglish = () => {
    return i18n.language === "en";
  };
  return (
    <Navbar collapseOnSelect expand="lg" className={`${styles.backgroundBlue}`}>
      <>
        <Button
          variant="transparent"
          onClick={() => setModalShow(true)}
          className={`${styles.transparentHamburgerBtn}`}
        >
          <i className="bi bi-list fs-3"></i>
        </Button>

        <SideMenu show={modalShow} onHide={handleHideModal} />
      </>
      <h1 className={`${styles.logoText}`}>{t("header-logo")}</h1>

      {isEnglish() ? (
        <Image
          src={swedenFlag}
          alt="Sweden flag"
          className={styles.flagIcon}
          onClick={toggleLanguage}
        />
      ) : (
        <Image
          src={ukFlag}
          alt="Uk flag"
          className={styles.flagIcon}
          onClick={toggleLanguage}
        />
      )}
    </Navbar>
  );
};

export default Header;
