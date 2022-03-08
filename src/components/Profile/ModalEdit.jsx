import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { FaAsterisk } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateUser } from "../../redux/actions/UserAction";

const ModalEdit = ({ show, closeShow }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const initialState = {
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
  };

  const [data, setData] = useState(initialState);

  const action = (e) => {
    e.preventDefault()
    dispatch(updateUser(data))
  }

//   const validarFormato = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       const img = e.target.files[0];
//       if (!/\.(jpeg|jpg|png|JPG|gif|svg|PNG)$/i.test(img.name)) {
//         alert("El archivo a adjuntar no es un formato valido");
//         e.target.value = "";
//       }
//     }
//   };

  return (
    <Modal
      show={show}
      onHide={closeShow}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div style={{ background: "#ECF0F3" }}>
        <Modal.Header closeButton style={{ borderBottom: "none" }}>
          <Modal.Title className="mx-auto">
            Editar Informacion de usuario
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={action}>
            <div className="form-group mb-2">
              <label className="form-label">Nombre Completo <FaAsterisk className="mb-1" style={{ fontSize: "5px", color: "#e94e4e" }} /></label>
              <input
                type="text"
                required
                value={data.name}
                className="form-control "
                placeholder="Nombre"
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </div>
            <div className="form-group mb-2">
              <label className="form-label">Apellido Completo <FaAsterisk className="mb-1" style={{ fontSize: "5px", color: "#e94e4e" }} /></label>
              <input
                type="text"
                required
                value={data.lastName}
                className="form-control "
                placeholder="Apellido"
                onChange={(e) => setData({ ...data, lastName: e.target.value })}
              />
            </div>
            <div className="form-group mb-2">
              <label className="form-label">Tipo de Documento <FaAsterisk className="mb-1" style={{ fontSize: "5px", color: "#e94e4e" }} /></label>
              {data.typeDocument === "CC" && (
                <select
                  className="form-control"
                  onChange={(e) =>
                    setData({ ...data, typeDocument: e.target.value })
                  }
                >
                  <option value="CC" selected>
                    CC
                  </option>
                  <option value="PASAPORTE">PASAPORTE</option>
                  <option value="NIT (RUT)">NIT (RUT)</option>
                </select>
              )}
              {data.typeDocument === "PASAPORTE" && (
                <select
                  className="form-control"
                  onChange={(e) =>
                    setData({ ...data, typeDocument: e.target.value })
                  }
                >
                  <option value="CC">CC</option>
                  <option value="PASAPORTE" selected>
                    PASAPORTE
                  </option>
                  <option value="NIT (RUT)">NIT (RUT)</option>
                </select>
              )}
              {data.typeDocument === "NIT (RUT)" && (
                <select
                  className="form-control"
                  onChange={(e) =>
                    setData({ ...data, typeDocument: e.target.value })
                  }
                >
                  <option value="CC">CC</option>
                  <option value="PASAPORTE">PASAPORTE</option>
                  <option value="NIT (RUT)" selected>
                    NIT (RUT)
                  </option>
                </select>
              )}
            </div>
            <div className="form-group mb-2">
              <label className="form-label">Numero de Documento <FaAsterisk className="mb-1" style={{ fontSize: "5px", color: "#e94e4e" }} /></label>
              <input
                type="number"
                required
                value={data.numDocument}
                className="form-control "
                placeholder="Numero de Documento"
                onChange={(e) =>
                  setData({ ...data, numDocument: e.target.value })
                }
              />
            </div>
            <div className="form-group mb-2">
              <label className="form-label">Telefono fijo</label>
              <input
                type="number"
                required
                value={data.telephone}
                className="form-control "
                placeholder="Telefono fijo(oficina)"
                onChange={(e) =>
                  setData({ ...data, telephone: e.target.value })
                }
              />
            </div>
            <div className="form-group mb-2">
              <label className="form-label">Celular <FaAsterisk className="mb-1" style={{ fontSize: "5px", color: "#e94e4e" }} /></label>
              <input
                type="number"
                required
                value={data.phoneNumber}
                className="form-control "
                placeholder="Celular"
                onChange={(e) =>
                  setData({ ...data, phoneNumber: e.target.value })
                }
              />
            </div>
            <div className="form-group mb-2">
              <label className="form-label">Nombre Empresa <FaAsterisk className="mb-1" style={{ fontSize: "5px", color: "#e94e4e" }} /></label>
              <input
                type="text"
                required
                value={data.companyName}
                className="form-control "
                placeholder="Nombre Empresa"
                onChange={(e) =>
                  setData({ ...data, companyName: e.target.value })
                }
              />
            </div>
            <div className="form-group mb-2">
              <label className="form-label">Descripcion Empresa </label>
              <textarea
                placeholder="Descripcion/Enfoque"
                className="form-control "
                value={data.descriptionCompany}
                onChange={(e) =>
                  setData({ ...data, descriptionCompany: e.target.value })
                }
                cols="30"
                rows="5"
              ></textarea>
            </div>
            <div className="form-group mb-2">
              <label className="form-label">Ciudad <FaAsterisk className="mb-1" style={{ fontSize: "5px", color: "#e94e4e" }} /></label>
              <input
                type="text"
                required
                value={data.city}
                className="form-control "
                placeholder="Ciudad"
                onChange={(e) => setData({ ...data, city: e.target.value })}
              />
            </div>
            <div className="form-group mb-2">
              <label className="form-label">Direccion <FaAsterisk className="mb-1" style={{ fontSize: "5px", color: "#e94e4e" }} /></label>
              <input
                type="text"
                required
                value={data.direction}
                className="form-control "
                placeholder="Direccion"
                onChange={(e) =>
                  setData({ ...data, direction: e.target.value })
                }
              />
            </div>
            {/* <div className="form-group mb-2">
              <label className="form-label">Elige una Imagen</label>
              <input
                type="file"
                required
                onChange={(e) => validarFormato(e)}
                className="form-control"
              />
            </div> */}

            <div className="form-group mt-3 d-grid gap-2">
              <button type="submit" className="btn btn-dark btn-lg">
                Guardar
              </button>
              <button className="mt-1 btn btn-dark btn-lg" onClick={closeShow}>
                Cancelar
              </button>
            </div>
          </form>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default ModalEdit;
