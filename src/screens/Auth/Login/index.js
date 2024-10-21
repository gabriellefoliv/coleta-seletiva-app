import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StatusBar, KeyboardAvoidingView, Image, TouchableOpacity, Platform } from 'react-native';
import LocalStyles from './style';
import logoNova from '../../../assets/images/logoNova.png';
import userGray from '../../../assets/icons/userGray.png';
import passwordGray from '../../../assets/icons/passwordGray.png';
import { AuthContext } from '../../../context/auth';
import Feather from '@expo/vector-icons/Feather';

export default function Login({ navigation }) {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(true)

    const handleLogin = () => {
        if (email && senha) {
            console.log('Dados de login enviados:', { email, senha });
            login({ email, senha });
            navigation.replace('Home');
        } else {
            console.error('Por favor, preencha todos os campos.');
        }
    };

    return (
        <KeyboardAvoidingView
            style={LocalStyles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            enabled={true} >
            <View style={{ flex: 1 }}>

                <StatusBar translucent={true} backgroundColor={'transparent'} />

                <View style={LocalStyles.topContainer} /* Quadrado de cima (fundo)*/>
                    <View style={{ flex: 1, alignItems: 'center', }} /* itens da frente */>

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
                            <Text style={LocalStyles.subTitle}>Login</Text>

                            <Text style={LocalStyles.description}>
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
                                    placeholderTextColor='#5c5c5c'
                                />
                            </View>

                            <View style={LocalStyles.textSection}>
                                <Image
                                    source={passwordGray}
                                    resizeMode='contain'
                                    style={LocalStyles.imageIcon}
                                />

                                <TextInput
                                    value={senha}
                                    onChangeText={setSenha}
                                    style={LocalStyles.textInput}
                                    placeholder='Sua senha'
                                    placeholderTextColor='#5c5c5c'
                                    secureTextEntry={passwordVisible}
                                />
                                <Feather
                                    size={22}
                                    name={passwordVisible ? 'eye' : 'eye-off'}
                                    color='#5c5c5c'
                                    style={{ marginRight: 10 }}
                                    onPress={() => setPasswordVisible(!passwordVisible)}
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
                                onPress={() => navigation.navigate('SignUp')}
                                style={LocalStyles.btnRegistrar}>
                                <Text style={LocalStyles.btnRegistrarText}>
                                    Registrar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <View style={LocalStyles.bottom}>
                <Text style={{ color: '#000' }}>
                    Sigcol Residuos © 2021
                </Text>
            </View>
        </KeyboardAvoidingView>
    );
}