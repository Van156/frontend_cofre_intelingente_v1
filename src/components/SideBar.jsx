import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import PrivateComponent from "./PrivateComponent";
import { Link } from "react-router-dom";
import { useState } from "react";
const SideBar = () => {
  const { user, logout } = useAuth0();
  console.log("link to user picture", user.picture);
  const [selected, setSelected] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  //Definir selección
  const updateSelected = (option) => {
    console.log(option, "option");
    let activeSelected = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ];
    activeSelected[option] = true;
    setSelected(activeSelected);
  };
  const selectedStyle = (option) =>
    selected[option]
      ? "flex items-center px-4 py-2 text-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-gray-200"
      : "flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700";
  const cerrarSesion = () => {
    logout({ returnTo: "https://fierce-oasis-98176.herokuapp.com" });
    localStorage.setItem("token", null);
  };
  return (
    <div class="flex flex-col w-64 h-screen py-8 bg-white border-r dark:bg-gray-900 dark:border-gray-700 ">
      <div class="flex flex-col items-center mt-6 -mx-2">
        {user.picture ? (
          <img
            class="object-cover w-24 h-24 mx-2 rounded-full"
            src={user.picture}
            alt="avatar"
          />
        ) : (
          <img
            class="object-cover w-24 h-24 mx-2 rounded-full"
            src="https://thumbs.dreamstime.com/b/omita-al-avatar-placeholder-de-la-foto-imagen-del-perfil-125707135.jpg"
            alt="avatar"
          />
        )}

        <h4 class="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200 hover:underline">
          {user.name ? user.name : ""}
        </h4>
        <p class="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400 hover:underline">
          {user.email ? user.email : ""}
        </p>
      </div>

      <div class="flex flex-col justify-between flex-1 mt-6">
        <nav>
          <PrivateComponent roleList={["Empleado", "admin", "sin rol"]}>
            <Link
              className={selectedStyle(4)}
              onClick={() => updateSelected(4)}
              to={"/usuario"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-user"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>

              <span class="mx-4 font-medium">Perfil</span>
            </Link>
          </PrivateComponent>
          <PrivateComponent roleList={["admin"]}>
            <Link
              // class="flex items-center px-4 py-2 text-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-gray-200"
              className={selectedStyle(0)}
              onClick={() => updateSelected(0)}
              to={"/admin"}
            >
              <svg
                class="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <span class="mx-4 font-medium">Dashboard</span>
            </Link>
          </PrivateComponent>

          <PrivateComponent roleList={["admin"]}>
            <Link
              // class="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"
              className={selectedStyle(1)}
              to={"/admin/Usuarios"}
              onClick={() => updateSelected(1)}
            >
              <svg
                class="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <span class="mx-4 font-medium">Gestionar usuarios</span>
            </Link>
          </PrivateComponent>

          <PrivateComponent roleList={["admin"]}>
            <Link
              className={selectedStyle(2)}
              onClick={() => updateSelected(2)}
              to={"/admin/Solicitudes"}
            >
              <svg
                class="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 5V7M15 11V13M15 17V19M5 5C3.89543 5 3 5.89543 3 7V10C4.10457 10 5 10.8954 5 12C5 13.1046 4.10457 14 3 14V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V14C19.8954 14 19 13.1046 19 12C19 10.8954 19.8954 10 21 10V7C21 5.89543 20.1046 5 19 5H5Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <span class="mx-4 font-medium">Solicitudes</span>
            </Link>
          </PrivateComponent>

          <PrivateComponent roleList={["admin"]}>
            <Link
              className={selectedStyle(3)}
              onClick={() => updateSelected(3)}
              to={"/admin/historico"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-archive"
              >
                <polyline points="21 8 21 21 3 21 3 8"></polyline>
                <rect x="1" y="3" width="22" height="5"></rect>
                <line x1="10" y1="12" x2="14" y2="12"></line>
              </svg>

              <span class="mx-4 font-medium">Historico</span>
            </Link>
          </PrivateComponent>
          {/* Aqui estaba lo de perfil */}
          <PrivateComponent roleList={["Empleado"]}>
            <Link
              className={selectedStyle(5)}
              onClick={() => updateSelected(5)}
              to={"/usuario/solicitudes"}
            >
              <svg
                class="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 5V7M15 11V13M15 17V19M5 5C3.89543 5 3 5.89543 3 7V10C4.10457 10 5 10.8954 5 12C5 13.1046 4.10457 14 3 14V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V14C19.8954 14 19 13.1046 19 12C19 10.8954 19.8954 10 21 10V7C21 5.89543 20.1046 5 19 5H5Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <span class="mx-4 font-medium">Solicitudes</span>
            </Link>
          </PrivateComponent>
          <PrivateComponent roleList={["Empleado"]}>
            <Link
              className={selectedStyle(6)}
              onClick={() => updateSelected(6)}
              to={"/usuario/historial"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-archive"
              >
                <polyline points="21 8 21 21 3 21 3 8"></polyline>
                <rect x="1" y="3" width="22" height="5"></rect>
                <line x1="10" y1="12" x2="14" y2="12"></line>
              </svg>

              <span class="mx-4 font-medium">Historial</span>
            </Link>
          </PrivateComponent>
          <button
            class="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"
            onClick={() => {
              cerrarSesion();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-log-out"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>

            <span class="mx-4 font-medium">Cerrar Sesion</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
