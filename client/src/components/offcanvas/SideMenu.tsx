import React from "react";
import { Offcanvas, Image } from "react-bootstrap";
import styles from "./sideMenu.module.css";
import { X, HouseDoor, Envelope, Person, Github } from "react-bootstrap-icons";
import swedenFlag from "../../assets/flags/sweden-flag-icon.svg";
import { useNavigate } from "react-router-dom";
interface SideMenuProps {
  show: boolean;
  onHide: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ show, onHide }) => {
  const navigate = useNavigate();
  const handleHide = () => {
    onHide();
  };
  const handleNavigationHome = () => {
    navigate("/");
    handleHide();
  };
  const handleNavigationAboutUs = () => {
    navigate("/about-us");
    handleHide();
  };
  const redirectToGitHub = () => {
    window.open(
      "https://github.com/WilliamFrisk/TIFX11-VT24-01",
      "_blank",
      "noopener,noreferrer"
    );
    handleHide();
  };

  return (
    <Offcanvas
      show={show}
      onHide={handleHide}
      contentClassName={styles.offcanvasContent}
      className={styles.offcanvasContent}
    >
      <Offcanvas.Body className={styles.offcanvasBody}>
        <div className={styles.offcanvasMenu}>
          <div className={styles.menuItem} onClick={handleHide}>
            <X size={30} onClick={handleHide} />
            <span>Close menu</span>
          </div>
          <div className={styles.menuItem} onClick={handleNavigationHome}>
            <HouseDoor size={30} />
            <span>Home</span>
          </div>
          <div className={styles.menuItem} onClick={handleNavigationAboutUs}>
            <Envelope size={30} />
            <span>Contact us</span>
          </div>
          <div className={styles.menuItem} onClick={handleNavigationAboutUs}>
            <Person size={30} />
            <span>About us</span>
          </div>
          <div className={styles.menuItem} onClick={redirectToGitHub}>
            <Github size={30} />
            <span>Code</span>
          </div>
        </div>
        <div className={styles.offcanvasFooter}>
          <Image src={swedenFlag} alt="Sweden flag" />
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SideMenu;
