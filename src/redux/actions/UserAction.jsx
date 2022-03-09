import { dbAuth, dbFirestore } from "../../firebase";
import { types } from "../types/types";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { UserActionErrorMessages } from "../../helpers/UserActionErrorMessages";

export const loginUser = (user, navigate) => {
  return async (dispatch) => {
    try {
      const login = await signInWithEmailAndPassword(
        dbAuth,
        user.email,
        user.password
      );
      const docSnap = await getDoc(doc(dbFirestore, `oficinas/${login.user.uid}`));
      const data = docSnap.data();
      localStorage.setItem("isLoged", true);
      console.log("datos user", data);
      dispatch({
        type: types.loginUser,
        payload: {
          token: login.user.accessToken,
          id: login.user.uid,
          name: data.nombres,
          lastName: data.apellidos,
          numDocument: data.numero_documento,
          email: data.correo,
          password: data.password,
          phoneNumber: data.celular,
          typeDocument: data.tipo_documento,
          telephone: data.celular2,
          companyName: data.nombre_empresa,
          descriptionCompany: data.descripcion,
          city: data.ciudad,
          direction: data.direccion_completa,
          termsConditions: data.termsConditions,
        },
      });
      navigate("/");
    } catch (error) {
      UserActionErrorMessages("loginUser", error);
    }
  };
};

export const getUser = (id, token) => {
  return async (dispatch) => {
    try {
      const docSnap = await getDoc(doc(dbFirestore, `oficinas/${id}`));
      const data = docSnap.data();
      dispatch({
        type: types.getUser,
        payload: {
          token: token,
          id: id,
          name: data.nombres,
          lastName: data.apellidos,
          numDocument: data.numero_documento,
          email: data.correo,
          password: data.password,
          phoneNumber: data.celular,
          typeDocument: data.tipo_documento,
          telephone: data.celular2,
          companyName: data.nombre_empresa,
          descriptionCompany: data.descripcion,
          city: data.ciudad,
          direction: data.direccion_completa,
          termsConditions: data.termsConditions,
        },
      });
    } catch (error) {
      console.log(`Error en UserAction, metodo: getUser: ${error}`);
    }
  };
};

export const registerUser = (user, navigate) => {
  return async (dispatch) => {
    try {
      const register = await createUserWithEmailAndPassword(
        dbAuth,
        user.email,
        user.password
      );
      const data = {
        id: register.user.uid,
        name: user.name,
        lastName: user.lastName,
        numDocument: user.numDocument,
        email: user.email,
        password: user.password,
        phoneNumber: user.phoneNumber,
        typeDocument: user.typeDocument,
        telephone: user.telephone,
        companyName: user.companyName,
        descriptionCompany: user.descriptionCompany,
        city: user.city,
        direction: user.direction,
        termsConditions: user.termsConditions,
      };
      localStorage.setItem("isLoged", true);
      await setDoc(doc(dbFirestore, `oficinas/${register.user.uid}`), data);
      dispatch({
        type: types.registerUser,
        payload: {
          token: register.user.accessToken,
          id: register.user.uid,
          name: user.name,
          lastName: user.lastName,
          numDocument: user.numDocument,
          email: user.email,
          password: user.password,
          phoneNumber: user.phoneNumber,
          typeDocument: user.typeDocument,
          telephone: user.telephone,
          companyName: user.companyName,
          descriptionCompany: user.descriptionCompany,
          city: user.city,
          direction: user.direction,
          termsConditions: user.termsConditions,
        },
      });
      navigate("/");
    } catch (error) {
      UserActionErrorMessages("registerUser", error);
    }
  };
};

export const updateUser = (data) => {
  return async (dispatch, getState) => {
    try {
      const { id, token } = getState().user;
      const docRef = doc(dbFirestore, `oficinas/${id}`);
      await updateDoc(docRef, data);
      dispatch(getUser(id, token));
    } catch (error) {
      UserActionErrorMessages("updateUser", error);
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      localStorage.removeItem("isLoged");
      await signOut(dbAuth);
      dispatch({
        type: types.logoutUser,
      });
    } catch (error) {
      UserActionErrorMessages("logoutUser", error);
    }
  };
};