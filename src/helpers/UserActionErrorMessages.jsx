import Swal from "sweetalert2";
export const UserActionErrorMessages = (metodo, error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  let title = "";
  let message = "";
  switch (errorCode) {
    case "auth/user-not-found":
      title = "Usuario no encontrado";
      message = "Debes verificar el correo.";
      break;
    case "auth/wrong-password":
      title = "Contraseña Incorrecta";
      message = "Debes verificar tu contraseña.";
      break;
    case "auth/too-many-requests":
      title = "Cuenta desactivada temporal mente";
      message =
        "El acceso a esta cuenta se ha desactivado temporalmente debido a muchos intentos fallidos de inicio de sesión. Puede restaurarlo inmediatamente ingresando la contraseña correcta o puede intentarlo de nuevo más tarde.";
      break;
    case "auth/email-already-in-use":
      title = "Cuenta en uso";
      message =
        "Actualmente Existe un usuario con esta direccion de correo, por favor usa otra direccion de correo.";
      break;
      case "auth/weak-password":
        title = "Contraseña debil";
        message =
          "Tu contraseña es muy debil, por favor asegurate de que tenga 6 o mas caracteres.";
        break;
    default: 
      title = errorCode;
      message = errorMessage;
      break;
  }
  Swal.fire({
    icon: "error",
    title: title,
    text: message,
  });
  console.log(`Error en UserAction, metodo: ${metodo}: ${error}`);
};
