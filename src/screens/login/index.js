import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StatusBar, KeyboardAvoidingView, Image, TouchableOpacity  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../../lib/axios';
import LocalStyles from './styles';
import logoNova from '../../assets/images/logoNova.png';
import userGray from '../../assets/icons/userGray.png';
import passwordGray from '../../assets/icons/passwordGray.png';

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
        <KeyboardAvoidingView style= {LocalStyles.container} 
        behavior={"padding"}
        keyboardVerticalOffset={0}
        enabled={false} /*View principal de trás*/ >
        <View style={{flex: 1}}>
            
            <StatusBar translucent={true} backgroundColor={'transparent'} />
        
            <View style = {LocalStyles.topContainer} /* Quadrado de cima (fundo)*/>
                <View style={{flex: 1,alignItems: 'center',}} /* itens da frente */>
                    
                    <View //cabeçalho
                        style={LocalStyles.cabecalho}>
                            <Text style={LocalStyles.title}>
                                
                            </Text>
                            <Image
                                source={logoNova}
                                style={LocalStyles.logo}
                            />
                    </View>
                    
                    <View //card de login
                        style={LocalStyles.loginCard}>
                            <Text style = {LocalStyles.subTitle}>Login</Text>

                            <Text style = {LocalStyles.description}>
                                Entre com seu email
                            </Text>
                            
                            <View style={LocalStyles.textSection}>
                                <Image
                                    source={userGray}
                                    resizeMode='contain'
                                    style={LocalStyles.imageIcon}
                                />
                                <TextInput 
                                    value={email}
                                    onChangeText={setEmail}
                                    style={LocalStyles.textInput}
                                    placeholder='Seu email' //Breve logar com usuário ou email também
                                    placeholderTextColor = '#5c5c5c'
                                />
                            </View>

                            <View style={LocalStyles.textSection}>
                                <Image
                                    source={passwordGray}
                                    resizeMode='contain'
                                    style={LocalStyles.imageIcon}
                                />

                                <TextInput 
                                    value={password}
                                    onChangeText={setPassword}
                                    style={LocalStyles.textInput}
                                    placeholder='Sua senha'
                                    placeholderTextColor = '#5c5c5c'
                                    secureTextEntry={true}
                                />
                            </View>

                            <TouchableOpacity 
                                onPress={handleLogin}
                                style={LocalStyles.btnEntrar}>
                                    <Text style={LocalStyles.btnText}>
                                    Entrar
                                    </Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => navigation.navigate('SignIn')}
                                style={LocalStyles.btnRegistrar}>
                                    <Text style={LocalStyles.btnRegistrarText}>
                                    Registrar
                                    </Text>
                            </TouchableOpacity>
                    </View>

                    
                    
                </View>
                
            </View>
            </View>
            <View style = {LocalStyles.bottom}>
                        <Text style = {{ color: '#000'}}>
                            Sigcol Residuos © 2021
                        </Text>
                    </View>
        </KeyboardAvoidingView>
    );
}
