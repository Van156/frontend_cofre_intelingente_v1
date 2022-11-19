import React, { useState, useEffect } from "react";
import { obtenerHistoricos } from "../../utils/api";
import { editarHistorico } from "../../utils/api";
import { editarUsuario } from "../../utils/api";

import ReactLoading from "react-loading";
const Historico = () => {
  const [historicos, setHistoricos] = useState([]);
  const [filterHistoricos, setFilterHistoricos] = useState([]);
  const [historico, setHistorico] = useState();
  const [showModal, setShowModal] = useState(false);
  const [usuario, setUsuario] = useState();
  //Añadir loading
  const [loadingUserInformation, setLoadingUserInformation] = useState(false);
  const getDate = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString();
  };
  const closeModal = (option) => {
    setShowModal((currShowModal) => false);
    console.log("showModal close", showModal);
    if (option === 1) {
      const editHistorico = async (accion, accion_tomada) => {
        await editarHistorico(
          historico._id,
          { accion, accion_tomada },
          (res) => {},
          (err) => {
            console.error(err);
          }
        );
      };
      const editUsuario = async (faltas_leve) => {
        await editarUsuario(
          historico.user_id,
          { faltas_leve },
          (res) => {},
          (err) => {
            console.error(err);
          }
        );
      };
      editUsuario(historico.user_faltas_leve + 1);
      let accionTomada =
        "La falta fue considerada leve ahora el usuario tiene " +
        (historico.user_faltas_leve + 1) +
        " faltas leves";
      editHistorico("Realizada", accionTomada);
    } else if (option === 2) {
      const editUsuario = async (rol, estado) => {
        await editarUsuario(
          historico.user_id,
          { rol, estado },
          (res) => {},
          (err) => {
            console.error(err);
          }
        );
      };
      editUsuario("sin rol", "pendiente");
    }
  };
  // useEffect(() => {
  //   setLoadingUserInformation(false);
  // }, [historicos]);

  const openModal = (historico) => {
    setHistorico(historico);

    setShowModal((currShowModal) => true);
    console.log("showModal open", showModal);
  };

  useEffect(() => {
    const fetchHistoricos = async () => {
      setLoadingUserInformation(true);
      await obtenerHistoricos(
        (resp) => {
          console.log("Historicos", resp.data);
          setHistoricos(resp.data);
          setFilterHistoricos(resp.data);
          setLoadingUserInformation(false);
        },
        (err) => {
          console.log(err);
          setLoadingUserInformation(false);
        }
      );
    };
    fetchHistoricos();
  }, [showModal]);

  useEffect(() => {
    const fetchHistoricos = async () => {
      setLoadingUserInformation(true);
      await obtenerHistoricos(
        (resp) => {
          console.log("Historicos", resp.data);
          setHistoricos(resp.data);
          setFilterHistoricos(resp.data);
          setLoadingUserInformation(false);
        },
        (err) => {
          console.log(err);
          setLoadingUserInformation(false);
        }
      );
    };
    fetchHistoricos();
  }, []);

  const isRequired = (option) =>
    option === "Requerida"
      ? [
          "relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight",
          "absolute inset-0 bg-red-200 opacity-50 rounded-full",
        ]
      : [
          "relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight",
          "absolute inset-0 bg-green-200 opacity-50 rounded-full",
        ];
  const changeHandle = (e) => {
    console.log(historicos);
    if (["1", "2", "3", "4"].includes(e.target.value.toString())) {
      setFilterHistoricos(
        historicos.filter(
          (usuario) =>
            usuario.llaves_regresadas.includes(e.target.value.toString()) ||
            usuario.llaves_tomada.includes(e.target.value.toString())
        )
      );
    } else {
      setFilterHistoricos(historicos);
    }
  };

  return (
    <div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Historial de {historico.user_name}
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
                  <h1>Nombre: {historico.user_name}</h1>

                  <div className=" flex">
                    <h1 className="inline-block">Llaves con acceso: </h1>
                    {"  "}
                    <KeyData keys={historico.user_keyaccess} />
                  </div>
                  <h1>
                    Cantidad de faltas leves: {historico.user_faltas_leve}
                  </h1>
                  <h1>Fecha: {getDate(historico.fecha)}</h1>
                  <h1>
                    Hora: {historico.hora_inicio}-{historico.hora_fin}
                  </h1>

                  <div className="flex">
                    <h1 className="inline-block">Llaves regresadas: </h1>{" "}
                    <KeyData keys={historico.llaves_regresadas} />
                  </div>
                  <div className=" flex">
                    <h1 className="inline-block">Llaves tomadas: </h1>
                    {"  "}
                    <KeyData keys={historico.llaves_tomada} />
                  </div>
                  <h1>Accion: {historico.accion}</h1>
                  <h1>Descripción: {historico.descripcion}</h1>
                  <h1>Accion tomada: {historico.accion_tomada}</h1>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  {historico.accion === "Requerida" ? (
                    <>
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => closeModal(2)}
                      >
                        Restringir acceso
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => closeModal(1)}
                      >
                        Falta leve
                      </button>
                    </>
                  ) : (
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Cerrar
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : (
        <div class="bg-white p-8 rounded-md w-full">
          <div class=" flex items-center justify-between pb-6">
            <div>
              <h2 class="text-gray-600 font-semibold">Historial de uso</h2>
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
                  placeholder="Buscar por llave"
                />
              </div>
            </div>
          </div>
          {!loadingUserInformation ? (
            <div>
              <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
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
                          Hora
                        </th>
                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Llave regresada
                        </th>
                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Llave tomada
                        </th>
                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Accion
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterHistoricos.map((historico) => {
                        return (
                          <tr>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <div class="flex items-center">
                                <div class="flex-shrink-0 w-10 h-10">
                                  {historico.user_picture ? (
                                    <img
                                      class="w-full h-full rounded-full"
                                      src={historico.user_picture}
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
                                    {historico.user_name}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p class="text-gray-900 whitespace-no-wrap">
                                {getDate(historico.fecha)}
                              </p>
                            </td>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p class="text-gray-900 whitespace-no-wrap">
                                {historico.hora_inicio +
                                  "-" +
                                  historico.hora_fin}
                              </p>
                            </td>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p class="text-gray-900 whitespace-no-wrap">
                                <KeyData keys={historico.llaves_regresadas} />
                              </p>
                            </td>
                            <td
                              className="bg-green-500"
                              class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                            >
                              <p class="text-gray-900 whitespace-no-wrap">
                                <KeyData keys={historico.llaves_tomada} />
                              </p>
                            </td>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <div
                                // class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                                className={isRequired(historico.accion)[0]}
                                onClick={() => openModal(historico)}
                              >
                                <span
                                  aria-hidden
                                  // class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                  className={isRequired(historico.accion)[1]}
                                ></span>
                                {historico.accion}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <ReactLoading
                type="spin"
                color="#219BF3"
                height={200}
                width={200}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const KeyData = ({ keys }) => {
  if (keys.length < 1) {
    return (
      <div>
        <ul className="flex items-center justify-center">
          <li className="inline-block ">Sin llaves</li>
        </ul>
      </div>
    );
  }
  return (
    <div>
      <div>
        <ul className="flex items-center justify-center">
          {keys.map((key) => {
            return <li className="inline-block ">{key},</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default Historico;
