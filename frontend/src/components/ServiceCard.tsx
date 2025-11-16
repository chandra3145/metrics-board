import React from "react";

function ServiceCard({ data, onClick }: any) {
  const { serviceName, cpu, memory, errorRate } = data;

  return (
    <div
      className="card"
      onClick={onClick}
    >
      <h3>{serviceName}</h3>
      <p>CPU: {cpu}%</p>
      <p>Memory: {memory}%</p>
      <p>Errors: {errorRate}%</p>
    </div>
  );
}

export default ServiceCard;