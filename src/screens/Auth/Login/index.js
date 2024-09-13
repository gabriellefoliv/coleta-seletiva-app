import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../../../lib/axios';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return;
        }

        navigation.navigate('Home');

        // try {
        //     const response = await api.post('/login', {
        //         email,
        //         password,
        //     });

        //     if (response && response.data) {
        //         const { token } = response.data;

        //         // Persistindo o token no AsyncStorage
        //         await AsyncStorage.setItem('token', token);

        //         // Navegar para a tela inicial ou qualquer outra
        //         navigation.navigate('Home');
        //     } else {
        //         Alert.alert('Erro', 'Resposta da API inválida');
        //     }
        // } catch (error) {
        //     console.log('Erro na requisição:', error);

        //     if (error.response && error.response.data) {
        //         console.log('Erro na resposta da API:', error.response.data);
        //         Alert.alert('Erro', error.response.data.error || 'Credenciais inválidas');
        //     } else {
        //         Alert.alert('Erro', 'Não foi possível conectar ao servidor. Tente novamente mais tarde.');
        //     }
        // }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text>Email</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Seu Email"
                style={{ borderBottomWidth: 1, marginBottom: 20 }}
            />
            <Text>Senha</Text>
            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Sua senha"
                secureTextEntry
                style={{ borderBottomWidth: 1, marginBottom: 20 }}
            />
            <Button title="Login" onPress={handleLogin} />
            <Button
                title="Cadastrar-se"
                onPress={() => navigation.navigate('SignUp')}
            />
        </View>
    );
}
