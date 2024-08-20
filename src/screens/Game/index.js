//IMPORTS
import React, { useState, useEffect } from 'react'
import {
    View, Text,
    TouchableOpacity, Modal,
    Image, StatusBar, ScrollView, ImageBackground,
} from 'react-native'

import { useAuth } from '../../contexts/auth'
import { COLORS, FONTS, icons, images, SIZES } from '../../constants'
//import LocalStyles from './styles.js'
import api from '../../services/api.js'
import Config from '../../config/config'
import apireciclotron from "../../services/apireciclotron";
//import News from '../NewsScreen'
// import Footer from '../Footer/index'
import Planta from '../Planta/index'


//MAIN
export default function ({ navigation }) {

    //#region CONSTANTES
    const { user, signOut } = useAuth()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleQrModal = () => setIsModalVisible(() => !isModalVisible);
    const [lstRanking, setLstRanking] = useState([{ usuario: 'carregando' }]);
    const [kgReciclados, setKgReciclados] = useState(0)
    const [userPoints, setUserPoints] = useState(0);
    const [load, setLoad] = useState(true);
    const [reciclotron_json, set_reciclotron_json] = useState();
    const [hora, setHora] = useState(2);
    const [timeparam, settimeparam] = useState(400);

    const handleSignOut = () => {
        signOut();
    }

    const setHomeVariables = (contents) => {
        //console.log(contents),
        //setLstRanking(contents[0]),
        //setKgReciclados(contents[1]),
        //setUserPoints(contents[2].pontos)

        //setNumFases(contents[0][0]),
        //duvida helio 
        //O que vem em contents?
    }

    const renderPlanta = () => {

        useEffect(() => {
            const intervalId = setInterval(() => {
                setHora(prevHora => (prevHora + 2) % 24);
            }, timeparam);

            return () => clearInterval(intervalId);
        }, []);

        if (hora >= 0 && hora < 6) {
            return images.planta0;
        } else if (hora >= 6 && hora < 12) {
            return images.planta1;
        } else if (hora >= 12 && hora < 18) {
            return images.planta2;
        } else if (hora >= 18 && hora < 24) {
            return images.planta4;
        }
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
            const reciclotron = await apireciclotron
                .post("https://reciclopontos.com.br/api/partner_rate.php", {
                    partner: 23052116000108,
                    token: "906007c7b743ac1ef7a6247d0",
                    CNPJ: 28523215000106,
                    description: "Conversão de Pontos em Reciclopontos",
                    points: 1000,
                    autonum: "75883410",
                })
                .then((response) => {
                    set_reciclotron_json(response.data);
                    console.log(response.data)
                })
                .catch((err) => {
                    console.error(err)
                });

            return [contents, quilos, userData]
        }
        catch (err) {
            console.log(err)
        }
    }
    //#endregion

    //#region USE EFFECT
    useEffect(() => {
        navigation.addListener('focus', async () => setLoad(!load))
        init().then(
            contents => setHomeVariables(contents)
        )
    }, [load, navigation]);
    //#endregion

    return (
        <>

            <Planta />

            {/* <Footer navigation={navigation} init={init} /> */}


        </>
    );
}