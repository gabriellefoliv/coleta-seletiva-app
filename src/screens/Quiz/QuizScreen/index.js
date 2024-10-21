import { useRoute } from "@react-navigation/native"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/auth";
import { api } from "../../../lib/axios";
import { TouchableOpacity, Modal, Text, View } from "react-native";
import { styles } from "./style";
import Header from "../../../components/Header";
import LottieView from "lottie-react-native";

const QuizScreen = ({ navigation }) => {
    const route = useRoute();
    const { dificuldade } = route.params;
    const { user } = useContext(AuthContext);
    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState({ show: false, message: '', descricao_resposta: '', pontos: 0 })

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await api.get(`/quiz?codCliente=${user.codCliente}&dificuldade=${dificuldade}`);
                setQuestion(response.data);
                console.log(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Erro ao carregar pergunta", error);
            }
        };
        fetchQuestion();
    }, [dificuldade, user.codCliente]);

    const handleAnswer = async (resposta) => {
        try {
            const response = await api.post(`/quiz/${question.codPergunta}`, {
                codCliente: user.codCliente,
                resposta
            });

            setModal({
                show: true,
                message: response.data.message,
                descricao_resposta: response.data.descricao_resposta,
                pontos: response.data.pontos || 0
            })
        } catch (error) {
            console.error("Erro ao enviar resposta.", error);
        }
    }

    const handleCloseModal = () => {
        setModal({ ...modal, show: false });
        navigation.navigate('Home');
    }

    if (loading) return <Text>Carregando pergunta...</Text>

    return (<>
        <Header title="Pergunta" />
        <View style={styles.container}>
            <Text style={styles.questionText}>{question.descricao_pergunta}</Text>
            <TouchableOpacity style={styles.button} onPress={() => handleAnswer(1)}>
                <Text style={styles.buttonText}>Verdadeiro</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleAnswer(0)}>
                <Text style={styles.buttonText}>Falso</Text>
            </TouchableOpacity>

            <Modal visible={modal.show} transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>{modal.message}</Text>
                        {modal.pontos > 0 ? (<>
                            <Text style={styles.modalPoints}>Você ganhou {modal.pontos} pt(s).</Text>
                            <LottieView
                                autoPlay
                                style={{
                                    width: 150,
                                    height: 150,
                                }}
                                source={require('../../../assets/quiz/correctanswer.json')}
                            />
                        </>
                        ) : (
                            <LottieView
                                autoPlay

                                style={{
                                    width: 150,
                                    height: 150,
                                }}
                                source={require('../../../assets/quiz/incorrect.json')}
                            />
                        )}
                        <Text style={styles.modalText}>{modal.descricao_resposta}</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={handleCloseModal}>
                            <Text style={styles.buttonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    </>
    )
}

export default QuizScreen;