import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  timeout: 300000, // 5 minutos — gpt-5.4-image-2 pode demorar ate 3 min
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