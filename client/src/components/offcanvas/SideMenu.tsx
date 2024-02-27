import React, { useState, useEffect, useRef } from "react";
import { Offcanvas } from "react-bootstrap";

interface SideMenuProps {
  show: boolean;
  onHide: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ show, onHide }) => {
  const handleHide = () => {
    onHide();
  };

  return (
    <Offcanvas show={show} onHide={handleHide}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        Some text as placeholder. In real life you can have the elements you
        have chosen. Like, text, images, lists, etc.
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SideMenu;
