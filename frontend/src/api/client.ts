import axios from "axios";

// En desarrollo usa el proxy de Vite (/api → localhost:8000)
// En producción apunta a VITE_API_URL (backend desplegado en Render/Railway)
const baseURL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : "/api";

const client = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

export default client;
