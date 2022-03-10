import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import RecibirPaquete from "./components/RecibirPaquetes/Recibir";
// import Pagos from "./components/Pagos/Pagos";
import Guias from "./components/Guias/Guias";
import Login from "./components/Login/Login";
import { useDispatch } from "react-redux";
import { getUser } from "./redux/actions/UserAction";
import Sidebar from "./components/Sidebar/Sidebar";
import Profile from "./components/Profile/Profile";
import { onAuthStateChanged } from "@firebase/auth";
import { dbAuth } from "./firebase";
// import Progreso from "./components/ProgresoPunto/Progreso";
// import Devoluciones from "./components/Devoluciones/Devoluciones";
import Notificaciones from "./components/Notificaciones/Notificaciones";
import Rotulo from "./components/PDFs/rotulos";

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
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route
          path="/"
          exact
          element={
            <Private>
              {" "}
              <Progreso />{" "}
            </Private>
          }
        /> */}
        <Route
          path="/historial"
          element={
            <Private>
              <Guias />
            </Private>
          }
        />
        {/* <Route
          path="/devoluciones"
          element={
            <Private>
              <Devoluciones />
            </Private>
          }
        /> */}
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
        {/* <Route
          path="/pagos"
          element={
            <Private>
              <Pagos />
            </Private>
          }
        /> */}
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
