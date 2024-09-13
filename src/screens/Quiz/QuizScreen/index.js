import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Header from '../../../components/Header';
import { styles } from './style';

const QuizScreen = ({ route }) => {
    const { level } = route.params;
    const [answer, setAnswer] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handleAnswer = (selectedAnswer) => {
        setAnswer(selectedAnswer);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Header title="Pergunta" />
            <View style={styles.quizContainer}>
                <Text style={styles.levelText}>Nível: {level}</Text>
                <Text style={styles.question}>O desmatamento contribui para o aquecimento global?</Text>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.optionButton} onPress={() => handleAnswer(true)}>
                        <Text style={styles.optionText}>Verdadeiro</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.optionButton} onPress={() => handleAnswer(false)}>
                        <Text style={styles.optionText}>Falso</Text>
                    </TouchableOpacity>
                </View>


                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={closeModal}
                >
                    <View style={styles.modalView}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>
                                {answer ? 'Correto! O desmatamento aumenta o aquecimento global.' : 'Errado! Na verdade, o desmatamento aumenta o aquecimento global.'}
                            </Text>

                            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                                <Text style={styles.closeButtonText}>Fechar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
};


export default QuizScreen;
