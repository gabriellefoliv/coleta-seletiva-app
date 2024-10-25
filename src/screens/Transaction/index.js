import { api } from "../../lib/axios";
import { AuthContext } from "../../context/auth";
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './style';
import Header from "../../components/Header";


const Transaction = ({ navigation }) => {

    const { user } = useContext(AuthContext);

    const [pontos, setPontos] = useState('');
    const [totalPontos, setTotalPontos] = useState('');
    const [partners, setPartners] = useState([]);
    const [partner, setPartner] = useState('');  // Adicionando o estado do parceiro
    const [isloading, setIsLoading] = useState(true);

    const handleTransfer = () => {
        Alert.alert("Sucesso", "Pontos transferidos com sucesso.");
        // Aqui pode ser implementada a lógica de transferência de pontos
    };

    const fetchPontos = async () => {
        if (user && user.codCliente) {
            try {
                const response = await api.get(`/pontos/${user.codCliente}`);
                setTotalPontos(response.data[0].totalPontos); // Atribui os pontos do cliente logado
            } catch (error) {
                console.error("Erro ao carregar os pontos: ", error);
            }
        }
    };

    const loadPartners = async () => {
        const response = await api.get('/parceiros');
        if (response.status === 200){
            setPartners(response.data);
            setIsLoading(false);
        } else if (response.status === 300) {
            Alert.alert("Indisponivel", "Página indinsponivel temporariamente.");
        } else {
            Alert.alert("Erro", "Erro ao carregar parceiros, pedimos desculpas pelo ocorrido.");
        }
    };

    const goToHistory = () => {
        navigation.navigate('TransactionHistory'); // Nome da página de histórico de transações
    };

    useEffect(() => {
        loadPartners();
        fetchPontos();
    }, []);

    if (isloading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
      }
    else {
        return (
            <>
            <Header navigation={navigation} title="Transferir" />
            <View style={styles.container}>
            <Text style={styles.title}>Transferência de Pontos</Text>
          
            {/* Texto de total de pontos do cliente */}
            <View style={styles.pointsContainer}>
                <Text style={styles.pointsText}>Pontos : </Text>
                <Text style={styles.points}>{totalPontos} pts.</Text>
            </View>

            {/* Input para inserir os pontos a transferir */}
            <TextInput
                style={styles.input}
                placeholder="Insira a quantidade de pontos"
                keyboardType="numeric"
                value={pontos}
                onChangeText={setPontos}
            />
    
            {/* Dropdown para escolher o parceiro */}
            <Picker
                selectedValue={partner}
                style={styles.picker}
                onValueChange={(itemValue) => setPartner(itemValue)}  // Define o codParceiro
                >
                <Picker.Item label="Selecione um parceiro" value="" />
                {partners.map((partnerItem) => (
                    <Picker.Item
                    key={partnerItem.codParceiro}  // Define uma chave única
                    label={partnerItem.nome}       // Mostra o nome do parceiro
                    value={partnerItem.codParceiro} // Armazena o codParceiro como valor
                />
                ))}
            </Picker>
    
            {/* Botão para enviar a transferência */}
            <TouchableOpacity style={styles.button} onPress={handleTransfer}>
                <Text style={styles.buttonText}>Enviar Transferência</Text>
            </TouchableOpacity>
    
            {/* Botão para acessar o histórico de transações */}
            <TouchableOpacity style={styles.historyButton} onPress={goToHistory}>
                <Text style={styles.historyButtonText}>Histórico de Transações</Text>
            </TouchableOpacity>
            </View>
            </>
        );
    }

}

export default Transaction;