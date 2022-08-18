import React, { useEffect, useState } from "react";
import { PieChart, Pie, ResponsiveContainer } from "recharts";

  return (
    <ResponsiveContainer height={400}>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        ></Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenre;
