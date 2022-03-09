import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import ModalEdit from "./ModalEdit";
import './profile.css'
const Profile = () => {
  const user = useSelector((state) => state.user);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const closeShow = () => setShow(false);
  return (
    <div className="container">
      <div className="card p-2 my-5 boxCard">
        <div className="d-flex justify-content-center my-2" >
          <FaUserCircle style={{ fontSize: "25rem" }} />
        </div>
        <div className="row card-body">
          <div className="col-12 col-md-6 mb-4 border-bottom ">
            <h3>
              Nombre: <strong> {user.name} </strong>{" "}
            </h3>
          </div>
          <div className="col-12 col-md-6 mb-4 border-bottom ">
            <h3>
              Apellido: <strong>{user.lastName}</strong>{" "}
            </h3>
          </div>
          <div className="col-12 col-md-6 mb-4 border-bottom ">
            <h3>
              Tipo Documento: <strong>{user.typeDocument}</strong>{" "}
            </h3>
          </div>
          <div className="col-12 col-md-6 mb-4 border-bottom ">
            <h3>
              Num Documento: <strong>{user.numDocument}</strong>{" "}
            </h3>
          </div>
          <div className="col-12 col-md-6 mb-4 border-bottom ">
            <h3>
              Ciudad: <strong>{user.city}</strong>{" "}
            </h3>
          </div>
          <div className="col-12 col-md-6 mb-4 border-bottom ">
            <h3>
              Direccion: <strong>{user.direction}</strong>{" "}
            </h3>
          </div>
          <div className="col-12 col-md-6 mb-4 border-bottom ">
            <h3>
            Celular: <strong>{user.phoneNumber}</strong>{" "}
            </h3>
          </div>
          <div className="col-12 col-md-6 mb-4 border-bottom ">
            <h3>
              Celular 2: <strong>{user.telephone}</strong>{" "}
            </h3>
          </div>
          <div className="col-12 col-md-6 mb-4 border-bottom ">
            <h3>
              Nombre Empresa: <strong>{user.companyName}</strong>{" "}
            </h3>
          </div>
          <div className="col-12 col-md-6 mb-4 border-bottom ">
            <h3>
              Industria: <strong>{user.descriptionCompany}</strong>{" "}
            </h3>
          </div>
          <div className="col-12 col-md-6 mb-4 border-bottom ">
            <h3>
              Correo: <strong>{user.email}</strong>{" "}
            </h3>
          </div>
        </div>
        <div className="row">
          <div className="col-12  mb-4 d-grid gap-2">
            <Button 
            variant="dark" 
            className="btn-lg btn-bloc"
            onClick={() => handleShow()}
            >
              Editar
            </Button>
          </div>
        </div>
      </div>
      <ModalEdit show={show} closeShow={closeShow} />
    </div>
  );
};

export default Profile;
