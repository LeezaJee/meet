import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const EventGenre = ({ events }) => {
  const [data, setData] = useState([]);

  const COLORS = ["#204051", "#392F2C", "#2C3639", "#3B6978", "#C74B50"];

  const getData = () => {
    const genres = ["React", "JavaScript", "Node", "jQuery", "AngularJS"];

    const data = genres.map((genre) => {
      const value = events.filter((event) =>
        event.summary.replace(".js", "").split(" ").includes(genre)
      ).length;
      return {
        name: genre,
        value: value,
      };
    });
    return data;
  };

  useEffect(() => {
    setData(() => getData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          label={({ name, percent }) => {
            if (percent > 0) {
              return `${name} ${(percent * 100).toFixed(0)}%`;
            }
          }}
          outerRadius={80}
          fill="#ffc107"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          >
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenre;
