import { api } from "../../lib/axios";
import { useRoute } from "@react-navigation/native"
import { AuthContext } from "../../../context/auth";
import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import planta0 from '../../assets/images/planta/0.png';
import planta1 from '../../assets/images/planta/1.png';
import planta2 from '../../assets/images/planta/2.png';
import planta3 from '../../assets/images/planta/3.png';
import planta4 from '../../assets/images/planta/4.png';
import styles from './style'

import { View,
    TextInput, Text,
    TouchableOpacity, 
    Image, StatusBar, KeyboardAvoidingView, ActivityIndicator} from 'react-native'

const PlantaPage = ({ navigation }) => {
    const route = useRoute();
    const { user } = useContext(AuthContext);
    const [plantaData, setPlantaData] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Is loading é ativo enquanto a planta ainda é carregada.

    const carregarPlanta = async () => {
        try{
            let response;
            response = await api.get(`/planta/${user.codCliente}`);
            const data = response.data[0];
            setPlantaData(data);
            console.log(data) // APAGAR DEPOIS
        } catch (error){
            console.error("Erro ao carregar planta:", error.message); // Tratamento de erro
        } finally{
            setIsLoading(false);
        }
    };

    const regarPlanta = async () => {
        try {
            const response = await api.put(`/planta/rega/${user.codCliente}`);
            const data = await response.data;
            const message = await response.data.message;

            if (response.status === 300 || response.status === 400 || response.status === 200) {
                alert(message);
                if (response.status === 200){
                    setRefresh(!refresh);
                }
            } else {
                // Caso contrário, a mensagem de erro já foi retornada pelo servidor
                alert("Erro", message || "Erro ao regar a planta.");
            }
        } catch (error) {
            console.error("Erro ao regar a planta:", error);
            alert("Erro", "Erro ao regar a planta.");
        }
    }
             
    const coletarPlanta = async () => {
        try {
            const response = await api.post(`/planta/coleta/${user.codCliente}`);
    
            if (response.status === 200) {
                const message = await response.data.message;
                alert(message);
                setRefresh(!refresh);
            } else {
                const errorMessage = await response.text();
                alert(errorMessage);
            }
        } catch (error) {
            console.error("Erro ao coletar planta:", error);
            alert("Erro ao coletar planta.");
        };
    };

    // Alterar para que ao abrir a página seja possível utilizar somente o useEffect com o refresh.
    useEffect(() => {   
        carregarPlanta();
    }, []);

    useEffect(() => {
        carregarPlanta();
    }, [refresh]);

    useEffect(() => {
        if (plantaData) {
            console.log(plantaData.estagio); // APAGAR DEPOIS
        }
    }, [plantaData]);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='400' color="green" />
                <Text>Carregando dados da planta...</Text>
            </View>
        );
    }

    //disabled={plantaData.estagio != 4}
    return (
        <>
          <Header title="Planta" />
          <View style={styles.Area}>
            <Image
              source={
                plantaData.estagio === 4 ? planta4 :
                plantaData.estagio === 3 ? planta3 :
                plantaData.estagio === 2 ? planta2 :
                plantaData.estagio === 1 ? planta1 :
                planta0
              }
              style={styles.planta}
            />
      
            {/* Botão de Coletar Planta */}
            <TouchableOpacity
              style={styles.botaoColetar}
              onPress={() => {
                if (plantaData.estagio === 4) {
                  coletarPlanta();
                } else {
                  Alert.alert("Aviso", "A planta não está pronta para coleta.");
                }
              }}
            >
              <Text style={styles.textoBotao}>Colher Planta</Text>
            </TouchableOpacity>
      
            {/* Botão de Regar Planta */}
            <TouchableOpacity
              style={styles.botaoRegar}
              onPress={() => {
                if (plantaData.estagio === 4) {
                  Alert.alert("Aviso", "A planta já está no estágio máximo.");
                } else {
                  regarPlanta();
                }
              }}
            >
              <Text style={styles.textoBotao}>Regar Planta</Text>
            </TouchableOpacity>
          </View>
        </>
      );
};

export default PlantaPage;