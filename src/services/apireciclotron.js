import axios from "axios";

const api = axios.create({
    //baseURL: "https://reciclopontos.com.br/api/convert",
    baseURL: "https://reciclopontos.com.br/api/partner_rate.php",
    headers: {
        "partner": "23052116000108",
        "token": "906007c7b743ac1ef7a6247d0",
        "CNPJ": "28523215000106",
        "description": "Conversão de Pontos em Reciclopontos",
        "points": 1000,
        "autonum": "75883410"
    }
});

api.interceptors.request.use(async config => {
    // Declaramos um token manualmente para teste.
    const token = "906007c7b743ac1ef7a6247d0";

    if (token) {
        api.defaults.headers.authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;