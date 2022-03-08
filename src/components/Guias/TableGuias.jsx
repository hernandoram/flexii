import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import ModalInfoHistorial from "./ModalInfoHistorial";
import { dbFirestore } from "../../firebase";
import { doc, getDoc } from "@firebase/firestore";

import { Form } from "react-bootstrap";


import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { actualizarGuia, actualizaEstadoGuiaUsuario } from "../../redux/actions/GuiasAction";
import tipoActualizacionEstado from "../../helpers/tipoActualizacionEstado";
const TableGuias = ({ guias, filter }) => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [dataGuia, setDataGuia] = useState();
  const [data, setData] = useState(guias);

  useEffect(() => {
    setData(guias)
  }, [guias]);
  
  const omitBtnAction = !["Recibidos", ""].includes(filter);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id_heka,
      sortable: true,
    },
    {
      name: "Guia",
      selector: (row) => row.numeroGuia,
      sortable: true
    },
    {
      name: "Fecha",
      selector: (row) => row.fecha,
    },
    {
      name: "Transportadora",
      selector: (row) => row.transportadora,
    },
    {
      name: "Acción",
      selector: (row) => {
        if(!row.recibidoEnPunto) return "En proceso";
        if(row.entregadaDestinatario) return "Entregada";
        return <Button onClick={() => handleEntregarClick(row)}>Entregar</Button>
      },
      button: true,
      omit: omitBtnAction  
    }
  ];

  const handleButtonClick = async (e) => {
    try {
      if (e.recibidoEnPunto) {
        setModalShow(true);
        await new Promise((res) => setTimeout(res("completado"), 10000))
        const datosGuia = await getDoc(doc(dbFirestore, `usuarios/${e.id_user}/guias/${e.id_heka}`));
        setDataGuia(datosGuia.data());
      } else {
        const movimientosGuia = await getDoc(doc(dbFirestore, "usuarios", e.id_user, "movimientoGuias", e.id_heka));
        if(movimientosGuia.exists()) console.log("Los movimientos de la guia => ", movimientosGuia.data().movimientos);
        Swal.fire("Este paquete aun no ha sido registrado");
      }
    } catch (error) {
      console.log(`ERROR en TableGuias.jsx en handleButtonClick: ${error} `);
    }
  };

  const buscar = (e) => {
    try {
      let newArray
      let texto = e.toUpperCase()
      console.log(texto);
      if(e !== ""){
        newArray = guias.filter((guia) => guia.transportadora.toUpperCase().includes(texto))
        if(newArray.length === 0){
          newArray = guias.filter((guia) => guia.fecha.toUpperCase().includes(texto))
          if(newArray.length === 0){
            newArray = guias.filter((guia) => guia.numeroGuia.toUpperCase().includes(texto))
            if(newArray.length === 0){
              newArray = guias.filter((guia) => guia.id_heka.toUpperCase().includes(texto))
            }
          }
        }
        setData(newArray)
      }else{
        setData(guias)
      }
    } catch (error) {
      console.log(`ERROR TableGuias buscar: ${error}`);
    }
  }

  const handleEntregarClick = async (row) => {
    Swal.fire({
      title: "Entregando guía",
      text: "Estás entregando la guía " + row.numeroGuia + ". ¿Deseas cotinuar?",
      showCancelButton: true,
      confirmButtonText: "Si, continuar"
    }).then(res => {
      if(res.isConfirmed) {
        const actualizar = tipoActualizacionEstado.entregar;
    
        dispatch(actualizarGuia(actualizar, row.id_heka, row.parent_id));
        actualizaEstadoGuiaUsuario(row.id_heka, row.id_user, {
          estado: "Entregada destinatario",
          seguimiento_finalizado: true
        });
      }
    });

  }

  const sinRegistro = <h5 className="m-3 text-center">No hay registro en esta tabla</h5>

  return (
    <div className="row">
      <div className="col-12 d-flex justify-content-center">
      
        <Form.Control type="text" className="m-3" placeholder="Buscar..." onChange={(e) => buscar(e.target.value)}/>
        
      </div>
      <div className="col-12">

        <DataTable
          columns={columns}
          data={data}
          pagination
          pointerOnHover
          highlightOnHover
          noDataComponent={sinRegistro}
          onRowClicked={(e) => handleButtonClick(e)}
        />
      </div>

      {modalShow && (
        <ModalInfoHistorial
          show={modalShow}
          setModalShow={setModalShow}
          data={dataGuia}
        />
      )}
    </div>

  );
};


export default TableGuias;
