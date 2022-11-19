import React, { useState, useEffect } from "react";
import { obtenerSolicitudes } from "../../utils/api";
import { obtenerUsuario } from "../../utils/api";
import { editarSolicitud } from "../../utils/api";
import { editarUsuario } from "../../utils/api";
import ReactLoading from "react-loading";
import { useUser } from "../../context/userContext";
const Solicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const { userData } = useUser();
  //Añadir modal
  const [solicitud, setSolicitud] = useState([]);
  const [filterSolicitud, setFilterSolicitud] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loadingUserInformation, setLoadingUserInformation] = useState(false);

  useEffect(() => {
    setLoadingUserInformation(true);
    const fetchSolicitudes = async () => {
      await obtenerSolicitudes(
        (resp) => {
          console.log("solicitudes", resp.data);
          setSolicitudes(
            resp.data.filter(
              (solicitud) => solicitud.user_email === userData.email
            )
          );
          setFilterSolicitud(
            resp.data.filter(
              (solicitud) => solicitud.user_email === userData.email
            )
          );
          setLoadingUserInformation(false);
        },
        (err) => {
          console.log(err);
          setLoadingUserInformation(false);
        }
      );
    };
    fetchSolicitudes();
  }, []);

  //
  //Check listo for manage access to keys
  // State with list of all checked item

  //Obtener fecha
  const getDate = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString();
  };
  // useEffect(() => {
  //   setLoadingUserInformation(false);

  // }, [solicitudes]);

  const changeHandle = (e) => {
    console.log("las solicitudes son", solicitudes);
    setFilterSolicitud(
      solicitudes.filter(
        (usuario) =>
          usuario.user_name.toString().includes(e.target.value.toString()) ||
          usuario.user_email.toString().includes(e.target.value.toString())
      )
    );
  };

  return (
    <div class="bg-white p-8 rounded-md w-full">
      <div class=" flex items-center justify-between pb-6">
        <div>
          <h2 class="text-gray-600 font-semibold">Solicitudes</h2>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex bg-gray-50 items-center p-2 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              />
            </svg>
            <input
              class="bg-gray-50 outline-none  w-64 ml-1 block "
              type="text"
              name=""
              id=""
              onChange={changeHandle}
              placeholder="Buscar por nombre o correo"
            />
          </div>
        </div>
      </div>
      {showModal ? (
        <></>
      ) : (
        <div>
          <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            {loadingUserInformation ? (
              <div className="flex justify-center items-center">
                <ReactLoading
                  type="spin"
                  color="#219BF3"
                  height={200}
                  width={200}
                />
              </div>
            ) : (
              <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table class="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Nombre
                      </th>
                      <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Fecha
                      </th>
                      <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Tipo
                      </th>
                      <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Estado
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterSolicitud.map((solicitud) => {
                      return (
                        <tr>
                          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div class="flex items-center">
                              <div class="flex-shrink-0 w-10 h-10">
                                {solicitud.user_picture ? (
                                  <img
                                    class="w-full h-full rounded-full"
                                    src={solicitud.user_picture}
                                    alt=""
                                  />
                                ) : (
                                  <img
                                    class="w-full h-full rounded-full"
                                    src="https://thumbs.dreamstime.com/b/omita-al-avatar-placeholder-de-la-foto-imagen-del-perfil-125707135.jpg"
                                    alt="Avatar"
                                  />
                                )}
                              </div>
                              <div class="ml-3">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  {solicitud.user_name}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {getDate(solicitud.fecha)}
                            </p>
                          </td>
                          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {/* <EstadoUsuario user={solicitud} /> */}
                              {solicitud.tipo}
                            </p>
                          </td>
                          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {/* <RolesUsuario user={solicitud} /> */}
                              {solicitud.estado}
                            </p>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Keys = ({ keys }) => {
  return (
    <div className="inline-block">
      <ul>
        {keys.map((key) => {
          return <li className="inline-block">{key},</li>;
        })}
      </ul>
    </div>
  );
};
// const getKeys = ({ keyaccess, showModal }) => {
//   const [keys, setKeys] = useState([keyaccess]);

//   const [show, setShow] = useState(false);

//   useEffect(() => {
//     setShow(true);
//     console.log("llaves actuales", keys);
//   }, [keys]);

//   return (
//     <div>
//       <div>
//         {show ? (
//           <ul>
//             {keys[0].length >= 1 ? (
//               keys[0].map((key) => {
//                 return <li className="inline-block">{key},</li>;
//               })
//             ) : (
//               <li>añadir</li>
//             )}
//           </ul>
//         ) : (
//           <></>
//         )}
//       </div>
//     </div>
//   );
// };
export default Solicitudes;
