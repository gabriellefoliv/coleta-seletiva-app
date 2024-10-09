import React, { createContext, useState, useEffect } from "react";
import { api, createSession } from "../lib/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (data) => {
        try {
            const response = await createSession(data.email, data.senha);
            api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
            setUser(response.data.cliente);
            console.log("Usuário após login:", response.data.cliente);
        } catch (error) {
            console.error("Erro no login:", error);
        }
    }

    const logout = async () => {
        api.defaults.headers.Authorization = null;
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ authenticated: !!user, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};