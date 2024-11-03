import { useCallback, useContext, useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Entypo, FontAwesome5, FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from "../../context/auth";
import { api } from "../../lib/axios";
import { styles } from "./style";
import QRCode from "react-native-qrcode-svg";
import Header from "../../components/Header";

const Home = ({ navigation }) => {
    const { user } = useContext(AuthContext);
    const [pontos, setPontos] = useState(0);
    const [position, setPosition] = useState([]);
    const [coleta, setColeta] = useState([]);

    const handleAccessQuiz = async () => {
        if (!user || !user.codCliente) {
            Alert.alert('Erro', 'Usuário não autenticado. Por favor, faça login.');
            return;
        }

        try {
            const hoje = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
            const response = await api.get(`/quizAccess`, { params: { codCliente: user.codCliente, dataResposta: hoje } });

            if (response.data && response.data.length > 0) {
                Alert.alert(' Volte amanhã!', 'Você já respondeu ao quiz hoje.');
            } else {
                navigation.navigate('QuizLevels');
            }
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro ao acessar o quiz. Tente novamente.');
            console.error("Erro ao acessar o quiz: ", error);
        }
    };

    const fetchTotalPontos = async () => {
        if (user && user.codCliente) {
            try {
                const response = await api.get(`/pontos/${user.codCliente}`);
                setPontos(response.data[0].totalPontos); // Atribui os pontos do cliente logado
            } catch (error) {
                console.error("Erro ao carregar os pontos: ", error);
            }
        }
    };

    const fetchPosition = async () => {
        try{
            const response = await api.get(`/ranking/${user.codCliente}`);
            setPosition(response.data.position);
        } catch (error) {
            console.error("Erro ao carregar a posição", error);
        }
    }

    const fetchColeta = async () => {
        try{
            const response = await api.get(`/coletaTotal/${user.codCliente}`);
            setColeta(response.data[0].totalPeso);
        } catch (error) {
            console.error("Erro ao carregar a posição", error);
            if (error.status === 404){
                setColeta(0);
            } 
        }
    }

    const fetchPontos = useCallback(async () => {
        if (user && user.codCliente) {
            try {
                const response = await api.get(`/ranking`, {
                    params: { codCliente: user.codCliente }
                });

                // Filtrar o cliente correto dentro da resposta
                const cliente = response.data.find(cliente => cliente.codCliente === user.codCliente);

                if (cliente) {
                    setPontos(cliente.total_pontos); // Atribui os pontos do cliente logado
                } else {
                    console.warn('Cliente não encontrado na resposta');
                }
            } catch (error) {
                console.error("Erro ao carregar os pontos: ", error);
            }
        }
    }, [user]);

    useFocusEffect(
        useCallback(() => {
            fetchTotalPontos();
        }, [user])
    );

    useFocusEffect(
        useCallback(() => {
            fetchPosition();
        }, [user])
    );

    useFocusEffect(
        useCallback(() => {
            fetchColeta();
        }, [user])
    );


    if (!user) {
        return <Text>Carregando...</Text>;
    }

    return (
        <>
            <Header title={`Olá, ${user.nome}`} showBackButton={false} />
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <View>
                        <Text style={styles.topText}>Pontos : {pontos} pts</Text>
                        <Text style={styles.topText}>Total Coletado : {coleta} kg</Text>
                        <Text style={styles.topText}>Posição no Ranking : {position}º</Text>
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity style={styles.quizButton} onPress={() => navigation.navigate("Ranking")}>
                        <FontAwesome5 size={22} name="trophy" color="#00907a" />
                        <Text style={styles.quizTitle}>Ranking</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.quizButton} onPress={handleAccessQuiz}>
                        <MaterialIcons name="quiz" size={22} color="#00907a" />
                        <Text style={styles.quizTitle}>Acessar Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.quizButton} onPress={() => navigation.navigate("Plant")}>
                        <FontAwesome6 size={22} name="plant-wilt" color="#00907a" />
                        <Text style={styles.quizTitle}>Planta</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.quizButton} onPress={() => navigation.navigate("HistoricoColetas")}>
                        <FontAwesome5 size={22} name="history" color="#00907a" />
                        <Text style={styles.quizTitle}>Histórico de Coletas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.quizButton} onPress={() => navigation.navigate("Transacao")}>
                        <Entypo size={22} name="credit" color="#00907a" />
                        <Text style={styles.quizTitle}>Transferência</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default Home;