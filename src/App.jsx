import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import RecibirPaquete from "./components/RecibirPaquetes/Recibir";
import Guias from "./components/Guias/Guias";
import Login from "./components/Login/Login";
import { useDispatch } from "react-redux";
import { getUser } from "./redux/actions/UserAction";
import Sidebar from "./components/Sidebar/Sidebar";
import Profile from "./components/Profile/Profile";
import { onAuthStateChanged } from "@firebase/auth";
import { dbAuth } from "./firebase";
import Notificaciones from "./components/Notificaciones/Notificaciones";
import Rotulo from "./components/PDFs/rotulos";
import ActivarCuenta from "./modals/activarCuenta/ActivarCuenta";

function App() {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.user);
  const isLoged = localStorage.getItem("isLoged");

  onAuthStateChanged(dbAuth, (user) => {
    if (user) {
      id === "" && dispatch(getUser(user.uid, user.accessToken));
    }
  });

  const Private = ({ children }) => {
    return isLoged && isLoged !== null ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      {isLoged && isLoged !== null ? <Sidebar /> : null}
      {isLoged ? <ActivarCuenta /> : null}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/historial"
          element={
            <Private>
              <Guias />
            </Private>
          }
        />
        <Route
          path="/"
          element={
            <Private>
              <Notificaciones/>
            </Private>
          }
        />
        <Route
          path="/recepciones"
          element={
            <Private>
              <RecibirPaquete />
            </Private>
          }
        />
        <Route
          path="/profile"
          element={
            <Private>
              <Profile />
            </Private>
          }
        />

        <Route 
          path="/rotulo/:user_id/:id_heka"
          element={
            <Private>
              <Rotulo />
            </Private>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
