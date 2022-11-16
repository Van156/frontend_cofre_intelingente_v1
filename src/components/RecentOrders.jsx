import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { getOrderStatus } from "./index.jsx";

const userData = [
  {
    name: "Elder",
    cantidad: "6",
  },
  {
    name: "Juan",
    cantidad: "9",
  },
  {
    name: "Pedro",
    cantidad: "10",
  },
];
const keyData = [
  {
    llave: "1",
    name: "Elder",
  },
  {
    llave: "2",
    name: "Juan",
  },
  {
    llave: "3",
    name: "pepe",
  },
  {
    llave: "4",
    name: "Juancho",
  },
];

const RecentOrders = ({ estado, alarma, userData, keyData }) => {
  return (
    <div className="bg-white px-4 pt-3 object-contain rounded-sm border border-gray-200 ">
      <strong className="text-green-500 font-medium ">
        Llaves actuales: {estado.map((llave) => llave + "   ")}
      </strong>

      <h1 className="text-red-500 font-medium">
        El total de alarmas activadas fue {alarma}
      </h1>
      <hr />
      <strong className="text-gray-700 font-medium">
        Cantidad de ingresos
      </strong>
      <div className="border-x border-gray-200 rounded-sm mt-3">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>#interacciones</th>
              <th>Incidentes</th>
              <th>Alarmas</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((data) => (
              <tr key={data.name}>
                <td>
                  <p>{data.name}</p>
                </td>
                <td>
                  <p>{data.cantidad}</p>
                </td>
                <td>
                  <p>{data.incidente}</p>
                </td>
                <td>
                  <p>{data.alarma}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <strong className="text-gray-700 font-medium">
        Quien fue el ultimo usuario en tener la llave
      </strong>
      <div className="border-x border-gray-200 rounded-sm mt-3">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th>llave</th>
              <th>usuario</th>
            </tr>
          </thead>
          <tbody>
            {keyData.map((data) => (
              <tr key={data.llave}>
                <td>
                  <p>{data.llave}</p>
                </td>
                <td>
                  <p>{data.name}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
