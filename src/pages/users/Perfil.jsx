import React from "react";
import { useState, useRef } from "react";
import { useUser } from "../../context/userContext";
import { crearSolicitud } from "../../utils/api";
const Perfil = () => {
  const { userData } = useUser();

  const [showModal, setShowModal] = useState(false);
  const [selection, setSelection] = useState(4);
  const [usuario, setUsuario] = useState(userData);
  const inputRef = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const closeModal = (option) => {
    setShowModal((currShowModal) => false);

    if (option === 1) {
      var datosSolicitud = {
        user_id: userData._id,
        tipo: "Solicitar Llaves",
        fecha: new Date(),
        user_name: userData.name,
        user_picture: userData.picture,
        estado: "Sin gestionar",
        user_email: userData.email,
        llaves_pedidas: checked,
      };
    } else if (option === 2) {
      var datosSolicitud = {
        user_id: userData._id,
        tipo: "Cambiar contraseña",
        fecha: new Date(),
        user_name: userData.name,
        user_picture: userData.picture,
        estado: "Sin gestionar",
        user_email: userData.email,
        new_password: inputRef.current.value,
      };
    } else if (option === 3) {
      var datosSolicitud = {
        user_id: userData._id,
        tipo: "Nueva contraseña",
        fecha: new Date(),
        user_name: userData.name,
        user_picture: userData.picture,
        estado: "Sin gestionar",
        new_password: inputRef2.current.value,
        new_password_coacción: inputRef3.current.value,
        user_email: userData.email,
      };
    }

    const createSolicitud = async () => {
      await crearSolicitud(
        datosSolicitud,
        (response) => {},
        (error) => {}
      );
    };
    if (option === 1 || option === 2 || option === 3) {
      createSolicitud();
    }
  };

  const openModal = (option) => {
    setChecked(usuario.keyaccess);

    setShowModal((currShowModal) => true);
    if (option === 1) {
      setSelection(1);
    }
    if (option === 2) {
      setSelection(2);
    }
    if (option === 3) {
      setSelection(3);
    }
  };
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
  return (
    <div className="w-full h-full ">
      {showModal ? (
        <>
          {selection === 3 ? (
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Solicitar llaves</h3>
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
                      onClick={() => closeModal(10)}
                    >
                      cerrar
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => closeModal(3)}
                    >
                      Guardar cambios
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          {selection === 2 ? (
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      Cambiar contraseña
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

                  <div class="mb-4 m-10 ">
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="username"
                    >
                      Nueva contraseña
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="password"
                      type="password"
                      ref={inputRef}
                    />
                  </div>

                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => closeModal(10)}
                    >
                      cerrar
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => closeModal(2)}
                    >
                      Guardar cambios
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          {selection === 1 ? (
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Crear Contraseña</h3>
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

                  <div class="mb-4 m-10 ">
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="username6"
                    >
                      Contraseña ingreso normal
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="password2"
                      type="password"
                      ref={inputRef2}
                    />
                  </div>
                  <div class="mb-4 m-10 ">
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="username4"
                    >
                      Contraseña ingreso coacción
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="password3"
                      type="password"
                      ref={inputRef3}
                    />
                  </div>

                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => closeModal(10)}
                    >
                      cerrar
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => closeModal(3)}
                    >
                      Guardar cambios
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <div class="w-full h-full flex items-center justify-center ">
          <div class="max-w-sm bg-white p-10 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div class="flex flex-col items-center pb-10">
              <img
                class="mb-3 w-24 h-24 rounded-full shadow-lg"
                src={userData.picture}
                alt={userData.name + " imagen"}
              />
              <h3 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {userData.name}
              </h3>
              <span class="text-sm text-gray-500 dark:text-gray-400">
                {userData.rol} (
                <span class="text-lx text-blue-900 dark:text-gray-400">
                  {userData.estado}
                </span>
                )
              </span>
              <span class="text-lx text-red-500 dark:text-gray-400">
                Cantidad faltas leve:{" "}
                {userData.faltas_leve ? userData.faltas_leve : "0"}
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400">
                Llaves con acceso:{" "}
                {userData.keyaccess.length > 0
                  ? userData.keyaccess.map((key) => key + "   ")
                  : "sin acceso"}
              </span>
              <span class="text-sm text-red-500 dark:text-gray-400">
                {userData.password === "" ? "Debe crear la contraseña " : ""}
              </span>
              <div class="flex mt-4 space-x-3 lg:mt-6">
                <button
                  href="#"
                  class="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => openModal(3)}
                >
                  Solicitar llave
                </button>
                {userData.password === "" ? (
                  <button
                    href="#"
                    class="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-red-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-800"
                    onClick={() => openModal(1)}
                  >
                    Crear contraseña
                  </button>
                ) : (
                  <button
                    href="#"
                    class="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-800"
                    onClick={() => openModal(2)}
                  >
                    Cambiar contraseña
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Perfil;
