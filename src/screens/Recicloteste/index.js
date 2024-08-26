//IMPORTS
import React, {useState, useEffect }  from 'react'
import { View, Text,
         TouchableOpacity , Modal,
         Image, StatusBar, ScrollView, ImageBackground,} from 'react-native'
         
import {useAuth} from '../../contexts/auth'
import {COLORS,FONTS, icons, images, SIZES} from '../../constants'
import LocalStyles from './styles.js'
import api from '../../services/api.js'
import Config from '../../config/config'

//MAIN
export default function({navigation}){

    //#region CONSTANTES
    const {user, signOut} = useAuth()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleQrModal = () => setIsModalVisible(() => !isModalVisible);
    const [load, setLoad] = useState(true);
    const [resposta, getResposta] = useState();

    //#endregion

    //#region USE EFFECT
    useEffect(() => {
        api
            .post("https://reciclopontos.com.br/api/partner_rate.php", {
                partner:23052116000108,
                token: "1a54b68b80f5131404d0051406be6a6d",
                cpf: "923.154.633-82",
                description: "Conversão de Pontos em Reciclopontos",
                points: 1000,
                autonum: "75883410"
            })
            .then((response) =>{
                    getResposta(response.data)//getResposta(response.data.response.result)
                })
            .catch((err) => {
                console.error("Erro:" + err)
            })
    }, [load,navigation]);
    //#endregion

    return (
        <div className="App">
                <p>Usuário: {resposta.credited}</p>
                <p>Biografia: {resposta.rate}</p>
        </div>
    );
}



/*
import React, {useState, useEffect }  from 'react'
//import apiR from 'C:\TCC\ColetaPremiada\src\pages\Teste Reciclotron\api.js'
import {useAuth} from '../../contexts/auth'

//testar com variaveis arbitrarias dps puxar do programa
export default function reciclotron(){
    const {partner, setPartner} = useState()
    const {token, setToken} = useState()
    const {cpf, setCpf} = useState()
    const {description, setDescription} = useState()
    const {point, setPoints} = useState()
    const {autonum, setAutonum} = useState()
}

useEffect( () => {
    api.get("https://reciclopontos.com.br/api/partner_rate.php")
    .then((response) =>{
        setColetas(response.data.response.result)
    })
})*/