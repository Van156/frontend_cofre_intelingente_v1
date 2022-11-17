import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./pages/admin/Admin";
import Historico from "./pages/admin/Historico";
import Usuarios from "./pages/admin/Usuarios";
import Solicitudes from "./pages/admin/Solicitudes";
import Estadisticas from "./pages/admin/Estadisticas";
import Perfil from "./pages/users/Perfil";
import SolicitudesUser from "./pages/users/Solicitudes";
import Home from "./pages/Home/Home";
import PublicLayout from "./layouts/PublicLayout";
import PrivateLayout from "./layouts/PrivateLayout";
import { useState } from "react";
import { UserContext } from "./context/userContext";
import { Auth0Provider } from "@auth0/auth0-react";
import PrivateRoute from "./components/PrivateRoute";
function App() {
  const [userData, setUserData] = useState({});
  return (
    <Auth0Provider
      domain="proyecto-final-electronica.us.auth0.com"
      clientId="ix6zap0dG5QN7YkmT0unSL0tZH7A8oPk"
      redirectUri="https://fierce-oasis-98176.herokuapp.com/admin"
      audience="api-cofre-inteligente-administracion-llaves"
    >
      <div className="">
        <UserContext.Provider value={{ userData, setUserData }}>
          <Router>
            <Routes>
              <Route
                path="/admin"
                element={
                  <PrivateLayout>
                    {" "}
                    <PrivateRoute roleList={["admin"]} children={<Admin />} />
                  </PrivateLayout>
                }
              />
              <Route
                path="/admin/estadisticas"
                element={
                  <PrivateLayout>
                    {" "}
                    <PrivateRoute
                      roleList={["admin"]}
                      children={<Estadisticas />}
                    />
                  </PrivateLayout>
                }
              />
              <Route
                path="/admin/historico"
                element={
                  <PrivateLayout>
                    {" "}
                    <PrivateRoute
                      roleList={["admin"]}
                      children={<Historico />}
                    />
                  </PrivateLayout>
                }
              />
              <Route
                path="/admin/solicitudes"
                element={
                  <PrivateLayout>
                    {" "}
                    <PrivateRoute
                      roleList={["admin"]}
                      children={<Solicitudes />}
                    />
                  </PrivateLayout>
                }
              />

              <Route
                path="/admin/Usuarios"
                element={
                  <PrivateLayout>
                    {" "}
                    <PrivateRoute
                      roleList={["admin"]}
                      children={<Usuarios />}
                    />
                  </PrivateLayout>
                }
              />
              <Route
                path="/usuario"
                element={
                  <PrivateLayout>
                    {" "}
                    <PrivateRoute
                      roleList={["Empleado", "sin rol"]}
                      children={<Perfil />}
                    />
                  </PrivateLayout>
                }
              />
              <Route
                path="/usuario/solicitudes"
                element={
                  <PrivateLayout>
                    {" "}
                    <PrivateRoute
                      roleList={["Empleado"]}
                      children={<SolicitudesUser />}
                    />
                  </PrivateLayout>
                }
              />

              <Route
                path={"/"}
                element={
                  <PublicLayout>
                    <Home />
                  </PublicLayout>
                }
              ></Route>
            </Routes>
          </Router>
        </UserContext.Provider>
      </div>
    </Auth0Provider>
  );
}

export default App;
