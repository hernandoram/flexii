import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./pagos.css";
import TablePagos from "./TablePagos";
const Pagos = () => {
  const { guias } = useSelector((state) => state.guias);
  const [data, setData] = useState([]);

  const filtrar = (filter) => {
    try {
      if (filter === "Realizados") {
        const newArray = guias.filter(
          (guia) => !guia.debe && guia.recibidoEnPunto
        );
        setData(newArray);
      } else if (filter === "Pendientes") {
        const newArray = guias.filter(
          (guia) => guia.debe && guia.recibidoEnPunto
        );
        setData(newArray);
      }
    } catch (error) {
      console.log(`ERROR en Pagos.jsx en filtrar: ${error}`);
    }
  };

  useEffect(() => {
    filtrar("Realizados");
    // eslint-disable-next-line
  }, [guias]);
  return (
    <div className="container">
      <h2 className="text-center">Pagos</h2>
      <div className="row mt-4">
        <div
          onClick={() => filtrar("Realizados")}
          className="col-6 text-center border filterPagos"
        >
          <h3>Realizados</h3>
        </div>
        <div
          onClick={() => filtrar("Pendientes")}
          className="col-6 text-center border filterPagos"
        >
          <h3>Pendientes</h3>
        </div>
      </div>
      <div className="text-center mt-2">
        {guias.length < 1 ? (
          <div className="mt-5 text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <h5>Cargando...</h5>
          </div>
        ) : (
          <div className="text-center mt-2">
            <TablePagos guias={data} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagos;
