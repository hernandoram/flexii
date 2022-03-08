import React, { useState } from "react";
import { FaPlaneDeparture, FaAsterisk } from "react-icons/fa";
import { Button } from "react-bootstrap";
import "./login.css";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../../redux/actions/UserAction";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [estaRegistrandose, setEstaRegistrandose] = useState(false);
  const [data, setData] = useState({
    name: "",
    lastName: "",
    numDocument: "",
    email: "",
    password: "",
    phoneNumber: "",
    typeDocument: "CC",
    telephone: "",
    companyName: "",
    descriptionCompany: "",
    city: "",
    direction: "",
    termsConditions: "false",
  });

  const submitHandle = async (e) => {
    e.preventDefault();
    estaRegistrandose
      ? dispatch(registerUser(data, navigate))
      : (dispatch(loginUser(data, navigate)));
  };

  return (
    <div className="" style={{ minHeight: "100vh" }}>
      <div className="container py-4">
        <div className="card ms-3 text-center boxCard">
          <div className="card-header p-3">
            <FaPlaneDeparture className="icon-login" />
          </div>
          <div className="card-body">
            <form onSubmit={submitHandle} className="p-4">
              {estaRegistrandose && (
                <div className="row d-flex justify-content-between">
                  <div className="mb-3 col-12 col-md-6">
                    <label className="form-label">
                      Nombres{" "}
                      <FaAsterisk
                        style={{ fontSize: "10px", color: "#e94e4e" }}
                      />
                    </label>
                    <input
                      type="text"
                      required
                      value={data.name}
                      className="form-control"
                      placeholder="Nombre Completo"
                      onChange={(e) =>
                        setData({ ...data, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3 col-12 col-md-6">
                    <label className="form-label">
                      Apellidos{" "}
                      <FaAsterisk
                        style={{ fontSize: "10px", color: "#e94e4e" }}
                      />
                    </label>
                    <input
                      type="text"
                      required
                      value={data.lastName}
                      className="form-control"
                      placeholder="Apellidos"
                      onChange={(e) =>
                        setData({ ...data, lastName: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3 col-12 col-md-6">
                    <label className="form-label">
                      Tipo Documento{" "}
                      <FaAsterisk
                        style={{ fontSize: "10px", color: "#e94e4e" }}
                      />
                    </label>
                    <select
                      className="form-control"
                      onChange={(e) =>
                        setData({ ...data, typeDocument: e.target.value })
                      }
                    >
                      <option value="CC">CC</option>
                      <option value="PASAPORTE">PASAPORTE</option>
                      <option value="NIT (RUT)">NIT (RUT)</option>
                    </select>
                  </div>
                  <div className="mb-3 col-12 col-md-6">
                    <label className="form-label">
                      Numero de Documento{" "}
                      <FaAsterisk
                        style={{ fontSize: "10px", color: "#e94e4e" }}
                      />
                    </label>
                    <input
                      type="number"
                      required
                      value={data.numDocument}
                      className="form-control"
                      placeholder="Numero de Documento"
                      onChange={(e) =>
                        setData({ ...data, numDocument: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3 col-12 col-md-6">
                    <label className="form-label">Tipo de Empresa</label>
                    <input
                      type="text"
                      value={data.descriptionCompany}
                      className="form-control"
                      placeholder="Ejemplo: Industria textil"
                      onChange={(e) =>
                        setData({ ...data, descriptionCompany: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3 col-12 col-md-6">
                    <label className="form-label">
                      Nombre de la Empresa{" "}
                      <FaAsterisk
                        style={{ fontSize: "10px", color: "#e94e4e" }}
                      />
                    </label>
                    <input
                      type="text"
                      required
                      value={data.companyName}
                      className="form-control"
                      placeholder="Nombre de la Empresa o Razon social de la empresa"
                      onChange={(e) =>
                        setData({ ...data, companyName: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3 col-12 col-md-6">
                    <label className="form-label">
                      Ciudad{" "}
                      <FaAsterisk
                        style={{ fontSize: "10px", color: "#e94e4e" }}
                      />
                    </label>
                    <input
                      type="text"
                      value={data.city}
                      className="form-control"
                      placeholder="De que Ciudad eres"
                      onChange={(e) =>
                        setData({ ...data, city: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3 col-12 col-md-6">
                    <label className="form-label">
                      Direccion{" "}
                      <FaAsterisk
                        style={{ fontSize: "10px", color: "#e94e4e" }}
                      />
                    </label>
                    <input
                      type="text"
                      required
                      value={data.direction}
                      className="form-control"
                      placeholder="Direccoin del lugar"
                      onChange={(e) =>
                        setData({ ...data, direction: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3 col-12 col-md-6">
                    <label className="form-label">Telefono</label>
                    <input
                      type="number"
                      value={data.telephone}
                      className="form-control"
                      placeholder="Telefono Fijo"
                      onChange={(e) =>
                        setData({ ...data, telephone: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3 col-12 col-md-6">
                    <label className="form-label">
                      Celular{" "}
                      <FaAsterisk
                        style={{ fontSize: "10px", color: "#e94e4e" }}
                      />
                    </label>
                    <input
                      type="number"
                      required
                      value={data.phoneNumber}
                      className="form-control"
                      placeholder="Celular"
                      onChange={(e) =>
                        setData({ ...data, phoneNumber: e.target.value })
                      }
                    />
                  </div>
                </div>
              )}
              <div className="mb-3">
                <label className="form-label">
                  Correo{" "}
                  <FaAsterisk style={{ fontSize: "10px", color: "#e94e4e" }} />
                </label>
                <input
                  type="email"
                  required
                  value={data.email}
                  className="form-control"
                  placeholder="Correo"
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Clave{" "}
                  <FaAsterisk style={{ fontSize: "10px", color: "#e94e4e" }} />
                </label>
                <input
                  type="password"
                  required
                  value={data.password}
                  className="form-control"
                  placeholder="Password"
                  // minLength="6"
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
              </div>
              {estaRegistrandose && (
                <div className="mb-3 col-12 col-sm-8 col-md-6 d-flex justify-content-start">
                  <input
                    type="checkbox"
                    required
                    className="me-2"
                    style={{ maxWidth: "20px", marginTop: "5px" }}
                    onChange={(e) =>
                      setData({
                        ...data,
                        termsConditions: data.termsConditions = "verdadero",
                      })
                    }
                  />
                  <label className="form-label">
                    Acepta terminos y condiciones{" "}
                    <FaAsterisk
                      style={{ fontSize: "10px", color: "#e94e4e" }}
                    />
                  </label>
                </div>
              )}
              <div className="d-grid gap-">
                <Button variant="dark" type="submit" className="mb-2">
                  {estaRegistrandose ? "Registrate" : "Iniciar sesion"}
                </Button>
                <Button
                  variant="dark"
                  onClick={() => setEstaRegistrandose(!estaRegistrandose)}
                >
                  {estaRegistrandose
                    ? "¿Ya tienes cuenta? Inicia sesion"
                    : "¿No tienes Cuenta? Registrate"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
