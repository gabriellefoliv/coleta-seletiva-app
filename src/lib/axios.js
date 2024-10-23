import axios from "axios";
import { API_URL } from "@env"; 

export const api = axios.create({
    baseURL: API_URL
})

export const createSession = async (email, senha) => {
    try {
        console.log("Dados de login enviados:", { email, senha });
        const response = await api.post('/login', { email, senha });
        console.log("Resposta da API de login:", response.data);
        return response;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.error("Credenciais inválidas:", error.response.data);
        } else {
            console.error("Erro desconhecido:", error.message);
        }
        throw error;
    }
};