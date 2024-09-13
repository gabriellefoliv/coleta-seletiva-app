import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../../components/Header';
import { styles } from './style';

const QuizLevels = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Header title="Quiz Ambiental" />
            <View style={styles.quizContainer}>
                <TouchableOpacity
                    style={styles.levelButton}
                    onPress={() => navigation.navigate('QuizScreen', { level: 'fácil' })}
                >
                    <Text style={styles.levelText}>Fácil</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.levelButton}
                    onPress={() => navigation.navigate('QuizScreen', { level: 'médio' })}
                >
                    <Text style={styles.levelText}>Médio</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.levelButton}
                    onPress={() => navigation.navigate('QuizScreen', { level: 'difícil' })}
                >
                    <Text style={styles.levelText}>Difícil</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};



export default QuizLevels;
