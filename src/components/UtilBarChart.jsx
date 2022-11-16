import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data2 = [
  {
    name: "1",
    Cantidad_de_veces_usada: 4000,
  },
  {
    name: "2",
    Cantidad_de_veces_usada: 3000,
  },
  {
    name: "3",
    Cantidad_de_veces_usada: 2000,
  },
  {
    name: "4",
    Cantidad_de_veces_usada: 2780,
  },
];

const UtilBarChart = ({ data }) => {
  return (
    <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col ">
      <strong className="text-gray-700 font-medium">
        Cantidad de usos por llave
      </strong>
      <div className="mt-3 w-full flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 10,
              left: -10,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Cantidad_de_veces_usada" fill="#0ea5e9" />
            {/* <Bar dataKey="Expense" fill="#ea580c" /> */}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default UtilBarChart;
