import { api } from "../../lib/axios";
import { AuthContext } from "../../context/auth";
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './style';
import Header from "../../components/Header";


const Transacao = ({ navigation }) => {

    const { user } = useContext(AuthContext);

    const [pontos, setPontos] = useState('');
    const [totalPontos, setTotalPontos] = useState('');
    const [partners, setPartners] = useState([]);
    const [partner, setPartner] = useState('');  // Adicionando o estado do parceiro
    const [isloading, setIsLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleTransfer = () => {
        setIsModalVisible(true); // Exibe o modal de confirmação
    };

    const confirmTransfer = async (codParceiro, pontos) => {
        setIsModalVisible(false); // Oculta o modal
        try {
            const response = await api.post(`/recompensa/${user.codCliente}`, {
                codParceiro: codParceiro,
                pontos : pontos
            });
            if (response.status === 200){
                Alert.alert("Sucesso", "Pontos transferidos com sucesso.");
                fetchPontos(); // Atualiza os pontos do cliente após a transferência
            } else {
                Alert.alert("Erro", "Ocorreu um erro ao tranferir os pontos");
            }
        } catch (error) {
            console.log(error);
        }
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
        <View style={styles.totalCard}>
            <Text style={styles.totalText}>Total de Pontos:</Text>
            <Text style={styles.totalPeso}>{totalPontos} pts.</Text>
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
            onValueChange={(itemValue) => setPartner(itemValue)}
        >
            <Picker.Item label="Selecione um parceiro" value="" />
            {partners.map((partnerItem) => (
                <Picker.Item
                    key={partnerItem.codParceiro}
                    label={partnerItem.nome}
                    value={partnerItem.codParceiro}
                />
            ))}
        </Picker>

        {/* Botão para enviar a transferência */}
        <TouchableOpacity style={styles.button} onPress={handleTransfer}>
            <Text style={styles.buttonText}>Transferir</Text>
        </TouchableOpacity>

        {/* Botão para acessar o histórico de transações */}
        <TouchableOpacity style={styles.historyButton} onPress={() => navigation.navigate("HistoricoTransacoes")}>
            <Text style={styles.historyButtonText}>Histórico de Transações</Text>
        </TouchableOpacity>
        {/* Modal de confirmação */}
        <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isModalVisible}
                        onRequestClose={() => setIsModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalText}>Confirma a transferência de {pontos} pontos para o parceiro selecionado?</Text>

                                <View style={styles.modalButtons}>
                                    <TouchableOpacity
                                        style={styles.modalButton}
                                        onPress={() => confirmTransfer(partner, pontos)}>
                                            <Text style={styles.modalButtonText}>Confirmar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.modalButton, { backgroundColor: '#ccc' }]}
                                        onPress={() => setIsModalVisible(false)}
                                    >
                                        <Text style={styles.modalButtonText}>Cancelar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
    </View>
</>
        );
    }

}

export default Transacao;