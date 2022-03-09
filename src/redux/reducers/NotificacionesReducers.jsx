import { types } from "../types/types";

const initialState = {
  notificaciones: [],
  notificacion: {
    visible_user: "",
    visible_admin: "",
    visible_office: "",
    icon: [],
    user_id: "",
    office_id: "",
    mensaje: "",
    href: "",
    fecha: "",
    timeline: "",
    id_heka: ""
  },
};

export const notificacionesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.getNotificacion:
      return {
        ...state,
        visible_user: action.payload.visible_user,
        visible_admin: action.payload.visible_admin,
        visible_office: action.payload.visible_office,
        icon: action.payload.icon,
        user_id: action.payload.user_id,
        office_id: action.payload.office_id,
        mensaje: action.payload.mensaje,
        href: action.payload.href,
        fecha: action.payload.fecha,
        timeline: action.payload.timeline,
        id_heka: action.payload.id_heka 
      };
      case types.getAllNotificaciones:
        return{
          ...state,
          notificaciones: action.payload.notificaciones
        }
    default:
      return state;
  }
};