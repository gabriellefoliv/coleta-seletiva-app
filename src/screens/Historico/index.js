import React, {useState, useEffect }  from 'react'
import { View,Text, Image, FlatList, StatusBar, TouchableOpacity, ScrollView} from 'react-native'
import LocalStyles from './styles.js'
import Config from '../../config/config'
import {useAuth} from '../../contexts/auth'
import api from '../../services/api.js'
import { COLORS, FONTS, SIZES } from '../../constants/theme.js'
import moment from 'moment'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


export default function({navigation,}){

    const handleSignOut = () => {
        signOut();
    }
    const {user, signOut} = useAuth()  
    const [coletas,setColetas] = useState([])
    const [qtdColetas,setQtdColetas] = useState('carregando')
    const [qtdReciclado,setqtdReciclado] = useState('carregando')

    useEffect(() => {
        api.get("http://"+Config.apiBaseURL+"/coletas/getcoletas/"+user.id)
        .then((response) =>{
            setColetas(response.data.response.result)
            console.log(coletas)
            setQtdColetas(response.data.response.quantidade)

            api.get("http://"+Config.apiBaseURL+"/coletas/getquilos/"+user.id)
            .then((response) =>{
                setqtdReciclado(response.data.result[0].totalReciclado)
            })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
        })
        .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });
    }, []);


    return(
        <View style={LocalStyles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} />
            <View style={{flex: 0.4, backgroundColor: COLORS.primary, width: '100%', borderBottomLeftRadius: 50, borderBottomRightRadius: 50}}>

                <View style={{height: '50%', width: '100%', /*backgroundColor: '#a48ff5',*/ flexDirection: 'row', paddingHorizontal: 10}}>
                    <TouchableOpacity style={{/*backgroundColor: '#998881',*/ width:'50%', flex: 1, justifyContent:'center'}}
                        onPress={()=>navigation.goBack()}>
                        <MaterialCommunityIcons name="arrow-left" style={{
                                color: COLORS.white,
                                fontSize: 20,
                                alignItems: 'stretch',
                                }} 
                        />
                    </TouchableOpacity>
                </View>

                <View style={{alignItems: 'center', position: 'absolute' , top: '22%', left: '50%'}}>
                        
                        <Text style={{...FONTS.h1, color: COLORS.primaryTxt, position: 'relative', left: '-50%' }}>
                            Olá, {user.nome}
                        </Text>
                        <Text style={{...FONTS.body3, color: COLORS.primaryTxt, position: 'relative', left: '-50%'}}>
                            Seu nome de usuário: {user.usuario}
                        </Text>
                
                </View>

                <View style={{flex: 1,alignItems: 'center', justifyContent: 'center', paddingTop: 25}}>
                    <Text style={{...FONTS.body3, color: COLORS.primaryTxt,}}>
                        Coletas Realizadas: {qtdColetas}
                    </Text>
                    <Text style={{...FONTS.body3, color: COLORS.primaryTxt,}}>
                        Quilos Reciclados: {qtdReciclado}
                    </Text>
                </View>
            </View>
            <View style={{width:'100%', flex: 0.7, /*backgroundColor: '#922', */alignItems: 'center', paddingBottom: 10}}>
                <View style={{/*backgroundColor: '#c19', */height: '15%', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{...FONTS.h2, color: COLORS.gray}}>
                        Histórico
                    </Text>
                </View>
                <View style={{height: '10%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                            <View style={{flex: 1, alignItems: 'center',marginLeft: 0}}>
                                <Text style={{color: COLORS.gray,...FONTS.h4}}>
                                    DATA
                                </Text >
                            </View>

                            <View style={{flex: 1, /*backgroundColor:'#9aaa84',*/ paddingLeft: 0,alignItems: 'center'}}>
                                <Text style={{ color: COLORS.gray,...FONTS.h4}}>
                                    COLETOR
                                </Text>
                            </View>

                            <View style={{flex: 1, /*backgroundColor:'#a84',*/ alignItems: 'center'}}>
                                <Text style={{color: COLORS.gray,...FONTS.h4}}>
                                    QUANTIDADE
                                </Text>
                            </View>

                            <View style={{flex: 1, /*backgroundColor:'#a84',*/ alignItems: 'center'}}>
                                <Text style={{color: COLORS.gray,...FONTS.h4}}>
                                    PONTOS
                                </Text>
                            </View>
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={true}
                    style={
                        {
                            backgroundColor: COLORS.white,
                            
                            
                        }
                    }>
                    {coletas.map(coletas =>
                        <View
                            style={{width: SIZES.width,
                                height: SIZES.height*0.07,
                                borderRadius: 15,
                                justifyContent: 'center',
                                alignItems: 'center',
                                //backgroundColor: '#a69',
                                borderBottomColor: COLORS.black,
                                //borderBottomWidth: 0.1,
                                //marginHorizontal: 6.5,
                                shadowColor: COLORS.black,
                                shadowOffset: 1,
                                shadowOffset: 15,
                                shadowRadius: 200,
                                flexDirection:'row'
                                }}
                            >

                            <View style={{flex: 1, alignItems: 'center',marginLeft: 0}}>
                                <Text style={{color: COLORS.gray,}}>
                                    {moment(coletas.data).format('DD.MM.YYYY')}
                                </Text >
                            </View>

                            <View style={{flex: 1, /*backgroundColor:'#9aaa84',*/ paddingLeft: 0,alignItems: 'center'}}>
                                <Text style={{ color: COLORS.gray,}}>
                                    {coletas.nomeColetor}
                                </Text>
                            </View>

                            <View style={{flex: 1, /*backgroundColor:'#a84',*/ alignItems: 'center'}}>
                                <Text style={{color: COLORS.gray,}}>
                                    {coletas.qtd}Kgs
                                </Text>
                            </View>

                            <View style={{flex: 1, /*backgroundColor:'#a84',*/ alignItems: 'center'}}>
                                <Text style={{color: COLORS.gray,}}>
                                    {coletas.pontos}
                                </Text>
                            </View>
                        </View>)}
                </ScrollView>
            </View>
        </View>
    );

    
}   