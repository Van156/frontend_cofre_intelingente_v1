import React, { useState, useEffect } from "react";
import { obtenerSolicitudes } from "../../utils/api";
import { obtenerUsuario } from "../../utils/api";
import { editarSolicitud } from "../../utils/api";
import { editarUsuario } from "../../utils/api";
import ReactLoading from "react-loading";
const Solicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);

  //Añadir modal
  const [solicitud, setSolicitud] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loadingUserInformation, setLoadingUserInformation] = useState(false);

  const closeModal = (option) => {
    setShowModal((currShowModal) => false);
    console.log("showModal close ahora ", showModal);
    const editSolicitud = async (estado) => {
      console.log("Fue llamada solicitud");
      await editarSolicitud(
        solicitud._id,
        { estado },
        (res) => {},
        (err) => {
          console.error(err);
        }
      );
    };
    if (option === 1) {
      editSolicitud("Aprobada");
      console.log("Entro en option 1");
      if (solicitud.tipo === "Cambiar contraseña") {
        const editUsuario = async (password) => {
          await editarUsuario(
            solicitud.user_id,
            { password },
            (res) => {},
            (err) => {}
          );
        };
        editUsuario(solicitud.new_password);
      } else {
        const getUsuario = async () => {
          const editUsuario = async (keyaccess) => {
            await editarUsuario(
              solicitud.user_id,
              { keyaccess },
              (res) => {},
              (err) => {}
            );
          };

          await obtenerUsuario(
            solicitud.user_id,
            (res) => {
              console.log("data usuario", res.data);
              // setUsuario(res.data);
              const keyaccess = [
                ...new Set([
                  ...res.data.keyaccess,
                  ...solicitud.llaves_pedidas,
                ]),
              ];
              editUsuario(keyaccess);
            },
            (err) => {
              console.log("error", err);
            }
          );
        };
        getUsuario();
      }
    } else {
      editSolicitud("Denegada");
      console.log("Entro en option denegada");
    }

    const fetchSolicitudes = async () => {
      setLoadingUserInformation(true);
      await obtenerSolicitudes(
        (resp) => {
          setSolicitudes(resp.data);
          setLoadingUserInformation(false);
        },
        (err) => {
          console.log(err);
          setLoadingUserInformation(false);
        }
      );
    };
    fetchSolicitudes();
  };
  // useEffect(() => {
  //   setLoadingUserInformation(false);
  // }, [solicitud]);

  const openModal = (solicitud) => {
    setSolicitud(solicitud);

    setShowModal((currShowModal) => true);
    console.log("showModal open", showModal);
  };

  useEffect(() => {
    setLoadingUserInformation(true);
    const fetchSolicitudes = async () => {
      await obtenerSolicitudes(
        (resp) => {
          console.log("solicitudes", resp.data);
          setSolicitudes(resp.data);
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
              class="bg-gray-50 outline-none ml-1 block "
              type="text"
              name=""
              id=""
              placeholder="Buscar..."
            />
          </div>
        </div>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Solicitud de {solicitud.user_name}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}

                <div className="relative p-6 flex-auto">
                  <h3 className="text-xl font-semibold">
                    Nombre:{solicitud.user_name}
                  </h3>
                  <h3 className="text-xl font-semibold">
                    Fecha:{getDate(solicitud.fecha)}
                  </h3>
                  <h3 className="text-xl font-semibold">
                    Tipo:{solicitud.tipo}
                  </h3>

                  {solicitud.tipo === "Cambiar contraseña" ? (
                    <></>
                  ) : (
                    <h3 className="text-xl font-semibold">
                      Llave solicitada:
                      <Keys keys={solicitud.llaves_pedidas} />
                    </h3>
                  )}
                  <h3 className="text-xl   font-semibold">
                    estado:
                    {solicitud.estado}
                  </h3>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  {solicitud.estado === "Sin gestionar" ? (
                    <>
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => closeModal(2)}
                      >
                        Denegar
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => closeModal(1)}
                      >
                        Aprobar
                      </button>
                    </>
                  ) : (
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      cerrar
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
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
                      <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Gestionar
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {solicitudes.map((solicitud) => {
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
                          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm flex justify-center">
                            <button
                              type="button"
                              class="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
                              onClick={() => openModal(solicitud)}
                            >
                              <svg
                                width="13"
                                height="13"
                                viewBox="0 0 17 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M0 8.71423C0 8.47852 0.094421 8.25246 0.262491 8.08578C0.430562 7.91911 0.658514 7.82547 0.896201 7.82547H13.9388L8.29808 2.23337C8.12979 2.06648 8.03525 1.84013 8.03525 1.60412C8.03525 1.36811 8.12979 1.14176 8.29808 0.974875C8.46636 0.807989 8.6946 0.714233 8.93259 0.714233C9.17057 0.714233 9.39882 0.807989 9.5671 0.974875L16.7367 8.08499C16.8202 8.16755 16.8864 8.26562 16.9316 8.3736C16.9767 8.48158 17 8.59733 17 8.71423C17 8.83114 16.9767 8.94689 16.9316 9.05487C16.8864 9.16284 16.8202 9.26092 16.7367 9.34348L9.5671 16.4536C9.39882 16.6205 9.17057 16.7142 8.93259 16.7142C8.6946 16.7142 8.46636 16.6205 8.29808 16.4536C8.12979 16.2867 8.03525 16.0604 8.03525 15.8243C8.03525 15.5883 8.12979 15.362 8.29808 15.1951L13.9388 9.603H0.896201C0.658514 9.603 0.430562 9.50936 0.262491 9.34268C0.094421 9.17601 0 8.94995 0 8.71423Z"
                                  fill="white"
                                />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                  <span class="text-xs xs:text-sm text-gray-900">
                    Showing 1 to 4 of 50 Entries
                  </span>
                  <div class="inline-flex mt-2 xs:mt-0">
                    <button class="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                      Prev
                    </button>
                    &nbsp; &nbsp;
                    <button class="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                      Next
                    </button>
                  </div>
                </div>
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
