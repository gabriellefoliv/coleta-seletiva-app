import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native';
import { api } from '../../lib/axios';
import { StatusBar } from 'expo-status-bar';
import { COLORS, FONTS, SIZES } from '../../assets/theme';
import logoNova from '../../assets/images/logoNova.png';
import userGray from '../../assets/icons/userGray.png'


export default function RegisterStep({ qrCodeData, onRegisterSuccess }) {
    const [cpf, setCpf] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const formattedCpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos

    const handleRegister = async () => {
        if (!cpf || !senha || !email || !nome) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return;
        }

        const codClienteNumber = parseInt(qrCodeData, 10); // Garante que codCliente é um número inteiro

        console.log('Dados a serem enviados:', {
            codCliente: codClienteNumber,
            nome,
            cpf: formattedCpf, // Formata o CPF
            email,
            senha
        });

        try {
            const response = await api.post('/clientes/cadastro', {
                codCliente: codClienteNumber, // Envia o número inteiro
                nome,
                cpf: formattedCpf, // Envia o CPF formatado
                email,
                senha
            });

            console.log('Resposta da API:', response.data);

            Alert.alert('Sucesso', 'Cadastro realizado com sucesso! Faça login.');
            onRegisterSuccess();
        } catch (error) {
            console.error('Erro ao cadastrar:', error.response.data); // Log detalhado da resposta

            if (error.response) {
                const errorMessage = error.response.data.error;

                if (errorMessage.includes('CPF não encontrado')) {
                    Alert.alert('Erro', 'CPF inválido');
                } else if (errorMessage.includes('Email já cadastrado')) {
                    Alert.alert('Erro', 'Email já cadastrado no sistema.');
                } else {
                    Alert.alert('Erro', 'Erro ao cadastrar. Tente novamente.');
                }
            } else {
                Alert.alert('Erro', 'Erro ao cadastrar. Tente novamente.');
            }
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container}
            behavior={"padding"}
            enabled /*View principal de trás*/
        >
            <View style={{ flex: 1 }}>

                <StatusBar translucent={true} backgroundColor={'transparent'} />

                <View style={styles.topContainer} /* Quadrado de cima (fundo)*/>
                    <View style={{ flex: 1, alignItems: 'center', }} /* itens da frente */>
                        <View //card de login
                            style={styles.loginCard}>
                            <Text style={styles.subTitle}>Cadastro</Text>

                            <Text style={styles.description}>
                                Preencha seu nome, CPF, email e senha para finalizar o cadastro.
                            </Text>

                            <View style={styles.textSection}>

                                <Image
                                    source={userGray}
                                    resizeMode='contain'
                                    style={styles.imageIcon}
                                />

                                <TextInput
                                    value={nome}
                                    onChangeText={setNome}
                                    style={styles.textInput}
                                    placeholder='Nome'
                                    placeholderTextColor='#5c5c5c'
                                />
                            </View>

                            <View style={styles.textSection}>
                                <Image
                                    source={userGray}
                                    resizeMode='contain'
                                    style={styles.imageIcon}
                                />

                                <TextInput
                                    value={cpf}
                                    onChangeText={setCpf}
                                    style={styles.textInput}
                                    placeholder='CPF'
                                    placeholderTextColor='#5c5c5c'
                                />
                            </View>
                            <View style={styles.textSection}>
                                <Image
                                    source={userGray}
                                    resizeMode='contain'
                                    style={styles.imageIcon}
                                />

                                <TextInput
                                    value={email}
                                    onChangeText={setEmail}
                                    style={styles.textInput}
                                    placeholder='Email'
                                    placeholderTextColor='#5c5c5c'

                                />
                            </View>
                            <View style={styles.textSection}>
                                <Image
                                    source={userGray}
                                    resizeMode='contain'
                                    style={styles.imageIcon}
                                />

                                <TextInput
                                    value={senha}
                                    onChangeText={setSenha}
                                    style={styles.textInput}
                                    placeholder='Senha'
                                    placeholderTextColor='#5c5c5c'
                                    secureTextEntry={true}
                                />
                            </View>


                            <TouchableOpacity
                                onPress={handleRegister}
                                style={styles.btnRegistrar}>
                                <Text style={styles.btnRegistrarText}>
                                    Finalizar cadastro
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.bottom}>
                <Text style={{ color: '#000' }}>
                    Sigcol Residuos © 2021
                </Text>
            </View>

        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    topContainer: {
        width: 395,
        height: '65%',
        borderBottomStartRadius: 40,
        borderBottomEndRadius: 40,
        shadowColor: COLORS.black,
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 19,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',

    },


    loginCard: {

        position: 'absolute',
        bottom: -SIZES.height * 0.24,
        backgroundColor: COLORS.white,
        width: "90%",
        paddingHorizontal: 10,
        paddingTop: SIZES.height * 0.025,
        paddingBottom: SIZES.height * 0.045,
        borderRadius: 15,
        alignItems: 'center',

        shadowColor: COLORS.black,
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 19,
    },

    container: {
        flex: 1,
        width: 'auto',
        backgroundColor: COLORS.white,
        justifyContent: 'center',

    },

    textInput: {
        flex: 1,
        width: '90%',
        height: 40,
        backgroundColor: COLORS.textInputGray,
        color: '#000',
        paddingLeft: 5,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15
    },

    textInputError: {
        flex: 1,
        width: '90%',
        height: 40,
        backgroundColor: COLORS.textInputGray,
        borderBottomColor: COLORS.error,
        borderBottomWidth: 1,
        color: '#000',
        paddingLeft: 5,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15
    },

    textSection: {
        flex: 1,
        width: '90%',
        height: 40,
        backgroundColor: COLORS.textInputGray,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20

    },

    textSectionError: {
        flex: 1,
        width: '90%',
        height: 40,
        backgroundColor: COLORS.textInputGray,
        borderBottomColor: COLORS.error,
        borderBottomWidth: 0,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20

    },

    imageIcon: {
        height: 20,
        width: 20,
        marginLeft: 10,
        marginRight: 5
    },

    btnEntrar: {
        width: '90%',
        backgroundColor: COLORS.primaryBtn,
        borderRadius: 3,
        height: 40,
        justifyContent: 'center',
        marginBottom: 13,
    },

    btnRegistrar: {
        width: '90%',
        borderColor: COLORS.primaryBtn,
        borderWidth: 1.2,
        borderRadius: 3,
        height: 40,
        justifyContent: 'center',

    },

    btnRegistrarText: {
        textAlign: 'center',
        color: COLORS.primaryBtn,
    },

    btnText: {
        textAlign: 'center',
        color: 'white'
    },

    title: {
        color: COLORS.white,
        ...FONTS.h1,
        marginBottom: 0,

    },

    logo: {
        width: SIZES.width * 0.60,
        height: SIZES.width * 0.48,
    },

    subTitle: {
        ...FONTS.h2,
        color: COLORS.gray,
        paddingBottom: 5,
    },

    description: {
        ...FONTS.body3,
        color: COLORS.gray,
        paddingBottom: 15,
    },

    bottom: {
        //bottom: -SIZES.height*0.6, 
        width: '100%',
        //height: '10%', 
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 7
        //backgroundColor: '#4a4'
    }
})
