import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Navbar, Offcanvas } from "react-bootstrap";
import {
  FaAngellist,
  // FaBars,
  FaUserCircle,
  FaSignInAlt,
  FaPeopleCarry,
  // FaExchangeAlt,
  // FaCoins,
  FaBell
} from "react-icons/fa";
// import { GiHiking } from "react-icons/gi";
import "./sidebar.css";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions/UserAction";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { name } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <Navbar className="box-shadow-navbar" expand={false}>
      <Container fluid>
        <Navbar.Toggle aria-controls="pricipal-sidebar"/>
        <Navbar.Brand>
          <NavLink to="/profile" className="sidebar-item-icon__menu">
            {name}
            <FaUserCircle className="ms-1" />
          </NavLink>
        </Navbar.Brand>
        <Navbar.Offcanvas id="pricipal-sidebar" style={{ maxWidth: "17em" }}>
          <Offcanvas.Header className="sidebarHeader border-bottom" closeButton>
            <Offcanvas.Title className="ms-5">PUNTOS</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="sidebarBody">
            {/* <NavLink to="/" className="sidebar-item border-bottom mb-3">
              <GiHiking className="sidebar-item-icon" /> Progreso
            </NavLink> */}
            <NavLink to="/" className="sidebar-item border-bottom mb-3">
              <FaBell className="sidebar-item-icon" /> Notificaciones
            </NavLink>
            <NavLink
              to="/recepciones"
              className="sidebar-item border-bottom mb-3"
            >
              <FaPeopleCarry className="sidebar-item-icon" /> Recibir Paquete
            </NavLink>
            {/* <NavLink to="/pagos" className="sidebar-item border-bottom mb-3">
              <FaCoins className="sidebar-item-icon" /> Pagos
            </NavLink> */}
            <NavLink to="/historial" className="sidebar-item border-bottom mb-3">
              <FaAngellist className="sidebar-item-icon" /> Historial Servicios
            </NavLink>
            {/* <NavLink
              to="/devoluciones"
              className="sidebar-item border-bottom mb-3"
            >
              <FaExchangeAlt className="sidebar-item-icon" /> Devoluciones
            </NavLink> */}
          </Offcanvas.Body>
          <Offcanvas.Body className="d-flex align-items-end sidebarBody">
            <NavLink
              to="/profile"
              className="sidebar-item border-top pt-2 d-flex justify-content-center w-100"
            >
              <FaUserCircle className="sidebar-item-icon mt-3" /> Perfil
            </NavLink>
            <NavLink
              to="/"
              onClick={() => dispatch(logoutUser())}
              className="sidebar-item border-top pt-2 d-flex justify-content-center w-100"
            >
              <FaSignInAlt className="sidebar-item-icon mt-3" /> salir
            </NavLink>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Sidebar;
