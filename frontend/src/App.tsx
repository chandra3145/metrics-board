import React, { useEffect, useRef, useState } from "react";
import ServiceCard from "./components/ServiceCard";
import "./App.css";

type Metric = {
  serviceName: string;
  cpu: number;
  memory: number;
  errorRate: number;
};

function App() {
  const [services, setServices] = useState<Metric[]>([]);
  const sourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    const src = new EventSource("http://localhost:4000/metrics/stream");
    sourceRef.current = src;

    src.onmessage = (e) => {
      try {
        const parsed = JSON.parse(e.data);
        setServices(parsed);
      } catch {}
    };

    src.onerror = () => {
      console.log("Stream error. Reconnecting...");
      src.close();
      setTimeout(() => {
        sourceRef.current = new EventSource("http://localhost:4000/metrics/stream");
      }, 1500);
    };

    return () => src.close();
  }, []);

  return (
    <div className="wrapper">
      <h1 className="title">Live Metrics Dashboard</h1>

      <div className="grid">
        {services.map((svc) => (
          <ServiceCard
            key={svc.serviceName}
            data={svc}
          />
        ))}
      </div>
    </div>
  );
}

export default App;