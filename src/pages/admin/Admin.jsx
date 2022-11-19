import React, { useState, useEffect } from "react";
import { obtenerHistoricos } from "../../utils/api";
import { editarHistorico } from "../../utils/api";
import { editarUsuario } from "../../utils/api";
import DashboardStatsGrid from "../../components/DashboardStatsGrid";
import UtilBarChart from "../../components/UtilBarChart";
import BuyerProfilePieChart from "../../components/BuyerProfilePieChart";
import RecentOrders from "../../components/RecentOrders";
import PopularProducts from "../../components/PopularProducts";

import ReactLoading from "react-loading";
const Admin = () => {
  const [historicos, setHistoricos] = useState([]);
  const [historico, setHistorico] = useState();
  const [dataLlaves, setDataLlaves] = useState([]);
  const [dataAcciones, setDataAcciones] = useState([]);
  const [dataUltima, setDataUltima] = useState([]);
  const [dataIngreso, setDataIngreso] = useState([]);
  const [alarmaTotales, setAlarmaTotales] = useState("");
  const [estadoActual, setEstadoActual] = useState([]);
  //Añadir loading
  const [loadingUserInformation, setLoadingUserInformation] = useState(false);

  useEffect(() => {
    setLoadingUserInformation(false);
  }, [historicos]);

  useEffect(() => {
    const fetchHistoricos = async () => {
      setLoadingUserInformation(true);
      await obtenerHistoricos(
        (resp) => {
          console.log("Historicos", resp.data);
          setHistoricos(resp.data);
          let llaves_tomadas = resp.data.map(
            (historico) => historico.llaves_tomada
          );
          let usuarios = Array.from(
            new Set(resp.data.map((historico) => historico.user_name))
          );
          console.log("usuarios unicos", usuarios);
          setEstadoActual(resp.data[0].llaves_despues);

          console.log("Llaves", llaves_tomadas);
          let cantidadesIngreso = [];
          for (var i = 0; i < usuarios.length; i++) {
            cantidadesIngreso.push({
              name: usuarios[i],
              cantidad: resp.data.filter(
                (historico) => historico.user_name === usuarios[i]
              ).length,
              incidente:
                resp.data.filter(
                  (historico) => historico.user_name === usuarios[i]
                ).length -
                resp.data.filter(
                  (historico) =>
                    historico.user_name === usuarios[i] &&
                    historico.accion === "No Requerida"
                ).length,
              alarma: resp.data.filter(
                (historico) =>
                  historico.user_name === usuarios[i] &&
                  historico.alarma === "Activada"
              ).length,
            });
          }
          setAlarmaTotales(
            resp.data.filter((historico) => historico.alarma === "Activada")
              .length
          );
          setDataIngreso(cantidadesIngreso);
          let cantidades = [
            llaves_tomadas.filter((array) => array.includes("1")).length,
            llaves_tomadas.filter((array) => array.includes("2")).length,
            llaves_tomadas.filter((array) => array.includes("3")).length,
            llaves_tomadas.filter((array) => array.includes("4")).length,
          ];
          let cantidadesAcciones = [
            resp.data.filter((historico) => historico.accion === "No Requerida")
              .length,
            resp.data.filter((historico) => historico.accion === "Realizada")
              .length,
            resp.data.filter((historico) => historico.accion === "Requerida")
              .length,
          ];
          let usuarioLlave = [
            resp.data.filter((historico) =>
              historico.llaves_tomada.includes("1")
            )[0],
            resp.data.filter((historico) =>
              historico.llaves_tomada.includes("2")
            )[0],
            resp.data.filter((historico) =>
              historico.llaves_tomada.includes("3")
            )[0],
            resp.data.filter((historico) =>
              historico.llaves_tomada.includes("4")
            )[0],
          ];

          if (usuarioLlave[0] === undefined) {
            usuarioLlave[0] = "no tomada";
          } else {
            usuarioLlave[0] = usuarioLlave[0].user_name;
          }
          if (usuarioLlave[1] === undefined) {
            usuarioLlave[1] = "no tomada";
          } else {
            usuarioLlave[1] = usuarioLlave[1].user_name;
          }

          if (usuarioLlave[2] === undefined) {
            usuarioLlave[2] = "no tomada";
          } else {
            usuarioLlave[2] = usuarioLlave[2].user_name;
          }

          if (usuarioLlave[3] === undefined) {
            usuarioLlave[3] = "no tomada";
          } else {
            usuarioLlave[3] = usuarioLlave[3].user_name;
          }

          console.log("usuarioLlave", usuarioLlave);
          setDataUltima([
            {
              llave: "1",
              name: usuarioLlave[0],
            },
            {
              llave: "2",
              name: usuarioLlave[1],
            },
            {
              llave: "3",
              name: usuarioLlave[2],
            },
            {
              llave: "4",
              name: usuarioLlave[3],
            },
          ]);
          setDataAcciones([
            { name: "No Requerida", value: cantidadesAcciones[0] },
            { name: "Realizada", value: cantidadesAcciones[1] },
            { name: "Requerida", value: cantidadesAcciones[2] },
          ]);
          console.log("Cantidad de las acciones", cantidadesAcciones);
          setDataLlaves([
            {
              name: "1",
              Cantidad_de_veces_usada: cantidades[0],
            },
            {
              name: "2",
              Cantidad_de_veces_usada: cantidades[1],
            },
            {
              name: "3",
              Cantidad_de_veces_usada: cantidades[2],
            },
            {
              name: "4",
              Cantidad_de_veces_usada: cantidades[3],
            },
          ]);
          console.log("Cantidad de veces que se repite", cantidades);
          // console.log("Usuarios de la pagina", usuarios);
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
  const [isValid, setIsValid] = useState(false);
  const [valueSelect, setValueSelect] = useState("");
  const handleSelect = (e) => {
    setValueSelect(e.target.value);
    console.log(e.target.value);
    let resp = {
      data: historicos.filter(
        (historico) =>
          new Date(historico.fecha).getMonth() === parseInt(e.target.value) - 1
      ),
    };
    console.log("Res", resp);
    if (resp.data.length > 0) {
      let llaves_tomadas = resp.data.map(
        (historico) => historico.llaves_tomada
      );
      let usuarios = Array.from(
        new Set(resp.data.map((historico) => historico.user_name))
      );
      console.log("usuarios unicos", usuarios);

      console.log("Llaves", llaves_tomadas);

      let cantidadesIngreso = [];
      for (var i = 0; i < usuarios.length; i++) {
        cantidadesIngreso.push({
          name: usuarios[i],
          cantidad: resp.data.filter(
            (historico) => historico.user_name === usuarios[i]
          ).length,
          incidente:
            resp.data.filter((historico) => historico.user_name === usuarios[i])
              .length -
            resp.data.filter(
              (historico) =>
                historico.user_name === usuarios[i] &&
                historico.accion === "No Requerida"
            ).length,
          alarma: resp.data.filter(
            (historico) =>
              historico.user_name === usuarios[i] &&
              historico.alarma === "Activada"
          ).length,
        });
      }
      setAlarmaTotales(
        resp.data.filter((historico) => historico.alarma === "Activada").length
      );
      setDataIngreso(cantidadesIngreso);
      let cantidades = [
        llaves_tomadas.filter((array) => array.includes("1")).length,
        llaves_tomadas.filter((array) => array.includes("2")).length,
        llaves_tomadas.filter((array) => array.includes("3")).length,
        llaves_tomadas.filter((array) => array.includes("4")).length,
      ];
      let cantidadesAcciones = [
        resp.data.filter((historico) => historico.accion === "No Requerida")
          .length,
        resp.data.filter((historico) => historico.accion === "Realizada")
          .length,
        resp.data.filter((historico) => historico.accion === "Requerida")
          .length,
      ];
      let usuarioLlave = [
        resp.data.filter((historico) =>
          historico.llaves_tomada.includes("1")
        )[0],
        resp.data.filter((historico) =>
          historico.llaves_tomada.includes("2")
        )[0],
        resp.data.filter((historico) =>
          historico.llaves_tomada.includes("3")
        )[0],
        resp.data.filter((historico) =>
          historico.llaves_tomada.includes("4")
        )[0],
      ];

      if (usuarioLlave[0] === undefined) {
        usuarioLlave[0] = "no tomada";
      } else {
        usuarioLlave[0] = usuarioLlave[0].user_name;
      }
      if (usuarioLlave[1] === undefined) {
        usuarioLlave[1] = "no tomada";
      } else {
        usuarioLlave[1] = usuarioLlave[1].user_name;
      }

      if (usuarioLlave[2] === undefined) {
        usuarioLlave[2] = "no tomada";
      } else {
        usuarioLlave[2] = usuarioLlave[2].user_name;
      }

      if (usuarioLlave[3] === undefined) {
        usuarioLlave[3] = "no tomada";
      } else {
        usuarioLlave[3] = usuarioLlave[3].user_name;
      }

      console.log("usuarioLlave", usuarioLlave);
      setDataUltima([
        {
          llave: "1",
          name: usuarioLlave[0],
        },
        {
          llave: "2",
          name: usuarioLlave[1],
        },
        {
          llave: "3",
          name: usuarioLlave[2],
        },
        {
          llave: "4",
          name: usuarioLlave[3],
        },
      ]);
      setDataAcciones([
        { name: "No Requerida", value: cantidadesAcciones[0] },
        { name: "Realizada", value: cantidadesAcciones[1] },
        { name: "Requerida", value: cantidadesAcciones[2] },
      ]);
      console.log("Cantidad de las acciones", cantidadesAcciones);
      setDataLlaves([
        {
          name: "1",
          Cantidad_de_veces_usada: cantidades[0],
        },
        {
          name: "2",
          Cantidad_de_veces_usada: cantidades[1],
        },
        {
          name: "3",
          Cantidad_de_veces_usada: cantidades[2],
        },
        {
          name: "4",
          Cantidad_de_veces_usada: cantidades[3],
        },
      ]);
      console.log("Cantidad de veces que se repite", cantidades);
      // console.log("Usuarios de la pagina", usuarios)
      setIsValid(true);
    } else {
      setIsValid(false);
      setAux("Seleccione mes valido, este no cuenta con datos");
    }
  };
  const [aux, setAux] = useState("Historico");
  return (
    <div>
      {!loadingUserInformation ? (
        <div className="flex flex-col justify-center gap-4">
          <div>
            <select
              id="countries"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleSelect}
            >
              <option selected>Seleccionar mes</option>

              <option value="1">Enero</option>
              <option value="2">Febrero</option>
              <option value="3">Marzo</option>
              <option value="4">Abril</option>
              <option value="5">Mayo</option>
              <option value="6">Junio</option>
              <option value="7">Julio</option>
              <option value="8">Agosto</option>
              <option value="9">Septiembre</option>
              <option value="10">Octubre</option>
              <option value="11">Noviembre</option>
              <option value="12">Diciembre</option>
            </select>
            {isValid ? <h1>Mes seleccionado </h1> : <h1>{aux}</h1>}
          </div>
          <div className="flex flex-row gap-4 w-full  justify-center">
            <UtilBarChart data={dataLlaves} />
            <BuyerProfilePieChart data={dataAcciones} />
            <RecentOrders
              alarma={alarmaTotales}
              userData={dataIngreso}
              keyData={dataUltima}
              estado={estadoActual}
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <ReactLoading type="spin" color="#219BF3" height={200} width={200} />
        </div>
      )}
    </div>
  );
};

export default Admin;
