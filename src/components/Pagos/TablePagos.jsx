import React, { useState } from "react";

import DataTable from "react-data-table-component";
import ModalInfoPagos from "./ModalInfoPagos";

const TablePagos = ({guias}) => {
  const [modalShow, setModalShow] = useState(false);
  const [dataGuia, setDataGuia] = useState({});
  const columns = [
    {
      name: "Guia",
      selector: (row) => row.id_heka,
      sortable: true
    },
    {
      name: "Estado",
      selector: (row) => (
        row.debe ? "Debe" : "Cancelado"
      ),
    },
    {
        name: "Valor",
        selector: (row) => row.total_pagar,
        sortable: true
    },
  ];

  const handleButtonClick = (e) => {
    try {
        setDataGuia(e);
        setModalShow(true);
    } catch (error) {
      console.log(`ERROR en TablePagos.jsx en handleButtonClick: ${error} `);
    }
  };
  return (
    <>
      <div style={{ cursor: "pointer" }}>
        <DataTable
          columns={columns}
          data={guias}
          pagination
          onRowClicked={(e) => handleButtonClick(e)}
        />
      </div>

      {modalShow && (
        <ModalInfoPagos
          show={modalShow}
          setModalShow={setModalShow}
          data={dataGuia}
        />
      )}
    </>
  );
};

export default TablePagos;
