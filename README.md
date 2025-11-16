# Live Metrics Dashboard

This is a small full‑stack project using React (TypeScript) on frontend and Node.js + Express on backend.  
The backend sends fake service metrics every second and the UI shows them live in a simple dashboard.

---

## Features

### Backend
- Generates random CPU, memory and error % for few services  
- Streams data using SSE  
- Has a config endpoint to change number of services  

### Frontend
- React (CRA) with TypeScript  
- Shows each service in a card with color status  
- Modal opens on click and shows simple line chart  
- Uses basic design tokens in CSS for colors, spacing etc.

---


## Installation / Project Setup

Before running anything, make sure you have Node 18+ installed.

### 1. Install Backend
```
cd backend
npm install
```

### 2. Install Frontend
```
cd frontend
npm install
```

### 3. Run Backend
```
cd backend
npm run dev
```
It starts on:
```
http://localhost:4000
```

### 4. Run Frontend
```
cd frontend
npm start
```
It opens at:
```
http://localhost:3000
```

That's basically it for local setup.

---

## Running with Docker

If you want to build and run everything in one container:

### Build image
```
docker build -t realtime-metrics-board .
```

### Run container
```
docker run -p 4000:4000 realtime-metrics-board
```

Open the browser at:
```
http://localhost:4000
```
---

## API Endpoints

- **GET /config** → returns how many services are running  
- **GET /config/update?count=10** → update service count  
- **GET /metrics/stream** → SSE stream with live metrics  

---

## Small Note on Scalability

If services grow to like 1000+, few things can help:
- avoid sending all data every second, maybe send smaller chunks  
- don't render all cards at once on UI, use some list loading  
- charts should only load when user opens modal  
This project is simple so not doing all that now.

(This is just a quick idea area, not fully detailed.)

---

## Summary

Just a basic setup to show how live metrics can be streamed and displayed.  
Kept things simple so its easy to read and run.

