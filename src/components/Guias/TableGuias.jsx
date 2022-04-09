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
  
  const omitBtnAction = !["Recibidos"].includes(filter);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id_heka,
      sortable: true,
      omit: filter === ""
    },
    {
      name: "Guia",
      selector: (row) => row.numeroGuia,
      sortable: true,
      omit: filter === ""
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
        return (
          <div>
            <Button onClick={() => handleEntregarClick(row)}>Entregar</Button>
          </div>
        )
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

  const handleRotuloClick = (row) => {
    var transportadora = row.transportadora;
    var guia = row.guia;
    var remitente = row.remitente;
    var destinatario = row.destinatario;
    var direccion = row.direccion;
    var ciudad = row.ciudad;
    var ciudadR = row.ciudadR;
    var contenido = row.contenido;
    var peso = row.peso;
    var fecha = row.fecha;
    var documentoCliente = row.documentoCliente;
    var celRem= row.celRem;
    var celDes= row.celDes;
    var costoEnvio= row.costoEnvio;
    var texto_tipo_envio= row.texto_tipo_envio;
    var destinopaga=row.destinopaga;
    var remitentepaga=row.remitentepaga;
  
   
  
    let pagina = `<!DOCTYPE html>
   <html lang="en">
   
   <head>
   
     <meta charset="utf-8">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
     <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
     <meta name="description" content="">
     <meta name="author" content="">
   
     <title>Rótulo-Heka entrega</title>
   
     <!-- Custom fonts for this template -->
     <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
     <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">
   
     <!-- Custom styles for this template -->
     <link href="css/sb-admin-2.min.css" rel="stylesheet">
   
    
   
   </head>
   
   <body id="page-top">
   
     
   
             <!-- DataTales Example -->
             <!--
               <div class="card-header py-3">
                 
                 <h6 class="m-0 font-weight-bold text-primary">DataTables Example</h6>
                 
               </div>
               -->
               <div class="card-body">
                 <div class="table-responsive">
                   <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                     <thead>
                       <!--
                       <tr>
                         <th>
                           <img src="img/WhatsApp Image 2020-09-12 at 9.11.53 PM.jpeg" alt="" width="150" height="150">
                           <h3>ENVIA -  <strong>Guía : * 21312 *</strong>               </h3> 
                           <h3><strong>Remitente:</strong>  hekaentrega.co armando casas</h3>
                           <h3><strong> Destinatario: </strong>Helena arm               </h3>
                           <h3>Dirección: calle 2 #23-32                                </h3>
                           <h3>Ciudad: BOGOTA(CUNDINAMARCA)                             </h3>
                           <h3>Contenido: Calzado                                       </h3>
                           <h3>Peso: 1 kg                                               </h3>
                         </th>
                         <th>
                           <img src="img/WhatsApp Image 2020-09-12 at 9.11.53 PM.jpeg" alt="" width="150" height="150">
                           <h3>ENVIA -  <strong>Guía : * 21312 *</strong>               </h3> 
                           <h3><strong>Remitente:</strong>  hekaentrega.co armando casas</h3>
                           <h3><strong> Destinatario: </strong>Helena arm               </h3>
                           <h3>Dirección: calle 2 #23-32                                </h3>
                           <h3>Ciudad: BOGOTA(CUNDINAMARCA)                             </h3>
                           <h3>Contenido: Calzado                                       </h3>
                           <h3>Peso: 1 kg                                               </h3>
                         </th>
                        
                        
   
                          
                         
                       </tr>
                     -->
                     </tfoot>
                     <tbody>`;
  
    pagina += ` <tr>
    <td>
      
      <img src="https://www.hekaentrega.co/img/WhatsApp%20Image%202020-09-12%20at%209.11.53%20PM.jpeg" alt="" width="100" height="100">
      
      <h5 class="text-dark">${transportadora} - GUIA:  <strong  >${guia}</strong></h5>
    
      <h5 class="text-dark ">Remitente: <strong>hekaentrega.co - ${remitente}</strong></h5>
    
    
      <h5 class="text-dark "> Destinatario: <strong> ${destinatario}</strong></h5>
      <h5 class="text-dark ">Dirección: <strong> ${direccion}  </strong>                            </h5>
      <h5 class="text-dark ">Ciudad:  <strong> ${ciudad} </strong>                           </h5>
      <h5 class="text-dark ">Contenido: <strong> ${contenido}  </strong>                                 </h5>
      <h5 class="text-dark ">Peso:    <strong> ${peso} kg   </strong>                                           </h5></td>
    
     
     
     
   
    
  
    
     
    </tr>
  
    <table class="table table-bordered">
    <tbody>
      <tr>
        <td>
  
      
  
         <img src="img/WhatsApp Image 2020-09-12 at 9.11.53 PM.jpeg" alt="" width="40" height="40">
         </td>
     
    
        
          <td>
             <p><small><cite>HEKA ENTREGA NIT 1072497419-8 Cel: +57 321 336 19 11  SILVANIA(CUNDINAMARCA) - No somos transportadora, somos una plataforma conectada tecnológicamente con aliados logísticos
            que permiten el envío de paquetes e-commerce u otro tipo de mercancía.</cite></small></p>  
          </td>
        
      
          <td><small class="texto-small"><strong>hekaentrega.co</strong></small> </td>
      
          <td><small class="texto-small"><strong>RECIBE:</strong>  ${remitente} </small> </td>
     
  
     <td><small class="texto-small"><strong>Fecha:</strong>  ${fecha}</small> </td>
       
     
      
        <td><small class="texto-small"> <strong>Guia: </strong>${guia}</small></td>
       
    
        <td><small class="texto-small"><strong>Transportadora:</strong>   ${transportadora} </small></td>
  
   
   
   
   
  
  </tbody>
  </table>
  
  
  
  
  <table class="table borderless">
  <tbody>
    <tr>
      <td>
       <table class="table table-bordered">
         <tbody>
           <tr>
             <p><small><cite>El usuario deja constancia expresa de que acepta y tiene conocimiento del contrato publicado en la pagina web hekaentrega.co 
                ,como remitente declara que este envío no contiene dinero en efectivo, joyas, objetos o fines prohibidos por la ley, y exime a hekaentrega y la transportadora asignada de toda responsabilidad. </cite></small></p>
             <td>
               <small class="texto-small"><strong>DATOS REMITENTE </strong></small> <br>
               <small class="texto-small"><strong>Remitente: </strong>${documentoCliente}</small> <br>
               
               <small class="texto-small"><strong>Origen: </strong>${ciudadR}</small><br>
               <small class="texto-small"><strong>Cel/Tel: </strong>${celRem}</small><br>
             </td>
             <td>
               <small class="texto-small"><strong>DATOS DESTINO </strong></small> <br>
               <small class="texto-small"><strong>Destinatario: </strong>${destinatario}</small> <br>
               <!--
               <small class="texto-small"><strong>CC o NIT: </strong>3242234</small><br>
               -->
               <small class="texto-small"><strong>Destino: </strong>${ciudad}</small><br>
               <small class="texto-small"><strong>Dirección: </strong>${direccion}</small> <br>
               <small class="texto-small"><strong>Cel/Tel: </strong>${celDes}</small>
             </td>
               
            
           </tr>
           
         </tbody>
       </table>
      </td>
     
      <td>
       <small class="texto-small"><strong>Escanear código Whatsapp </strong></small> <br>
        <img src="img/codigo qr wap.PNG" width="160" height="160" alt="">
      </td>
      <td>
       <table class="table table-bordered">
         <tbody>
           <tr>
             <td>
               <small class="texto-small"><strong>Peso real:  </strong> ${peso} kg</small> <br>
              
               <small class="texto-small"><strong>Contenido:  </strong>${contenido}</small> <br>
               <small class="texto-small"><strong>Costo envío:  </strong>${costoEnvio}</small> <br>
              
               
               
             </td>
             <td>
               <h3 class="text-center"><strong>ENVÍO ${texto_tipo_envio}</strong> </h3>
               
               <hr class="sidebar-divider"></hr>
               <small class="text-center texto-small2"><strong>ORIGEN PAGA: </strong>${remitentepaga}</small><br>
              
               <hr class="sidebar-divider"></hr>
               <small class="text-center texto-small2"><strong>DESTINO PAGA: </strong>${destinopaga}</small>
              
             </td>
            
           </tr>
         </tbody>
       </table>
      </td>
    </tr>
  </tbody>
  </table>
  
  
  
  
  </div>
  </div>
  
  
  
  <!-- Bootstrap core JavaScript-->
  <script src="vendor/jquery/jquery.min.js"></script>
  <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  
  <!-- Core plugin JavaScript-->
  <script src="vendor/jquery-easing/jquery.easing.min.js"></script>
  
  <!-- Custom scripts for all pages-->
  <script src="js/sb-admin-2.min.js"></script>
  
  <!-- Page level plugins -->
  <!--
  <script src="vendor/datatables/jquery.dataTables.min.js"></script>
  <script src="vendor/datatables/dataTables.bootstrap4.min.js"></script>
  -->
  
  <!-- Page level custom scripts -->
  <script src="js/demo/datatables-demo.js"></script>
  
  </body>
  
  </html>
  <script language="javascript">
  
  //setTimeout("window.print();",500);
  window.print();
  //-->
  </script>`;

    // const w = window.open();
    // w.document.write(pagina)
    // w.focus()

    
    {/* setTimeout(() => {
        w.print();
        // w.close();
    }, 500) */}

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
