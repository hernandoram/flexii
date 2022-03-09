import { types } from "../types/types";

const initialState = {
  token: "",
  id: "",
  name: "",
  lastName: "",
  numDocument: "",
  email: "",
  password: "",
  phoneNumber: "",
  typeDocument: "",
  telephone: "",
  companyName: "",
  descriptionCompany: "",
  city: "",
  direction:"",
  termsConditions: "false",
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.registerUser:
      return {
        ...state,
        token: action.payload.token,
        id: action.payload.id,
        name: action.payload.name,
        lastName: action.payload.lastName,
        numDocument: action.payload.numDocument,
        email: action.payload.email,
        password: action.payload.password,
        phoneNumber: action.payload.phoneNumber,
        typeDocument: action.payload.typeDocument,
        telephone: action.payload.telephone,
        companyName: action.payload.companyName,
        descriptionCompany: action.payload.descriptionCompany,
        city: action.payload.city,
        direction: action.payload.direction,
        termsConditions: action.payload.termsConditions,
      };
    case types.loginUser:
      return { 
        ...state,
        token: action.payload.token,
        id: action.payload.id,
        name: action.payload.name,
        lastName: action.payload.lastName,
        numDocument: action.payload.numDocument,
        email: action.payload.email,
        password: action.payload.password,
        phoneNumber: action.payload.phoneNumber,
        typeDocument: action.payload.typeDocument,
        telephone: action.payload.telephone,
        companyName: action.payload.companyName,
        descriptionCompany: action.payload.descriptionCompany,
        city: action.payload.city,
        direction: action.payload.direction,
        termsConditions: action.payload.termsConditions,
      };
    case types.getUser:
      return { 
        ...state,
        token: action.payload.token,
        id: action.payload.id,
        name: action.payload.name,
        lastName: action.payload.lastName,
        numDocument: action.payload.numDocument,
        email: action.payload.email,
        password: action.payload.password,
        phoneNumber: action.payload.phoneNumber,
        typeDocument: action.payload.typeDocument,
        telephone: action.payload.telephone,
        companyName: action.payload.companyName,
        descriptionCompany: action.payload.descriptionCompany,
        city: action.payload.city,
        direction: action.payload.direction,
        termsConditions: action.payload.termsConditions,
      };
    case types.logoutUser:
      return {
        ...state,
        token: "",
        id: "",
        name: "",
        lastName: "",
        numDocument: "",
        email: "",
        password: "",
        phoneNumber: "",
        typeDocument: "",
        telephone: "",
        companyName: "",
        descriptionCompany: "",
        city: "",
        direction: "",
        termsConditions: "false",
      };
    default: 
      return state;
  }
};
