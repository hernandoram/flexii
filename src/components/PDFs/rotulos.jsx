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
    var transportadora = guia ? guia.transportadora : charger();
    var numeroGuia = guia ? guia.numeroGuia : charger();
    var remitente = guia ? guia.nombreR : charger();
    var destinatario = guia ? guia.nombreD : charger();
    var direccion = guia ? guia.direccionD : charger();
    var ciudad = guia ? guia.ciudadD : charger();
    var ciudadR = guia ? guia.ciudadR : charger();
    var contenido = guia ? guia.dice_contener : charger();
    var peso = guia ? guia.peso : charger();
    var fecha = guia ? guia.fecha : charger();
    var documentoCliente = guia ? guia.identificacionD : charger();
    var celRem= guia ? guia.celularR : charger();
    var celDes= guia ? guia.telefonoD : charger();
    var costoEnvio= guia ? guia.valor : charger();
    var texto_tipo_envio= guia ? guia.type : charger();
    var destinopaga=guia ? "destPaga" : charger();
    var remitentepaga=guia ? "RemPaga" : charger();
    

    return (
        <div id="visor" style={{margin: "10px"}}>
            <table className="table-responsive">
                <tbody>
                    <tr>
                        <td>                        
                            <img src={logoHeka} alt="" width="100" height="100" />
                            
                            <h5 className="text-dark">{transportadora} - GUIA:  <strong  >{numeroGuia}</strong></h5>
                            
                            <h5 className="text-dark ">Remitente: <strong>hekaentrega.co - {remitente}</strong></h5>
                            
                            
                            <h5 className="text-dark "> Destinatario: <strong> {destinatario}</strong></h5>
                            <h5 className="text-dark ">Dirección: <strong> {direccion}  </strong>                            </h5>
                            <h5 className="text-dark ">Ciudad:  <strong> {ciudad} </strong>                           </h5>
                            <h5 className="text-dark ">Contenido: <strong> {contenido}  </strong>                                 </h5>
                            <h5 className="text-dark ">Peso:    <strong> {peso} kg   </strong>                                           </h5>
                        </td>
                    </tr>
                    
                </tbody>    
            </table> 

            <p>
                <small>
                    <cite>
                        HEKA ENTREGA NIT 1072497419-8 Cel: +57 321 336 19 11  SILVANIA(CUNDINAMARCA) - No somos transportadora, somos una plataforma conectada tecnológicamente con aliados logísticos
                        que permiten el envío de paquetes e-commerce u otro tipo de mercancía.
                    </cite>
                </small>
            </p>  

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
                        <td colSpan={2}>
                            <small className="texto-small"><strong>DATOS DESTINO </strong></small> <br />
                            <small className="texto-small"><strong>Destinatario: </strong>{destinatario}</small> <br />
                        
                            <small className="texto-small"><strong>Destino: </strong>{ciudad}</small><br />
                            <small className="texto-small"><strong>Dirección: </strong>{direccion}</small> <br />
                            <small className="texto-small"><strong>Cel/Tel: </strong>{celDes}</small>
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
                            <h3 className="text-center"><strong>ENVÍO {texto_tipo_envio}</strong> </h3>
                            
                            <hr className="sidebar-divider"></hr>
                            <small className="text-center texto-small2"><strong>ORIGEN PAGA: </strong>${remitentepaga}</small><br />
                            
                            <hr className="sidebar-divider"></hr>
                            <small className="text-center texto-small2"><strong>DESTINO PAGA: </strong>${destinopaga}</small>
                        
                        </td>
                        
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Rotulo;