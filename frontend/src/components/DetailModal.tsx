import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "./DetailModal.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

let counter = 0;

function DetailModal({ service, onClose }: any) {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const id = setInterval(() => {
      setHistory((old) => {
        const next = [
          ...old,
          {
            x: counter++,
            cpu: service.cpu,
            memory: service.memory,
            errors: service.errorRate
          }
        ];
        return next.slice(-30);
      });
    }, 1000);

    return () => clearInterval(id);
  }, [service]);

  const chartData = {
    labels: history.map((item) => item.x),
    datasets: [
      {
        label: "CPU %",
        data: history.map((item) => item.cpu),
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.2
      },
      {
        label: "Memory %",
        data: history.map((item) => item.memory),
        borderColor: "rgba(153, 102, 255, 1)",
        tension: 0.2
      },
      {
        label: "Errors %",
        data: history.map((item) => item.errors),
        borderColor: "rgba(255, 99, 132, 1)",
        tension: 0.2
      }
    ]
  };

  return (
    <div className="modal-bg">
      <div className="modal">
        <h2>{service.serviceName}</h2>
        <Line data={chartData} height={300} />
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default DetailModal;