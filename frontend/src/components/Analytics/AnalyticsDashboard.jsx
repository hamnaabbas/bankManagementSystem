import React from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const data = [
  { name: "Income", value: 6000 },
  { name: "Expenses", value: 4000 },
];

const COLORS = ["#5373fb", "#fc2424"];

const AnalyticsDashboard = () => {
  return (
    <div>
      <h2>Business Analytics</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default AnalyticsDashboard;
