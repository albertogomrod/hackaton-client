import axios from "axios";

// de este service es donde se haran todas las llamadas al BE
const service = axios.create({
  baseURL: "http://localhost:5005/api",
});

// todas las llamadas de este service, iran acompañadas de el Token
service.interceptors.request.use((config) => {
  // interceptar la llamada justo al momento de salir para añadirle el Token

  // extraer el Token de LocalStorage
  const storedToken = localStorage.getItem("authToken");
  const tokenAndType = `Bearer ${storedToken}`;

  if (storedToken) {
    config.headers.authorization = tokenAndType;
  }

  return config;
});

export default service;
