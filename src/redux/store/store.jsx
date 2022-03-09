import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { guiasReducer } from "../reducers/GuiasReducers";
import { notificacionesReducer } from "../reducers/NotificacionesReducers";
import { userReducer } from "../reducers/UserReducers";

//COMENTO ESTA SECCIÓN PARA NO MOSTRAR LAS VARIABLES DEL REDUX EN EL NAVEGADOR
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const reducers = combineReducers({
    user: userReducer,
    guias: guiasReducer,
    notificaciones: notificacionesReducer
});

export const store = createStore(
  reducers,
  // COMENTO ESTA SECCIÓN PARA NO MOSTRAR LAS VARIABLES DEL REDUX EN EL NAVEGADOR
  composeEnhancers(applyMiddleware(thunk))
//   applyMiddleware(thunk)
);
