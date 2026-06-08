import axios from "axios";

// Em producao: VITE_API_URL aponta para o backend no Render
// Em desenvolvimento: usa o proxy do Vite (/api -> localhost:3000)
const baseURL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : "/api";

export const api = axios.create({
  baseURL,
  timeout: 300000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.code === "ECONNABORTED"
        ? "A geracao demorou muito. Tente novamente."
        : error.response?.data?.error ||
          error.message ||
          "Erro ao conectar com o servidor";
    return Promise.reject(new Error(message));
  }
);