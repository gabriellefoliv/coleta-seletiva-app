import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { api } from '../../lib/axios';

export default function RegisterStep({ qrCodeData, onRegisterSuccess }) {
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const handleRegister = async () => {
        if (!cpf || !password || !email || !name) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return;
        }

        try {
            const response = await api.post('/register', {
                step: 'completeRegistration',
                name,
                cpf,
                password,
                email,
                qrCode: qrCodeData // Passar o QRCode como ID
            });

            Alert.alert('Sucesso', 'Cadastro realizado com sucesso! Faça login.');
            onRegisterSuccess();
        } catch (error) {
            Alert.alert('Erro', 'Erro ao cadastrar. Tente novamente.');
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text>Nome</Text>
            <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Seu nome"
                style={{ borderBottomWidth: 1, marginBottom: 20 }}
            />
            <Text>CPF</Text>
            <TextInput
                value={cpf}
                onChangeText={setCpf}
                placeholder="Seu CPF"
                keyboardType="numeric"
                style={{ borderBottomWidth: 1, marginBottom: 20 }}
            />
            <Text>E-mail</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Seu e-mail"
                keyboardType="email-address"
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
            <Button title="Cadastrar" onPress={handleRegister} />
        </View>
    );
}
