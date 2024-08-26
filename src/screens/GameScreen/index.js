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
import apireciclotron from "../../services/apireciclotron";

import CountdownTimer from '../../components/CountdownTimer/CountdownTimer'

//MAIN
export default function({navigation}){

    //#region CONSTANTES
    const {user, signOut} = useAuth()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleQrModal = () => setIsModalVisible(() => !isModalVisible);
    const [lstRanking, setLstRanking] = useState([{usuario: 'carregando'}]);
    const [kgReciclados, setKgReciclados] = useState(0)
    const [userPoints,setUserPoints] = useState(0);
    const [load, setLoad] = useState(true);
    const [reciclotron_json, set_reciclotron_json] = useState();
    
    const handleSignOut = () => {
        signOut();
    }

    const setHomeVariables =(contents) =>{
        //console.log(contents),
        //setLstRanking(contents[0]),
        //setKgReciclados(contents[1]),
        //setUserPoints(contents[2].pontos)
        //setNumFases(contents[0][0]),
        //duvida helio 
        //O que vem em contents?
    }

    const renderPlanta = () => {
        const hora = new Date().getHours()
        //const hora = 20
        if (hora >= 0 && hora < 6){
            return images.planta0;
        } else if (hora >= 6 && hora < 12){
            return images.planta1;
        } else if (hora >= 12 && hora < 18){
            return images.planta2;
        } else {
            return images.planta3;
        }
    }

    const init = async() => {
        try{
            const contents = await  api.get("http://"+Config.apiBaseURL+"/users/ranking/")
                                        .then((response)=>{
                                            return response.data.response.Ranking
                                        })
                                        .catch((err) => {
                                            console.error("ops! ocorreu um erro" + err);
                                        });
        
            const quilos = await  api.get("http://"+Config.apiBaseURL+"/coletas/getquilos/"+user.id)
                                        .then((response)=>{
                                            return response.data.result[0].totalReciclado
                                        })
                                        .catch((err) => {
                                            console.error("ops! ocorreu um erro" + err);
                                        });

            const userData = await api.get("http://"+Config.apiBaseURL+"/users/data/"+user.id)
                                        .then((response)=>{
                                            return response.data.response.UserData[0]
                                        })
                                        .catch((err) => {
                                            console.error("ops! ocorreu um erro" + err);
                                        });
            const reciclotron = await apireciclotron
                                        .post("https://reciclopontos.com.br/api/partner_rate.php",{
                                            partner: 23052116000108,
                                            token: "906007c7b743ac1ef7a6247d0",
                                            CNPJ: 28523215000106,
                                            description: "Conversão de Pontos em Reciclopontos",
                                            points: 1000, 
                                            autonum: "75883410",
                                        })
                                        .then((response)=> {
                                            set_reciclotron_json(response.data);
                                            console.log(response.data)
                                        })
                                        .catch((err) => {
                                            console.error(err)
                                        });
            
            return [contents,quilos,userData]
        }
        catch(err){
            console.log(err)
        }
    }
    //#endregion
    
    //#region USE EFFECT
    useEffect(() => {
        navigation.addListener('focus', async ()=>setLoad(!load))
        init().then(
            contents=> setHomeVariables(contents)
        )
    }, [load,navigation]);
    //#endregion

    return (
        <>
        <ImageBackground                                                //GAME
                source={images.demoGame}
                style={LocalStyles.bg}>
                <ScrollView horizontal={false} style={LocalStyles.gameContainer}>   
                    <View 
                    style = {LocalStyles.gameButtonsArea} /** Botoes */>
                    <TouchableOpacity //PLANTA
                        //onPress={()=>{navigation.navigate('Dashboard')}}
                        //Dúvida Hélio
                        //Desligar efeito de esmaecer ao clicar até que tal condição seja realizada   1666219000000
                        style={LocalStyles.planta}>
                            
                            <Image
                                source={renderPlanta()} //ao invés de images.planta4 coloca o nome da constante //duvida helio
                                style={{
                                    width: '70%',
                                    height: '70%',
                                    left: 20,
                                    top: 70,
                                }}
                                resizeMode='contain'
                            >
                            </Image>
                            
                            <CountdownTimer countdownTimeStampMs = { 1666219000000 
                            /*
                            Pegar o horario atual de uma API!

                            You need the current timestamp in milliseconds.
                            Right now that would be: 1634841561404
                            Then you need to add the amount of milliseconds in 48 hours. So:
                            48h * 60min * 60sec * 1000millisecond -> 172800000 milliseconds
                            So the timestamp should be:
                            1634841561404 + 172800000
                             */
                            }></CountdownTimer>   
                    </TouchableOpacity>

                    <TouchableOpacity //REGADOR
                        //onPress={()=>{navigation.navigate('Dashboard')}}
                        style={LocalStyles.gameButtons}>
                            <Image
                                source={icons.regador}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    left: 160,
                                    top: 100,
                                }}
                                resizeMode='contain'
                            />
                    </TouchableOpacity>

                    <TouchableOpacity //PA
                        //onPress={()=>{navigation.navigate('Dashboard')}}
                        style={LocalStyles.gameButtons}>
                            <Image
                                source={icons.pa}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    left: 160,
                                    top: 160,
                                }}
                                resizeMode='contain'
                            />
                    </TouchableOpacity>
                    
                    </View>
                </ScrollView>
        </ImageBackground>

        <ImageBackground                                                //NOTÍCIAS
                source={images.whiteBg}
                style={LocalStyles.foot
                /*
                https://github.com/twitterdev/Twitter-API-v2-sample-code
                https://www.youtube.com/watch?v=1KwbjY_5qYU&ab_channel=yoursTRULY
                 */
                }>
            
        <ScrollView                                                     //Botões do footer
            horizontal={false}
            style={LocalStyles.container
            }>   
            
            <View
            style = {LocalStyles.footButtonsArea} /** Botoes */>
                <TouchableOpacity
                    onPress={()=>{navigation.navigate('Dashboard')}}
                    style={LocalStyles.footButtons}>
                    <Image
                        source={icons.home}
                        style={{
                            width: '33%',
                            height: '60%',
                            left: 35,
                        }}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>{navigation.navigate('Game')}}
                    style={LocalStyles.footButtons}>
                    <Image
                        source={icons.game}
                        style={{
                            width: '33%',
                            height: '60%',
                            left: 35,
                        }}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>{navigation.navigate('About')}}
                    style={LocalStyles.footButtons}>
                    <Image
                        source={icons.about}
                        style={{
                            width: '33%',
                            height: '60%',
                            left: 35,
                        }}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
                
            </View>
            
        </ScrollView>

        </ImageBackground>
        </>
    );
}