//IMPORTS
import React, {useState, useEffect }  from 'react'
import { View, Text,
         TouchableOpacity , Modal,
         Image, StatusBar, ScrollView, ImageBackground, Alert} from 'react-native'
         
import {useAuth} from '../../contexts/auth'
import {COLORS,FONTS, icons, images, SIZES} from '../../constants'
import LocalStyles from './styles.js'
import api from '../../services/api.js'
import Config from '../../config/config'

import Footer from '../Footer/index'

//MAIN
export default function({navigation}){

    //#region CONSTANTES
    const {user, signOut} = useAuth()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleQrModal = () => setIsModalVisible(() => !isModalVisible);
    const [lstRanking, setLstRanking] = useState([{usuario: 'carregando'}]);
    const [kgReciclados, setKgReciclados] = useState(0)
    const [userPoints,setUserPoints] = useState(0);
    const [load, setLoad] = useState(true)
    const [primeiraColetaFeita, setprimeiraColetaFeita] = useState(false)
    const [debugMode, setdebugMode] = useState(false);

    const handleSignOut = () => {
        signOut();
    }

    const setHomeVariables =(contents) =>{
        //console.log(contents),
        //setLstRanking(contents[0]),
        //setKgReciclados(contents[1]),
        //setUserPoints(contents[2].pontos)
    }

    const handleQuiz = () => {
        //setprimeiraColetaFeita(true)
        if (primeiraColetaFeita){
            navigation.navigate('HomeQuiz')
        }
        else {
            showAlert()
        }
    }

    const showAlert = () => {
        Alert.alert(
          'Atenção',
          'Você não pode acessar o quiz pois ainda não completou a quantidade de coleta necessária',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') }
          ]
        );
      };

    const init = async() => {
        setprimeiraColetaFeita(false)
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
        <ImageBackground                                                //<Bg <componentes> Bg>
            source={images.whiteBg}>
            <ScrollView horizontal={false} style={LocalStyles.container}>   
                
                <Modal  /*Componentização em volta do QR Code & QR Code*/
                        visible={isModalVisible} 
                        transparent = {false}
                        animationType='slide'
                        statusBarTranslucent= {true}>
                    <TouchableOpacity 
                        onPress={()=>handleQrModal()} 
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}} >

                        <Image /*qr Code*/
                            source={{uri:'https://api.qrserver.com/v1/create-qr-code/?size=600x600&data='+user.id+'&margin=20'}}
                            style={{width: '90%', height: '80%'}}
                            resizeMode='contain'  
                        />
                        <Text style={{color: COLORS.primaryDark, ...FONTS.h2}}>
                            QR Code de {user.nome}
                        </Text>
                        <Text style={{color: COLORS.primaryDark, ...FONTS.b3}}>
                            Clique para voltar
                        </Text>

                        {!debugMode && 
                            <View>
                                <TouchableOpacity 
                                onPress={()=>{
                                    setprimeiraColetaFeita(true)
                                }} >
                                    <Text style={{color: COLORS.primaryDark, ...FONTS.h2}}>
                                        Debudding: liberar primeira coleta
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        }
                                            
                    </TouchableOpacity>

                </Modal>

                <StatusBar translucent={true} backgroundColor={'transparent'} />

                <View //Header
                style={LocalStyles.topContainer}>
                
                    <View style={LocalStyles.header} /*header*/>
                        
                            <Text style={{...FONTS.h3, color: COLORS.white, paddingLeft: SIZES.width * 0.06, paddingTop: SIZES.height * 0.03}}>
                                Olá {user.nome}
                            </Text>


                        <TouchableOpacity style={{position: 'absolute', left: '90%'}} /*Botao de logout */
                            onPress={()=>handleSignOut()}
                        >
                            <Image
                                source={icons.logout}
                                style={LocalStyles.logoutButton}
                                resizeMode='contain'
                            />
                        </TouchableOpacity>

                    </View>

                    <View style = {{ width: '100%',flex: 4}}>

                        <View style = {LocalStyles.userDetailsArea} /* User Details */>

                            <View style = {LocalStyles.qrCodeArea} /*Qr Code area */>
                                    
                                    <TouchableOpacity style={{width: '80%', height: '80%' }} onPress={()=>handleQrModal()}>
                                    <Image /*qr Code*/
                                        source={{uri:'https://api.qrserver.com/v1/create-qr-code/?size=600x600&data='+user.id+'&color=fff&bgcolor=00907a&margin=0'}}
                                        style={LocalStyles.qrCode}
                                        resizeMode='contain'
                                        
                                    />
                                    </TouchableOpacity>

                                    <Text style={{color: COLORS.white, ...FONTS.body3, marginTop: 5}}>Clique para ampliar</Text>

                            </View>

                            <View style = {LocalStyles.pointsRankingArea} /**Pontos e Ranking */>

                                <View style = {LocalStyles.userStatsArea} /**Pontos */>
                                    
                                    <View style={LocalStyles.userStatsIconsArea}/**Icone da moeda */>
                                        {/*<Image
                                            source={icons.coin}
                                            style={LocalStyles.userStatsIcons}
                                            resizeMode='center'
                                        />*/}
                                        <Text style={{...FONTS.body4, color: COLORS.white, alignItems: 'flex-start'}}>
                                            PONTOS DISPONÍVEIS
                                        </Text>
                                    </View>

                                    <View style={LocalStyles.userStatsNumberArea} /**Qtd Pontos */>
                                        <Text style={LocalStyles.userStatsText}>{userPoints}</Text>
                                    </View>
                                </View>

                                <View style = {LocalStyles.userStatsArea} /**Ranking */>
                                
                                    <View style={LocalStyles.userStatsIconsArea}/**Icone do trofeu */>
                                        {/*<Image
                                            source={icons.trophy}
                                            style={LocalStyles.userStatsIcons}
                                            resizeMode='contain'
                                        />*/}

                                        <Text style={{...FONTS.body4, color: COLORS.white, alignItems: 'flex-start'}}>
                                            QUILOS RECICLADOS
                                        </Text>

                                    </View>

                                    <View style={LocalStyles.userStatsNumberArea} /**Posicao Ranking */>
                                        <Text style={LocalStyles.userStatsText}>{kgReciclados} </Text>
                                    </View>


                                </View>

                                <View style = {LocalStyles.userStatsArea} /**Ranking */>
                                
                                    <View style={LocalStyles.userStatsIconsArea}/**Icone do trofeu */>
                                        {/*<Image
                                            source={icons.trophy}
                                            style={LocalStyles.userStatsIcons}
                                            resizeMode='contain'
                                        />*/}

                                        <Text style={{...FONTS.body4, color: COLORS.white, alignItems: 'flex-start'}}>
                                            RANKING
                                        </Text>

                                    </View>

                                    <View style={LocalStyles.userStatsNumberArea} /**Posicao Ranking */>
                                        <Text style={LocalStyles.userStatsText}>{(lstRanking.findIndex(obj => obj.usuario === user.usuario)+1)}º</Text>
                                    </View>

                                </View>

                            </View>

                        </View>

                    </View>

                </View>
                
                <View //Botões
                style = {LocalStyles.buttonsArea} /** Botoes */>
                    <TouchableOpacity
                        style={LocalStyles.menuButtons}
                        onPress={()=>{navigation.navigate('Loja')}}
                    >
                        <Image
                            source={icons.shop}
                            style={{
                                width: '40%',
                                height: '60%',
                            }}
                            resizeMode='contain'
                        />
                        <Text style={LocalStyles.menuButtonText}>
                            Loja
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={LocalStyles.menuButtons}
                        onPress={()=>{navigation.navigate('Historico')}}>
                        <Image
                            source={icons.document}
                            style={{
                                width: '40%',
                                height: '60%',
                            }}
                            resizeMode='contain'
                        />
                        <Text style={LocalStyles.menuButtonText}>
                            Histórico
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={LocalStyles.menuButtons}
                        onPress={()=>{navigation.navigate('Ranking',{userRanking: lstRanking.findIndex(obj => obj.usuario === user.usuario)+1})}}>
                        <Image
                            source={icons.trophy}
                            style={{
                                width: '40%',
                                height: '60%',
                            }}
                            resizeMode='contain'
                        />
                        <Text style={LocalStyles.menuButtonText}>
                            Ranking
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={()=>{handleQuiz()}} 
                        style={LocalStyles.menuButtons}>
                        <Image
                            source={icons.quiz}
                            style={{
                                width: '40%',
                                height: '60%',
                            }}
                            resizeMode='contain'
                        />
                        <Text style={LocalStyles.menuButtonText}>
                            Quiz
                        </Text>
                        
                    </TouchableOpacity>

                    
                </View>
                                
            </ScrollView>

        </ImageBackground>

        <Footer navigation={navigation} init={init}/>

        </>
    );
        
}