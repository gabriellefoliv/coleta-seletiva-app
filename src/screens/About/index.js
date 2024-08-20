//IMPORTS
import React, { useState, useEffect } from 'react'
import {
    View, Text,
    TouchableOpacity, Modal,
    Image, StatusBar, ScrollView, ImageBackground,
} from 'react-native'

import { useAuth } from '../../contexts/auth'
import { COLORS, FONTS, icons, images, SIZES } from '../../constants'
import LocalStyles from './styles.js'
import api from '../../services/api.js'
import Config from '../../config/config'
import ConversaoPontos from '../ConversaoPontos/index.js';

import WhiteBg from '../../assets/images/whiteBg.jpg'
import logo from '../../assets/images/logo.png';

import Termos from '../../assets/icons/Termos.png'
import about2 from '../../assets/icons/about2.png'
import devs from '../../assets/icons/devs.png'

import Footer from '../../components/Footer'

//MAIN
export default function ({ navigation }) {

    //#region CONSTANTES
    const { user, signOut } = useAuth()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleQrModal = () => setIsModalVisible(() => !isModalVisible);
    const [lstRanking, setLstRanking] = useState([{ usuario: 'carregando' }]);
    const [kgReciclados, setKgReciclados] = useState(0)
    const [userPoints, setUserPoints] = useState(0);
    const [load, setLoad] = useState(true)

    const handleSignOut = () => {
        signOut();
    }

    const setHomeVariables = (contents) => {
        //console.log(contents),
        //setLstRanking(contents[0]),
        //setKgReciclados(contents[1]),
        //setUserPoints(contents[2].pontos)
    }

    const init = async () => {
        try {
            const contents = await api.get("http://" + Config.apiBaseURL + "/users/ranking/")
                .then((response) => {
                    return response.data.response.Ranking
                })
                .catch((err) => {
                    console.error("ops! ocorreu um erro" + err);
                });

            const quilos = await api.get("http://" + Config.apiBaseURL + "/coletas/getquilos/" + user.id)
                .then((response) => {
                    return response.data.result[0].totalReciclado
                })
                .catch((err) => {
                    console.error("ops! ocorreu um erro" + err);
                });

            const userData = await api.get("http://" + Config.apiBaseURL + "/users/data/" + user.id)
                .then((response) => {
                    return response.data.response.UserData[0]
                })
                .catch((err) => {
                    console.error("ops! ocorreu um erro" + err);
                });
            return [contents, quilos, userData]
        }
        catch (err) {
            console.log(err)
        }
    }
    //#endregion

    //#region USE EFFECT
    // useEffect(() => {
    //     navigation.addListener('focus', async () => setLoad(!load))
    //     init().then(
    //         contents => setHomeVariables(contents)
    //     )
    // }, [load, navigation]);
    //#endregion

    return (
        <>
            <ImageBackground //Buttons
                source={WhiteBg}
                style={LocalStyles.whiteBg}>

                <ScrollView
                    horizontal={false}
                    style={LocalStyles.aboutButtonsContainer}>

                    <View style={LocalStyles.buttonsArea}>
                        <TouchableOpacity //TERMOS DE USO
                            style={LocalStyles.menuButtons}
                            onPress={() => { navigation.navigate('UseTerms') }}>
                            <Image
                                source={Termos}
                                style={{
                                    width: '40%',
                                    height: '60%',
                                }}
                                resizeMode='contain'
                            />
                            <Text style={LocalStyles.menuButtonText}>
                                Termos de uso
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity //SOBRE
                            style={LocalStyles.menuButtons}
                            onPress={() => { navigation.navigate('Sobre') }}>
                            <Image
                                source={about2}
                                style={{
                                    width: '40%',
                                    height: '60%',
                                }}
                                resizeMode='contain'
                            />
                            <Text style={LocalStyles.menuButtonText}>
                                Sobre
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={LocalStyles.menuButtons}
                            onPress={() => { navigation.navigate('Desenvolvedores') }}>
                            <Image
                                source={devs}
                                style={{
                                    width: '40%',
                                    height: '60%',
                                }}
                                resizeMode='contain'
                            />
                            <Text style={LocalStyles.menuButtonText}>
                                Desenvolvedores
                            </Text>
                        </TouchableOpacity>



                    </View>

                </ScrollView>

                <Image source={logo} style={LocalStyles.logo} />

            </ImageBackground>

            <Footer navigation={navigation} init={init} />

        </>
    );
}

/*
<TouchableOpacity
                        style={LocalStyles.menuButtons}
                        onPress={()=>{navigation.navigate('Reciclotron')}}>
                        <Image
                            source={icons.about2}
                            style={{
                                width: '40%',
                                height: '60%',
                            }}
                            resizeMode='contain'
                        />
                        <Text style={LocalStyles.menuButtonText}>
                            Debbuging
                        </Text>
                    </TouchableOpacity>
*/