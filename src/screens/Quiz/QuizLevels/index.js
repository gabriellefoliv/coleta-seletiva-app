import React, { useContext } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../../../context/auth';
import { styles } from './style';
import Header from '../../../components/Header';
import { api } from '../../../lib/axios';

export const QuizLevels = ({ navigation }) => {
    const { user } = useContext(AuthContext);

    const handleLevelClick = async (dificuldade) => {
        try {
            console.log(`Verificando perguntas: codCliente=${user.codCliente}, dificuldade=${dificuldade}`);

            const response = await api.get(`/quiz?codCliente=${user.codCliente}&dificuldade=${dificuldade}`);
            navigation.navigate("QuizScreen", { dificuldade });

        } catch (error) {
            if (error.response && error.response.status === 404 && error.response.data.message === "Sem perguntas disponíveis para o nível selecionado.") {
                Alert.alert("Atenção", "Não há perguntas disponíveis para este nível.");
            } else {
                console.error("Erro ao verificar perguntas disponíveis", error);
                Alert.alert("Erro", "Houve um problema ao carregar as perguntas. Tente novamente mais tarde.");
            }
        }
    };


    return (
        <>
            <Header title="Dificuldades" />
            <View style={styles.container}>
                <Text style={styles.title}>Escolha o nível do quiz</Text>
                <TouchableOpacity style={styles.button} onPress={() => handleLevelClick('facil')}>
                    <Text style={styles.buttonText}>Fácil</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleLevelClick('medio')}>
                    <Text style={styles.buttonText}>Médio</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleLevelClick('dificil')}>
                    <Text style={styles.buttonText}>Difícil</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}