import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalInfoPagos = ({ show, setModalShow, data }) => {
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
        <p className="col-12 col-sm-6">
          Guia: <strong>{data.numeroGuia}</strong>
        </p>
        <p className="col-12 col-sm-6">
          Estado: <strong>{data.debe ? "Debe" : "Cancelado"}</strong>
        </p>

        {data.debe ? (
          <h1>debo</h1>
        ) : (
          <div>
            <p className="col-12 col-sm-6">
              Fecha cancelacion: <strong>5/1/22</strong>
            </p>
            <p className="col-12 col-sm-6">
              Total pagado: <strong>{data.total_pagar}</strong>
            </p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center ">
        <Button variant="dark" onClick={() => setModalShow(false)}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalInfoPagos;
