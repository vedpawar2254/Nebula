"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const dummyData = [
  { date: "Mon", commits: 4 },
  { date: "Tue", commits: 7 },
  { date: "Wed", commits: 3 },
  { date: "Thu", commits: 6 },
  { date: "Fri", commits: 10 },
  { date: "Sat", commits: 2 },
  { date: "Sun", commits: 8 },
];

const ContributionChart: React.FC = () => {
  return (
    <div style={{ width: "100%", height: 300, marginTop: "2rem" }}>
      <ResponsiveContainer>
        <LineChart data={dummyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#555" />
          <XAxis dataKey="date" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Line type="monotone" dataKey="commits" stroke="#00ccff" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ContributionChart;
