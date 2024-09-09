import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../lib/axios';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return;
        }

        try {
            const response = await api.post('/login', {
                email,
                password,
            });

            const { token } = response.data;

            // Persistindo o token no AsyncStorage
            await AsyncStorage.setItem('token', token);

            // Navegar para a tela inicial ou qualquer outra
            navigation.navigate('Home');
        } catch (error) {
            Alert.alert('Erro', 'Credenciais inválidas');
        }
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
                onPress={() => navigation.navigate('SignIn')}
            />
        </View>
    );
}
