import { types } from "../types/types";
import { dbFirestore } from "../../firebase";
import {
  collection, getDocs, updateDoc, doc,
  setDoc, getDoc, where, query, collectionGroup,
  limit
} from "@firebase/firestore";
import { aceptarEliminar, addNotificacion } from "./NotificacionesAction";
import tipoActualizacionEstado from "../../helpers/tipoActualizacionEstado";
const random = (range, initial = 0) => {
  return Math.floor(Math.random() * range) + initial;
};

export const addGuia = (id_heka) => {
  return async () => {
    try {
      // const id_heka = 1;
      const tr = ["SERVIENTREGA", "INTERRAPIDISIMO", "TCC", "ENVIA"];

      const data = {
        "ciudadR": "CABRERA",
        "ciudadD": "CABRERA",
        "departamentoD": "CUNDINAMARCA",
        "departamentoR": "CUNDINAMARCA",
        "alto": "1",
        "ancho": "1",
        "largo": "1",
        "correoR": "usuarionuevo@gmail.com",
        "centro_de_costo": "SellerNuevo",
        "prueba": true,
        "debe": -15650,
        "detalles": {
            "peso_real": 3,
            "flete": 8250,
            "comision_heka": 2000,
            "comision_trasportadora": 3000,
            "peso_liquidar": 3,
            "peso_con_volumen": 0,
            "total": 15650,
            "recaudo": 50000,
            "seguro": 50000,
            "sobreflete_oficina": 2400
        },
        "oficina": true,
        "datos_oficina": {
            "id_oficina": "Yw0S25wPutV0qtvmKyGmXabpvGb2",
            "ciudad": "CALI(VALLE DEL CAUCA)",
            "barrio": "los bellos",
            "direccion": "Kra 23 #40-40",
            "celular": "3102584568",
            "numero_documento": "1234567989",
            "tipo_documento": "CC",
            "nombres": "NombreO",
            "apellidos": "ApellidoO",
            "correo": "correo@dominio.com",
            "nombre_completo": "NombreO ApellidoO"
        },
        "id_oficina": "Yw0S25wPutV0qtvmKyGmXabpvGb2",
        "peso": 3,
        "costo_envio": 15650,
        "valor": 50000,
        "seguro": 50000,
        "type": "PAGO CONTRAENTREGA",
        "dane_ciudadR": "25120000",
        "dane_ciudadD": "25120000",
        "transportadora": tr[random(3)],
        "nombreR": "USUARIO PRUEBA",
        "direccionR": "sd asd",
        "celularR": "123",
        "nombreD": "nombre",
        "identificacionD": "1234567989",
        "direccionD": "Kra 23 #40-40 los bellos ",
        "telefonoD": "1231231231",
        "celularD": "3102584568",
        "correoD": "correo@dominio.com",
        "tipo_doc_dest": "2",
        "dice_contener": "calzado",
        "observaciones": "",
        "recoleccion_esporadica": 0,
        "fecha": "2022-01-"+random(30,1),
        "timeline": new Date().getTime(),
        "id_user": "id_user",
        "seguimiento_finalizado": false,
        "id_heka": id_heka.toString(),
        "numeroGuia": "212" + random(1000000, 1000000),
        "id_archivoCargar": "29ybztS2lbcRLa+25qt/5w==",
        "has_sticker": true
      };
      await setDoc(doc(dbFirestore, `usuarios/id_user/guias/${id_heka}`), data);
      await addNotificacion(id_heka, {
        visible_user: false,
        visible_admin: false,
        visible_office: true,
        icon: ["exclamation", "danger"],
        user_id: "id_user",
        office_id: "Yw0S25wPutV0qtvmKyGmXabpvGb2",
        mensaje: "Mensaje a mostrar en la notificación",
        href: "id destino",
        fecha: data.fecha,
        timeline: new Date().getTime(),
        id_heka
      })();
      console.log("creada ", id_heka);
    } catch (error) {
      console.log(`ERROR en GuiasAction: addGuia ${error}`);
    }
  };
};

export const getAllGuias = () => {
  return async (dispatch, getState) => {
    try {
      let dataGuias = [];
      const {id} = getState().user;
      if(!id) return;
      
      const q = query(
        collection(dbFirestore, "oficinas", id, "guiasOficina"),
        where("visible", "==", true)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.data())
        dataGuias = dataGuias.concat(doc.data().guias);
      });
      dispatch({
        type: types.getAllGuias,
        payload: {
          guias: dataGuias,
        },
      });
    } catch (error) {
      console.log(`ERROR en GuiasAction: getAllGuias ${error}`);
    }
  };
};

export const getGuia = (id_user, guia) => {
  return async (dispatch) => {
    try {
      const dataGuia = await getDoc(doc(dbFirestore, `usuarios/${id_user}/guias/${guia}`));
      
      if (dataGuia.exists()) {
        dispatch({
          type: types.getGuia,
          payload: {
            debe: dataGuia.data().debe,
            celularD: dataGuia.data().celularD,
            nombreD: dataGuia.data().nombreD,
            timeline: dataGuia.data().timeline,
            identificacionD: dataGuia.data().identificacionD,
            valor: dataGuia.data().valor,
            transportadora: dataGuia.data().transportadora,
            departamentoD: dataGuia.data().departamentoD,
            tipo_doc_dest: dataGuia.data().tipo_doc_dest,
            detalles: {
              seguro: dataGuia.data().seguro,
              peso_con_volumen: dataGuia.data().peso_con_volumen,
              recaudo: dataGuia.data().recaudo,
              comision_trasportadora: dataGuia.data().comision_trasportadora,
              flete: dataGuia.data().flete,
              peso_liquidar: dataGuia.data().peso_liquidar,
              peso_real: dataGuia.data().peso_real,
              total: dataGuia.data().total,
              comision_heka: dataGuia.data().comision_heka,
            },
            peso: dataGuia.data().peso,
            dane_ciudadR: dataGuia.data().dane_ciudadR,
            ancho: dataGuia.data().ancho,
            recoleccion_esporadica: dataGuia.data().recoleccion_esporadica,
            correoD: dataGuia.data().correoD,
            departamentoR: dataGuia.data().departamentoR,
            id_user: dataGuia.data().id_user,
            telefonoD: dataGuia.data().telefonoD,
            direccionR: dataGuia.data().direccionR,
            estado: dataGuia.data().estado,
            direccionD: dataGuia.data().direccionD,
            costo_envio: dataGuia.data().costo_envio,
            ciudadD: dataGuia.data().ciudadD,
            ciudadR: dataGuia.data().ciudadR,
            correoR: dataGuia.data().correoR,
            numeroGuia: dataGuia.data().numeroGuia,
            nombreR: dataGuia.data().nombreR,
            seguro: dataGuia.data().seguro,
            celularR: dataGuia.data().celularR,
            dane_ciudadD: dataGuia.data().dane_ciudadD,
            id_archivoCargar: dataGuia.data().id_archivoCargar,
            has_sticker: dataGuia.data().has_sticker,
            observaciones: dataGuia.data().observaciones,
            ultima_actualizacion: {
              seconds: dataGuia.data().seconds,
              nanoseconds: dataGuia.data().nanoseconds,
            },
            dice_contener: dataGuia.data().dice_contener,
            fecha: dataGuia.data().fecha,
            alto: dataGuia.data().alto,
            centro_de_costo: dataGuia.data().centro_de_costo,
            seguimiento_finalizado: dataGuia.data().seguimiento_finalizado,
            largo: dataGuia.data().largo,
            type: dataGuia.data().type,
            id_heka: dataGuia.data().id_heka,
          },
        });
        console.log("idguia ", guia);
        console.log("firebase", dataGuia.data());
        return dataGuia.data();
      } else {
        console.log("La Guia no fue encontrada");
      }
    } catch (error) {
      console.log(`ERROR en GuiasAction: getAllGuias ${error}`);
    }
  };
};

export const guiasHistorial = (guia, id_notification) => {
  const acceptedObject = {};
  const acceptedValues = ["numeroGuia", "transportadora", "id_user", "id_heka", "fecha"];
  acceptedValues.forEach(d => acceptedObject[d] = guia[d]);
  if(guia.recibidoEnPunto) {
    acceptedObject.recibidoEnPunto = guia.recibidoEnPunto;
    acceptedObject.estado = guia.estado;
  }

  return async (dispatch, getState) => {
    try {
      const { id } = getState().user;
      const dataGuias = {
        guias: [],
        ids_heka: [],
        numeroGuias: [],
        id_oficina: id,
        fechaCreacion: new Date(),
        ultimaActualizacion: new Date(),
        finalizado: false,
        visible: true,
      };

      const verificar = await buscarPorIdHeka(id, acceptedObject.id_heka);
      if(id_notification && verificar) 
        return dispatch(aceptarEliminar(id_notification));
      
      const numGuia = await getDoc(
        doc(dbFirestore, `/oficinas/${id}/guiasOficina/numGuias`)
      );

      let numDoc = numGuia.exists() ? numGuia.data().num : 0;

      // el nombreDoc sera el nodo al que se enviará {tosend}
      let nombreDoc, toSend;

      //Definimos la máxima cantidad de guía permitida por documento
      const maxPermitidas = 250;

      if (numDoc >= 1) {
        nombreDoc = "doc_" + numDoc;
        const document = await getDoc(doc(dbFirestore, `/oficinas/${id}/guiasOficina/${nombreDoc}`));

        if(!document.exists) throw new Error("Aparentemente no existe este documento");
        const addGuia = document.data();
        console.log(addGuia);

        const next = addGuia.finalizado;

        //Para indicar si ya el paquete consultado está full
        if (next) {
          numDoc++;
          nombreDoc = "doc_" + numDoc;
          await setDoc(doc(dbFirestore, `/oficinas/${id}/guiasOficina/numGuias`), {
            num: numDoc,
          });
          toSend = await newDoc(numDoc, nombreDoc)
        } else {
          acceptedObject.parent_id = nombreDoc;
          addGuia.guias.push(acceptedObject);
          toSend = addGuia;
        }
        
      } else {
        nombreDoc = "doc_1";
        toSend = await newDoc(1, nombreDoc);
      }

      async function newDoc(num, nombreDoc) {
        acceptedObject.parent_id = nombreDoc;
        dataGuias.guias.push(acceptedObject);
        await setDoc(doc(dbFirestore, `/oficinas/${id}/guiasOficina/numGuias`), {
          num,
        });

        return dataGuias;
      }

      if(toSend.guias.length >= maxPermitidas) {
        toSend.finalizado = true;
      }

      const guias = toSend.guias;
      toSend.ids_heka = guias.map(guia => guia.id_heka);
      toSend.numeroGuias = guias.map(guia => guia.numeroGuia);
      await setDoc(doc(dbFirestore, `/oficinas/${id}/guiasOficina/${nombreDoc}`), toSend);
      if(id_notification) dispatch(aceptarEliminar(id_notification));
    } catch (error) {
      console.log(`ERROR en GuiasAction: guiasHistorial ${error}`);
    }
  };
};

export const actualizarGuia = (replacer, id_heka, id_doc, replace) => {
  return async (dispatch, getState) => {
    try {
      const id_office = getState().user.id;
      const docRef = doc(dbFirestore, "oficinas", id_office, "guiasOficina", id_doc);
      const documento = await getDoc(docRef);

      if(!documento.exists()) throw new Error("No exite el documento solicitado");

      const guias = documento.data().guias;
      const index = guias.findIndex(g => g.id_heka === id_heka); 

      if(index === -1) throw new Error("La guía ingresada no exite en dicho documento");

      if(replace) {
        guias[index] = replacer;
      } else {
        for (let campo in replacer) {
          guias[index][campo] = replacer[campo];
        }
      }
      const ultimaActualizacion = new Date();

      await updateDoc(docRef, {guias, ultimaActualizacion});
      dispatch(getAllGuias());
    } catch (e) {
      console.error("Error al actualizar guia del documento " + id_doc + ". Error: " + e.message);
    }

  }
}

// función que consulta los números de guía en los usuarios de heka
export const findGuiaExterna = async (numGuia) => {
  const argsWhere = [
    ["id_heka", "==", numGuia], 
    ["numeroGuia", "==", numGuia]
  ];

  let guiaEncontrada;
  // itero entre los argumentos que van en el where hasta conseguir un documento que coincida
  for await(let args of argsWhere) {
    const docRef = query(
      collectionGroup(dbFirestore, "guias"), 
      limit(1),
      where(...args),
      // where("oficina", "==", true)
    );

    const q = await getDocs(docRef);
    
    // Si detectamos un query efectivo (la mayor catidad debe ser 1)
    // llenamos guiaEncontrada y detenemos el bucle
    if(q.size) {
      q.forEach(doc => guiaEncontrada = doc);
      break;
    }
  }

  // debería devolver la guía que se haya encontrado en caso de que exista
  return guiaEncontrada;

}

/*funcion que recibe como parámetro el id_oficina y id_heka. 
 Devuelve el documento que contiene la guía de la oficina 
 o indefinido en caso de inexistencia. */
const buscarPorIdHeka = async (id, id_guia) => {
  const coll = collection(dbFirestore, "oficinas", id, "guiasOficina")
  const q = query(coll, where("ids_heka", "array-contains", id_guia))
  const querySnapshot = await getDocs(q);

  let respuesta;
  console.log(querySnapshot.size);
  querySnapshot.forEach(doc => respuesta = doc);

  return respuesta;
}

/* 
  numGuia: Guía que se va a consultar (id_heka, numGuia transportadora),
  office_id: el identificador de la oficina al que se va a realizar las consultas
*/
export const recibirGuia = async (numGuia, office_id) => {
  try {
    //argumentos de filtrados que utilizaré en el where de firebase
    const guiaEncontrada = await findGuiaExterna(numGuia);

    //primero buscaremos si la guía efectivamente existe
    if(!guiaEncontrada) {
      // Si no exite, devolvemos un mensaje de error
      return {
        type: "error",
        swal: {
          icon: "error",
          text: "Guia no encontrada."
        }
      };
    }

    const id_heka = guiaEncontrada.id;

    // Luego buscamos si el punto ya tiene guardada la guía
    const guardada = await buscarPorIdHeka(office_id, id_heka);
    const guia = guiaEncontrada.data();
    const actualizar = tipoActualizacionEstado.recibir;
    guia.recibidoEnPunto = actualizar.recibidoEnPunto;
    
    let respuesta;
    if(guardada) {
      // si la guía ya fue guardada previo a una notificacion
      // se envía un objeto para actualizarla      
      const ids = guardada.data().guias;
      
      if(ids && ids.some(g => g.recibidoEnPunto && g.id_heka === id_heka)) {
        // Si ya la guía está registrada y recibida correctamente, se envía un mensaje notificando el caso
        respuesta = {
          type: "error",
          success: false, 
          swal: {
            icon: "warning",
            title: "La guía ya ha sido recibida correctamente.",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
          }
        };
      } else {
        const id_doc = guardada.id;
        respuesta = {
          type: "guardada", actualizar, guia, id_heka, id_doc,
          success: true,
        };
      }
    } else if(guiaEncontrada.data().id_oficina === office_id) {
      // sino, se envía uno para registrarla, siempre que se verifique que la oficina es la misma
      respuesta = {
        type: "no guardada", guia,
        success: true
      };
    } else {
      // Si llega a esta condición es porque la guía no pertenece a la oficina, y por ende no está registrada
      respuesta = {
        type: "no pertenece", guia,
        success: true, 
        swal: {
          icon: "warning",
          text: "Esta guía inicialmente no fue destinada para recibir en esta oficina, ¿estás seguro que deseas recibirla?",
          showCloseButton: true,
          showCancelButton: true,
          confirmButtonText: "Si, Recibir.",
          cancelButtonText: "No, cancelar."
        }
      };
    }

    return respuesta;
  } catch (error) {
    console.log(`ERROR en GuiasAction: recibirGuia ${error}`);
  }
};

export const actualizaEstadoGuiaUsuario = (id_heka, user_id, actualizar) => {
  const docRef = doc(dbFirestore, "usuarios", user_id, "guias", id_heka);

  updateDoc(docRef, actualizar);
}
