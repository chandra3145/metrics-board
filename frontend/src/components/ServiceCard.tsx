import React from "react";
import "./ServiceCard.css";


const getBorderColor = (cpu: number, errorRate: number) => {
    if (cpu > 80 || errorRate > 5) return "var(--status-red)";
    if (cpu > 60) return "var(--status-yellow)";
    return "var(--status-green)";
  };

function ServiceCard({ data, onClick }: any) {
  const { serviceName, cpu, memory, errorRate } = data;

  return (
    <div
      className="card"
      style={{ borderColor: getBorderColor(cpu, errorRate) }}
      onClick={onClick}
    >
      <h3>{serviceName}</h3>
      <p>CPU: {cpu}%</p>
      <p>Memory: {memory}%</p>
      <p>Errors: {errorRate}%</p>
    </div>
  );
}

export default React.memo(ServiceCard);