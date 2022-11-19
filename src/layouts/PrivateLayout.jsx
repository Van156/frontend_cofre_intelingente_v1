import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "../context/userContext";
import ReactLoading from "react-loading";
import { obtenerDatosUsuario } from "../utils/api";
import SideBar from "../components/SideBar";
import { Navigate } from "react-router-dom";

const PrivateLayout = ({ children }) => {
  const {
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    getAccessTokenSilently,
    logout,
  } = useAuth0();
  const [loadingUserInformation, setLoadingUserInformation] = useState(false);
  const { setUserData } = useUser();

  useEffect(() => {
    const fetchAuth0Token = async () => {
      setLoadingUserInformation(true);
      const accessToken = await getAccessTokenSilently({
        audience: `api-cofre-inteligente-administracion-llaves`,
      });
      // 2. recibir token de auth0
      localStorage.setItem("token", accessToken);

      // 3. enviarle el token a el backend
      await obtenerDatosUsuario(
        (response) => {
          setUserData(response.data);
          setLoadingUserInformation(false);
        },
        (err) => {
          setLoadingUserInformation(false);
          logout({ returnTo: "http://localhost:3000" });
        }
      );
    };
    if (isAuthenticated) {
      fetchAuth0Token();
    }
  }, [isAuthenticated, getAccessTokenSilently, logout, setUserData]);

  if (isLoading || loadingUserInformation)
    return (
      <ReactLoading type="cylon" color="#abc123" height={667} width={375} />
    );

  if (!isAuthenticated) {
    // return loginWithRedirect();
  }

  return (
    <div className=" h-screen w-screen flex overflow-hidden ">
      <SideBar />
      <main className=" w-full h-full overflow-y-auto">{children}</main>
    </div>
  );
};

export default PrivateLayout;
