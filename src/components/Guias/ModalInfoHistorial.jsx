import React from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const ModalInfoHistorial = ({ show, setModalShow, data }) => {
  if(!data) {
    return (
      <Modal
        show={show}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className="text-center">
            <h2>Cargando...</h2>
            <Spinner animation="border"></Spinner>
          </div>
        </Modal.Body>
      </Modal>
    )
  }

  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        closeButton
        onClick={() => setModalShow(false)}
      ></Modal.Header>
      <Modal.Body className="row">
        <Modal.Title id="contained-modal-title-vcenter" className="text-center">
          Heka Entrega <hr />
        </Modal.Title>
        <h4 className="text-center">Remitente</h4>
        <p className="col-12 col-sm-6">
          Nombre: <strong>{data.nombreR}</strong>
        </p>
        <p className="col-12 col-sm-6">
          Correo: <strong>{data.correoR}</strong>
        </p>
        <p className="col-12 col-sm-6">
          Celular: <strong>{data.celularR}</strong>
        </p>
        <p className="col-12 col-sm-6">
          Departamento: <strong>{data.departamentoR}</strong>
        </p>
        <p className="col-12 col-sm-6">
          Ciudad: <strong>{data.ciudadR}</strong>
        </p>
        <p className="col-12 col-sm-6">
          Direccion: <strong>{data.direccionR}</strong>
        </p>
        <hr />
        <h4 className="text-center">Destinatario</h4>
        <p className="col-12 col-sm-6">
          Nombre: <strong>{data.nombreD}</strong>
        </p>
        <p className="col-12 col-sm-6">
          Correo: <strong>{data.correoD}</strong>
        </p>
        <p className="col-12 col-sm-6">
          Celular: <strong>{data.celularD}</strong>
        </p>
        <p className="col-12 col-sm-6">
          Telefono: <strong>{data.telefonoD}</strong>
        </p>
        <p className="col-12 col-sm-6">
          Ciudad: <strong>{data.ciudadD}</strong>
        </p>
        <p className="col-12 col-sm-6">
          Departamento: <strong>{data.departamentoD}</strong>
        </p>
        <p className="col-12 col-sm-6">
          Direccion: <strong>{data.direccionD}</strong>
        </p>
        <p className="col-12 col-sm-6">
          Identificacion: <strong>{data.identificacionD}</strong>
        </p>

        <hr />
        <h4 className="text-center">Paquete</h4>
        <p className="col-12 col-sm-6">
          Tipo de envio: <strong>{data.type}</strong>
        </p>
        <p className="col-12 col-sm-6">
          Transportadora: <strong>{data.transportadora}</strong>
        </p>
        <p className="col-12 col-sm-6">
          Dice Contener: <strong>{data.dice_contener}</strong>
        </p>
        <p className="col-12 col-sm-6">
        Alto: <strong>{data.alto}cm</strong>
        </p>
        <p className="col-12 col-sm-6">
        Ancho: <strong>{data.ancho}cm</strong>
        </p>
        <p className="col-12 col-sm-6">
        Largo: <strong>{data.largo}</strong>
        </p>
        <p className="col-12 col-sm-6">
        Peso: <strong>{data.peso}</strong>
        </p>
        <p className="col-12 col-sm-6">
        Costo envio: <strong>$ {data.costo_envio}</strong>
        </p>
        <p className="col-12 col-sm-6">
        Valor a cobrar: <strong>$ {data.valor}</strong>
        </p>
        <p className="col-12 col-sm-6">
        Comisión: <strong>$ {data.detalles.sobreflete_oficina}</strong>
        </p>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center ">
        <Button variant="dark" onClick={() => setModalShow(false)}>
          Cerrar
        </Button>
        <NavLink to={"/rotulo/"+data.id_user+"/"+data.id_heka}>
          <Button>
            Descargar rótulo
          </Button>
        </NavLink>
      </Modal.Footer>
    </Modal>
  );
};
export default ModalInfoHistorial;