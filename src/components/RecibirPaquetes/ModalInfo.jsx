import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalInfo = ({ show, setModalShow, data }) => {
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => setModalShow(false)}
    >
      <Modal.Header closeButton>
          
      </Modal.Header>
      <Modal.Body className="row">
      <Modal.Title id="contained-modal-title-vcenter" className="text-center alert alert-primary" role="alert">
          ¡Estamos registrando el siguiente paquete!
        </Modal.Title>
        <h4 className="text-center">Remitente</h4>
        <p className="col-12 col-sm-6">
          Nombre: <strong>{data.nombreR}</strong>
        </p>
        <p className="col-12 col-sm-6">
          Correo: <strong>{data.correoR}</strong>
        </p>
        <p className="col-12 col-sm-6">
          Celular:<strong>{data.celularR}</strong>
        </p>
        <p className="col-12 col-sm-6">
          Ciudad:<strong>{data.ciudadR}</strong>
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
          Ciudad: <strong>{data.ciudadD}</strong>
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
        Numero Guía: <strong>{data.numeroGuia}</strong>
        </p>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center ">
          <span className="alert alert-warning">Recuerda: Para conocer más detalles sobre el paquete, debes dirigirte a historial y seleccionar el id_heka correspondiente a este paquete.</span>
        <Button variant="dark" onClick={() => setModalShow(false)} >Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalInfo;
