import path from "path";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

let serviceCount = 5;

type Metric = {
  serviceName: string;
  cpu: number;
  memory: number;
  errorRate: number;
};

function createMetrics(name: string): Metric {
  return {
    serviceName: name,
    cpu: Math.floor(Math.random() * 100),
    memory: Math.floor(Math.random() * 100),
    errorRate: Number((Math.random() * 8).toFixed(1))
  };
}

app.get("/config", (req, res) => {
    res.json({ services: serviceCount });
  });
  
  app.get("/config/update", (req, res) => {
    const n = Number(req.query.count);
    if (!isNaN(n) && n > 0 && n <= 200) {
      serviceCount = n;
    }
    res.json({ updated: serviceCount });
  });

app.get("/metrics/stream", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.flushHeaders();

  const sendData = () => {
    const list: Metric[] = [];
    for (let i = 1; i <= serviceCount; i++) {
      list.push(createMetrics(`service-${i}`));
    }
    res.write(`data: ${JSON.stringify(list)}\n\n`);
  };

  const interval = setInterval(sendData, 1000);
  req.on("close", () => {
    clearInterval(interval);
  });

});

const PORT = 4000;
app.listen(PORT, () => {
  console.log("Backend running on port", PORT);
});