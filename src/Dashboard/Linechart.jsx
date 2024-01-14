import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
function Linechart() {
  const [eventdata, setEventData] = useState([{}]);

  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const getMonth = async () => {
    months.map(async (item, index) => {
      const res = await axios.post(
        "http://localhost:3001/api/current-month",
        { mm: item },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setEventData((data) => [
        ...data,
        { months: item, PresentEvent: res.data.length },
      ]);
      // console.log(eventdata);
    });
  };

  useEffect(() => {
    getMonth();
    // console.log(eventdata);
  }, []);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={eventdata}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="months" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="PresentEvent" stackId="a" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default Linechart;
