import React, { useState, useEffect } from 'react'
import { View, Text, Modal, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native'
import LocalStyles from './style.js'
import api from '../../services/api.js'
import Config from '../../config/config'
import { COLORS, FONTS, SIZES } from '../../constants/theme.js'
//import { mask, unMask } from 'remask'
import {AntDesign} from '@expo/vector-icons'

export default function ({ navigation, route, }) {

    const [nome, setNome] = useState()
    const [usuario, setUsuario] = useState()
    const [cpf, setCpf] = useState()
    const [nomeUsuario, setNomeUsuario] = useState()
    const [quilos, setQuilos] = useState()
    const [scanError, setScanError] = useState(false)

    useEffect(() => {
        api.get("http://" + Config.apiBaseURL + "/users/data/" + route.params.idUsuario)
            .then((response) => {
                setNome(response.data.response.UserData[0].nome)
                setUsuario(response.data.response.UserData[0].id)
                setCpf(response.data.response.UserData[0].CPF)
                setNomeUsuario(response.data.response.UserData[0].usuario)
            }
            )
            .catch((err) => {
                //console.error("ops! ocorreu um erro USERS DATA" + err);
                setScanError(true)
            });
    }, []);

    const Registrar = () => {

        api.post("http://" + Config.apiBaseURL + "/coletas/addcoleta", {
            "id_usuario": usuario,
            "id_coletor": route.params.idColetor,
            "qtd_baldes": quilos,
            "pontos": quilos * 10

        })
            .then(
                api.patch("http://" + Config.apiBaseURL + "/clientes/addpontos/" + usuario + "/" + (quilos * 10)
                )
                    .then(
                        api.patch("http://" + Config.apiBaseURL + "/clientes/aptoQuiz/" + usuario + "/1")
                            .catch((err) => {
                                console.error("ops! ocorreu um erro APTOQUIZ" + err);
                            })
                    )
                    .catch((error) => {
                        console.error("ops! " + error);
                    })
            )
            .then(
                Alert.alert(
                    "Sucesso",
                    "Coleta realizada com sucesso"
                ),
                navigation.navigate('HomeColetor')
            )
            .catch((error) => {
                console.error("ops! ocorreu um erro ADD COLETA" + error);
            });
    }

    return (
        <View style={LocalStyles.container}>
            <View style={{ flex: 0.4, backgroundColor: COLORS.primary, width: '100%', borderBottomLeftRadius: 50, borderBottomRightRadius: 50 }}>
                <View>
                    <Modal visible={scanError}
                        transparent={true}
                        animationType='slide'
                        statusBarTranslucent={true}>
                        <View
                            style={{
                                backgroundColor: '#fff', borderRadius: 25,
                                height: '40%', width: '70%', position: 'absolute',
                                top: ((SIZES.height / 2) - SIZES.height * 0.2), right: ((SIZES.width / 2) - SIZES.width * 0.35),
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 4,
                                elevation: 5
                            }}>
                            <View
                                style={{ flex: 3 }}>
                                <View
                                    style={{ flex: 1, alignItems: 'center', paddingTop: 10 }}>
                                    <Text
                                        style={{ ...FONTS.h1 }}>
                                        Oops!
                                    </Text>
                                    <Text
                                        style={{ ...FONTS.body3, paddingTop: 10 }}>
                                        Você errou! Talvez na próxima...
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity
                                    style={{ backgroundColor: COLORS.primaryBtn, width: '40%', height: '50%', justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => { setScanError(false), navigation.navigate("HomeColetor") }}>
                                    <Text style={LocalStyles.bntOKText}>
                                        Ok
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </Modal>
                </View>
                <View style={{ height: '25%', width: '100%', flexDirection: 'row', paddingHorizontal: 10 }}>

                    <View style={{ width: '50%', flex: 1, justifyContent: 'center' }}>
                        <TouchableOpacity style={{ width: '20%', height: '100%', justifyContent: 'center' }}
                            onPress={() => navigation.navigate('HomeColetor')}
                            pressRetentionOffset={true}
                        >
                            <AntDesign name="arrowleft" style={{
                                color: COLORS.white,
                                fontSize: 20,
                                alignItems: 'stretch',
                            }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ alignItems: 'center', position: 'absolute', top: '15%', left: '50%' }}>
                    <Text style={{ ...FONTS.body3, color: COLORS.primaryTxt, position: 'relative', left: '-50%', marginBottom: '5%' }}>
                        Você escaneou o QR Code de:
                    </Text>
                    <Text style={{ ...FONTS.h1, color: COLORS.primaryTxt, position: 'relative', left: '-50%' }}>
                        {nome}
                    </Text>
                    <Text style={{ ...FONTS.body3, color: COLORS.primaryTxt, position: 'relative', left: '-50%' }}>
                        {nomeUsuario}
                    </Text>
                    <Text style={{ ...FONTS.body3, color: COLORS.primaryTxt, position: 'relative', left: '-50%', margin: '5%' }}>
                        {cpf}
                    </Text>

                </View>


            </View>

            <View style={{ width: '100%', flex: 0.7, alignItems: 'center' }}>
                <View style={{ height: '40%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ ...FONTS.h2, color: COLORS.gray }}>
                        Kgs coletados
                    </Text>
                </View>
                <View style={LocalStyles.textSection}>
                    <TextInput
                        placeholder="Kgs"
                        placeholderTextColor={COLORS.placeHolderTextColor}
                        onChangeText={text => setQuilos(text)}
                        keyboardType={"numeric"}
                    />
                </View>
            </View>


            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity style={{ backgroundColor: COLORS.primary, height: 35, width: 125, position: 'absolute', bottom: 40, borderRadius: 3, alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => Registrar()}>
                    <Text style={{ textAlign: 'center', color: 'white' }}>
                        Registrar Coleta
                    </Text>

                </TouchableOpacity>
            </View>

        </View>
    );


}