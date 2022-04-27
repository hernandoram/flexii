import React, { useEffect, useState } from "react";
import "./rotulo.css";
import logoHeka from "../../img/logo-heka.png";
import qr from "../../img/qr_whatsapp.png";
import { useParams } from "react-router-dom";
import { getGuia } from "../../redux/actions/GuiasAction";
import { useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";



const Rotulo = () => {
    const dispatch = useDispatch();
    const [guia, setGuia] = useState(null);

    useEffect(() => {
        init();
    }, [])
    
    useEffect(() => {
        guia && window.print();
    }, [guia])

    const {user_id, id_heka} = useParams();
    const init = async () => {
        const infoGuiaConsultada = await getGuia(user_id, id_heka)(dispatch);
        setGuia(infoGuiaConsultada);
    }

    const charger = () => (<span><Spinner animation="grow" size="sm" /> Cargando...</span>)
    const transportadora = guia ? guia.transportadora : charger();
    const numeroGuia = guia ? guia.numeroGuia : charger();
    const remitente = guia ? guia.nombreR : charger();
    const destinatario = guia ? guia.nombreD : charger();
    const direccion = guia ? guia.direccionD : charger();
    const ciudad = guia ? guia.ciudadD : charger();
    const ciudadR = guia ? guia.ciudadR : charger();
    const contenido = guia ? guia.dice_contener : charger();
    const peso = guia ? guia.peso : charger();
    const fecha = guia ? guia.fecha : charger();
    const documentoCliente = guia ? guia.identificacionD : charger();
    const celRem= guia ? guia.celularR : charger();
    const celDes= guia ? guia.telefonoD : charger();
    const costoEnvio= guia ? guia.valor : charger();
    const texto_tipo_envio= guia ? guia.type : charger();
    const destinopaga=guia ? "destPaga" : charger();
    

    return (
        <div id="visor" style={{margin: "10px"}}>  

            <table className="table table-responsive table-bordered w-100">
                <tbody>
                    <tr>
                        <td className="text-center">
                            <img src={logoHeka} alt="" width="40" height="40" />
                        </td>
                        
                        <td><small className="texto-small"><strong>hekaentrega.co</strong></small> </td>
                    
                        <td><small className="texto-small"><strong>RECIBE:</strong>  {remitente} </small> </td>
                    
                        <td><small className="texto-small"><strong>Fecha:</strong>  {fecha}</small> </td>
                    
                        <td><small className="texto-small"> <strong>Guia: </strong>{numeroGuia}</small></td>
                    
                        <td><small className="texto-small"><strong>Transportadora:</strong>   {transportadora} </small></td>
                    </tr>
                </tbody>
            </table>

            <p>
                <cite>
                    El usuario deja constancia expresa de que acepta y tiene conocimiento del contrato publicado en la pagina web hekaentrega.co 
                    ,como remitente declara que este envío no contiene dinero en efectivo, joyas, objetos o fines prohibidos por la ley, y exime a hekaentrega y la transportadora asignada de toda responsabilidad. 
                </cite>
            </p>

            <table className="table table-responsive table-bordered w-100">
                <tbody>
                    <tr>
                        <td>
                            <small className="texto-small"><strong>DATOS REMITENTE </strong></small> <br />
                            <small className="texto-small"><strong>Remitente: </strong>{documentoCliente}</small> <br />
                            
                            <small className="texto-small"><strong>Origen: </strong>{ciudadR}</small><br />
                            <small className="texto-small"><strong>Cel/Tel: </strong>{celRem}</small><br />
                        </td>
                        <td >
                            <small className="texto-small"><strong>DATOS DESTINO </strong></small> <br />
                            <small className="texto-small"><strong>Destinatario: </strong>{destinatario}</small> <br />
                        
                            <small className="texto-small"><strong>Destino: </strong>{ciudad}</small><br />
                            <small className="texto-small"><strong>Dirección: </strong>{direccion}</small> <br />
                            <small className="texto-small"><strong>Cel/Tel: </strong>{celDes}</small>
                        </td>
                        <td>
                            <h6>Firma quien recibe:</h6>
                            <div style={{borderTop: ".5px solid black", marginTop: "4em"}} className="w-75 mx-auto">
                                <p>CC/NIT:</p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        
                        <td>
                            <small className="texto-small"><strong>Escanear código Whatsapp </strong></small> <br />
                            <img src={qr} width="160" height="160" className="m-1" alt="" />
                        </td>

                        <td>
                            <small className="texto-small"><strong>Peso real:  </strong> {peso} kg</small> <br />
                            
                            <small className="texto-small"><strong>Contenido:  </strong>{contenido}</small> <br />
                            <small className="texto-small"><strong>Costo envío:  </strong>{costoEnvio}</small> <br />
                        </td>
                        <td>
                            <h3 className="text-center"><strong>Valor cobro a destino:</strong> </h3>
                            
                            <h5 className="text-center">
                                <strong>${guia ?
                                    new Intl.NumberFormat("US", {
                                        style: "currency",
                                        maximumSignificantDigits: 1,
                                        currency: "COP"
                                    }).format(guia.valor) : charger()}
                                </strong>
                            </h5>
                            
                        
                        </td>
                        
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Rotulo;