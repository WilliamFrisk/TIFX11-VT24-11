import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import SideMenu from "../offcanvas/SideMenu";

import styles from "./Header.module.css";
import swedenFlag from "../../assets/flags/sweden-flag-icon.svg";

const Header: React.FC = () => {
  const [modalShow, setModalShow] = useState(false);

  const handleHideModal = () => {
    setModalShow(false);
  };
  return (
    <Navbar collapseOnSelect expand="lg" className={`${styles.backgroundBlue}`}>
      <>
        <Button
          variant="transparent"
          onClick={() => setModalShow(true)}
          className={`${styles.transparentHamburgerBtn}`}
        >
          <i className="bi bi-list"></i>
        </Button>

        <SideMenu show={modalShow} onHide={handleHideModal} />
      </>
      <h1 className={`${styles.logoText}`}>RUNNING GAIT ANALYSIS</h1>

      <img
        src={swedenFlag}
        alt="Sweden flag"
        className={`${styles.flagIcon}`}
      />
    </Navbar>
  );
};

export default Header;
