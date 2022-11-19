import React, { useState, useEffect } from "react";
import { obtenerHistoricos } from "../../utils/api";
import { editarHistorico } from "../../utils/api";
import { editarUsuario } from "../../utils/api";
import { useUser } from "../../context/userContext";
import ReactLoading from "react-loading";
const Historico = () => {
  const [historicos, setHistoricos] = useState([]);
  const [historico, setHistorico] = useState();
  const [showModal, setShowModal] = useState(false);
  const [usuario, setUsuario] = useState();
  const { userData } = useUser();
  //Añadir loading
  const [loadingUserInformation, setLoadingUserInformation] = useState(false);
  const getDate = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    const fetchHistoricos = async () => {
      setLoadingUserInformation(true);
      await obtenerHistoricos(
        (resp) => {
          console.log("Historicos", resp.data);
          setHistoricos(
            resp.data.filter(
              (historico) => historico.user_email === userData.email
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
  return (
    <div>
      {showModal ? (
        <></>
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
                  class="bg-gray-50 outline-none ml-1 block "
                  type="text"
                  name=""
                  id=""
                  placeholder="Buscar..."
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
                      </tr>
                    </thead>
                    <tbody>
                      {historicos.map((historico) => {
                        return (
                          <tr>
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
