import axios from "axios";

const api = axios.create({
    baseURL: "https://reciclopontos.com.br/api/partner_rate.php"
    
});

export default api;