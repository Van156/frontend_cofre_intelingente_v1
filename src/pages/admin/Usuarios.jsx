import React, { useState, useEffect } from "react";
import { obtenerUsuarios } from "../../utils/api";
import { editarUsuario } from "../../utils/api";

import ReactLoading from "react-loading";
const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [usuario, setUsuario] = useState();
  //Añadir loading
  const [loadingUserInformation, setLoadingUserInformation] = useState(false);
  const [filterUser, setFilterUser] = useState([]);
  const closeModal = (option) => {
    setShowModal((currShowModal) => false);

    if (option === 1) {
      const editUsuario = async (keyaccess) => {
        await editarUsuario(
          usuario._id,
          { keyaccess },
          (res) => {},
          (err) => {
            console.error(err);
          }
        );
      };
      if (usuario.keyaccess !== checked) {
        editUsuario(checked);
      }
    }
  };

  const openModal = (user) => {
    setUsuario(user);

    setChecked(user.keyaccess);

    setShowModal((currShowModal) => true);
  };

  useEffect(() => {
    const fetchUsuarios = async () => {
      setLoadingUserInformation(true);
      await obtenerUsuarios(
        (resp) => {
          setUsuarios(
            resp.data.filter(
              (usuario) => usuario.email !== "elapoamaya@gmail.com"
            )
          );
          setFilterUser(
            resp.data.filter(
              (usuario) => usuario.email !== "elapoamaya@gmail.com"
            )
          );

          setLoadingUserInformation(false);
        },
        (err) => {
          setLoadingUserInformation(false);
        }
      );
    };
    fetchUsuarios();
  }, [showModal]);
  useEffect(() => {
    const fetchUsuarios = async () => {
      setLoadingUserInformation(true);
      await obtenerUsuarios(
        (resp) => {
          setUsuarios(
            resp.data.filter(
              (usuario) => usuario.email !== "elapoamaya@gmail.com"
            )
          );
          setFilterUser(
            resp.data.filter(
              (usuario) => usuario.email !== "elapoamaya@gmail.com"
            )
          );

          setLoadingUserInformation(false);
        },
        (err) => {
          setLoadingUserInformation(false);
        }
      );
    };
    fetchUsuarios();
  }, []);

  //Check listo for manage access to keys
  // State with list of all checked item
  const [checked, setChecked] = useState([]);
  const checkList = ["1", "2", "3", "4"];
  // Add/Remove checked item from list
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };
  // Generate string of checked items
  const checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ", " + item;
      })
    : "";
  // Return classes based on whether item is checked
  const isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";

  const isSelect = (item) => (checked.includes(item) ? true : false);

  const [busqueda, setBusqueda] = useState("");
  const changeHandle = (e) => {
    setBusqueda(e.target.value);

    setFilterUser(
      usuarios.filter(
        (usuario) =>
          usuario.name.toString().includes(e.target.value.toString()) ||
          usuario.email.toString().includes(e.target.value.toString())
      )
    );
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
                    Actualizar acceso para {usuario.name}
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
                  <div className="checkItems">
                    <div className="checkList">
                      <div className="title">Llaves con acceso:</div>
                      <div className="list-container">
                        {checkList.map((item, index) => (
                          <div key={index}>
                            <input
                              value={item}
                              type="checkbox"
                              checked={isSelect(item)}
                              onChange={handleCheck}
                            />
                            <span className={isChecked(item)}>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>{`Selección: ${checkedItems}`}</div>
                  </div>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => closeModal(2)}
                  >
                    cerrar
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => closeModal(1)}
                  >
                    Guardar cambios
                  </button>
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
              <h2 class="text-gray-600 font-semibold">Usuarios</h2>
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
                  class="bg-gray-50 outline-none w-64 ml-1 block "
                  type="text"
                  name=""
                  value={busqueda}
                  onChange={changeHandle}
                  id=""
                  placeholder="Buscar por nombre o correo"
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
                          Email
                        </th>
                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Estado
                        </th>
                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Rol
                        </th>
                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Llaves
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterUser.map((user) => {
                        return (
                          <tr>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <div class="flex items-center">
                                <div class="flex-shrink-0 w-10 h-10">
                                  {user.picture ? (
                                    <img
                                      class="w-full h-full rounded-full"
                                      src={user.picture}
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
                                    {user.name}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p class="text-gray-900 whitespace-no-wrap">
                                {user.email}
                              </p>
                            </td>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p class="text-gray-900 whitespace-no-wrap">
                                <EstadoUsuario user={user} />
                              </p>
                            </td>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p class="text-gray-900 whitespace-no-wrap">
                                <RolesUsuario user={user} />
                              </p>
                            </td>
                            <td
                              className="bg-green-500"
                              onClick={() => openModal(user)}
                              class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                            >
                              <div
                                onClick={openModal}
                                class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                              >
                                <span
                                  aria-hidden
                                  class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                ></span>
                                <EditKeyAccess user={user} />
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

const RolesUsuario = ({ user }) => {
  const [rol, setRol] = useState(user.rol);

  useEffect(() => {
    const editUsuario = async () => {
      await editarUsuario(
        user._id,
        { rol },
        (res) => {},
        (err) => {}
      );
    };
    if (user.rol !== rol) {
      editUsuario();
    }
  }, [rol, user]);

  return (
    <select value={rol} onChange={(e) => setRol(e.target.value)}>
      <option value="" disabled>
        Seleccione un rol
      </option>
      <option value="admin">Admin</option>
      <option value="Empleado">Empleado</option>
      <option value="sin rol">Sin rol</option>
    </select>
  );
};

const EstadoUsuario = ({ user }) => {
  const [estado, setEstado] = useState(user.estado ?? "");

  useEffect(() => {
    const editUsuario = async () => {
      await editarUsuario(
        user._id,
        { estado },
        (res) => {},
        (err) => {
          console.error(err);
        }
      );
    };
    if (user.estado !== estado) {
      editUsuario();
    }
  }, [estado, user]);

  return (
    <select value={estado} onChange={(e) => setEstado(e.target.value)}>
      <option value="" disabled>
        Seleccione un estado
      </option>
      <option value="autorizado" className="text-green-500">
        Autorizado
      </option>
      <option value="pendiente" className="text-yellow-500">
        Pendiente
      </option>
      <option value="rechazado" className="text-red-500">
        Rechazado
      </option>
    </select>
  );
};

const EditKeyAccess = ({ user, showModal }) => {
  const [keys, setKeys] = useState([user.keyaccess]);

  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, [keys]);

  return (
    <div>
      <div>
        {show ? (
          <ul>
            {keys[0].length >= 1 ? (
              keys[0].map((key) => {
                return <li className="inline-block">{key},</li>;
              })
            ) : (
              <li>añadir</li>
            )}
          </ul>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default Usuarios;
