import axios from "axios";

//const baseURL = "http://localhost:5000";
const baseURL = "https://thawing-earth-49122.herokuapp.com";

const getToken = () => {
  return `Bearer ${localStorage.getItem("token")}`;
};

// CRUD PARA USUARIOS
export const obtenerUsuarios = async (successCallback, errorCallback) => {
  const options = {
    method: "GET",
    url: `${baseURL}/usuarios/`,
    headers: {
      Authorization: getToken(),
    },
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

//Crud para historicos
export const obtenerHistoricos = async (successCallback, errorCallback) => {
  const options = {
    method: "GET",
    url: `${baseURL}/historicos/`,
    headers: {
      Authorization: getToken(),
    },
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const obtenerSolicitudes = async (successCallback, errorCallback) => {
  const options = {
    method: "GET",
    url: `${baseURL}/solicitudes/`,
    headers: {
      Authorization: getToken(),
    },
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const obtenerDatosUsuario = async (successCallback, errorCallback) => {
  const options = {
    method: "GET",
    url: `${baseURL}/usuarios/self/`,
    headers: {
      Authorization: getToken(), // 3. enviarle el token a backend
    },
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const editarUsuario = async (
  id,
  data,
  successCallback,
  errorCallback
) => {
  const options = {
    method: "PATCH",
    url: `${baseURL}/usuarios/${id}/`,
    headers: { "Content-Type": "application/json", Authorization: getToken() },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const editarHistorico = async (
  id,
  data,
  successCallback,
  errorCallback
) => {
  const options = {
    method: "PATCH",
    url: `${baseURL}/historicos/${id}/`,
    headers: { "Content-Type": "application/json", Authorization: getToken() },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const obtenerUsuario = async (id, successCallback, errorCallback) => {
  const options = {
    method: "GET",
    url: `${baseURL}/usuarios/${id}/`,
    headers: { "Content-Type": "application/json", Authorization: getToken() },
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};
export const obtenerSolicitudesUsuario = async (
  id,
  successCallback,
  errorCallback
) => {
  const options = {
    method: "GET",
    url: `${baseURL}/solicitudes/${id}/`,
    headers: { "Content-Type": "application/json", Authorization: getToken() },
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const editarSolicitud = async (
  id,
  data,
  successCallback,
  errorCallback
) => {
  const options = {
    method: "PATCH",
    url: `${baseURL}/solicitudes/${id}/`,
    headers: { "Content-Type": "application/json", Authorization: getToken() },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

// CRUD DE VENTAS
export const crearSolicitud = async (data, successCallback, errorCallback) => {
  const options = {
    method: "POST",
    url: `${baseURL}/solicitudes/`,
    headers: { "Content-Type": "application/json", Authorization: getToken() },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};
