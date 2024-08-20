import React, { createContext, useEffect, useState, useContext} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as auth from "../services/auth";
import api from "../services/api";


interface User {
  nome: string;
  email: string;
}

interface AuthContextData {
  signed: boolean;
  user: object | null;
  loading: boolean;
  signIn(user): Promise<void>;
  signOut(): void;
  //permissao: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider = ({ children }) => {

  const [user,setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true) //usar em componente
  //const [permissao, setPermissao] = useState('0')

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await AsyncStorage.getItem('@Auth:user')
      const storagedToken = await AsyncStorage.getItem('@Auth:token')
      //const storagedPerm = await AsyncStorage.getItem('@Auth:perm')

      if(storagedUser && storagedToken ){
        setUser(JSON.parse(storagedUser));
        api.defaults.headers.Authorization = `Baerer ${storagedToken}`;
        //setPermissao(JSON.parse(storagedPerm));
      }
      
      setLoading(false);
    }

    loadStorageData();
  });

  async function signIn(user) {
    const response = await auth.signIn(user);
    setUser(response.user);
    api.defaults.headers.Authorization = `Baerer ${response.token}`;

    await AsyncStorage.setItem('@Auth:user', JSON.stringify(response.user))
    await AsyncStorage.setItem('@Auth:token', response.token);

    setLoading(false);
  }

  async function signOut() {
    await AsyncStorage.clear();
    setUser(null);
  }

  async function signInDummyUser() {
    const dummyUser = {
      nome: "John Doe",
      email: "johndoe@example.com",
    };
    const dummyToken = "dummytoken123";
  
    setUser(dummyUser);
    api.defaults.headers.Authorization = `Bearer ${dummyToken}`;
  
    await AsyncStorage.setItem("@Auth:user", JSON.stringify(dummyUser));
    await AsyncStorage.setItem("@Auth:token", dummyToken);
  
    setLoading(false);
  }

  return(
  <AuthContext.Provider 
    value={{ signed: !!user, user, loading, signIn, signOut}}>
    {children}
  </AuthContext.Provider>
  );

};

  function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider.');
    }

    return context;
}

export {AuthProvider, useAuth};