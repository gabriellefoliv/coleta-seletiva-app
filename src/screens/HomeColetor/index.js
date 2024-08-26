import React, { useState, useEffect, useFocusEffect, useCallback } from 'react'
import { View, Text, Image, FlatList, Pressable, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import LocalStyles from './styles.js'
import Config from '../../config/config'
import { useAuth } from '../../contexts/auth'
import api from '../../services/api.js'
import { COLORS, FONTS, SIZES } from '../../constants/theme.js'
import { Feather } from '@expo/vector-icons'
import Profile from '../../assets/icons/profile.png'
import Logout from '../../assets/icons/logout.png'

export default function ({ navigation, }) {

    const handleSignOut = () => {
        signOut();
    }
    const { user, signOut } = useAuth()
    const [coletas, setColetas] = useState([{ data: '', id: '', nome: '', pontos: '', qtd: '' }])
    const [qtdColetas, setQtdColetas] = useState()
    const [qtdReciclado, setqtdReciclado] = useState(55)
    const [load, setLoad] = useState(true)

    useEffect(() => {
        navigation.addListener('focus', async () => setLoad(!load))
        api.get("http://" + Config.apiBaseURL + "/coletor/historico/" + user.id_coletor)
            .then((response) => {
                setQtdColetas(response.data.response.quantidade)
                setColetas(response.data.response.coletas)
                console.log(coletas[0].data)

            }
            )

            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });


    }, [load, navigation]);



    return (
        <View style={LocalStyles.container}>
            <View style={{ flex: 0.4, backgroundColor: COLORS.primary, width: '100%', borderBottomLeftRadius: 50, borderBottomRightRadius: 50 }}>

                <View style={{ height: '25%', width: '100%', /*backgroundColor: '#a48ff5',*/ flexDirection: 'row', paddingHorizontal: 10 }}>
                    <View style={{/*backgroundColor: '#998881',*/ width: '50%', flex: 1, justifyContent: 'center' }}>
                        <Image
                            source={Profile}
                            style={{
                                width: '20%',
                                height: '70%',
                                //backgroundColor:'#8a9'
                            }}
                            resizeMode={'contain'}
                        />
                    </View>

                    <View style={{/*backgroundColor: '#45c', */width: '50%', flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                        <TouchableOpacity style={{
                            width: '20%',
                            height: '100%',
                            //backgroundColor:'#a48',
                            justifyContent: 'center', alignItems: 'flex-end',
                        }}
                            onPress={() => handleSignOut()}
                            pressRetentionOffset={true}
                        >
                            <Image
                                source={Logout}
                                style={{
                                    width: '100%',
                                    height: '70%',

                                }}
                                resizeMode={'contain'}
                            />
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={{ alignItems: 'center', position: 'absolute', top: '15%', left: '50%' }}>

                    <Text style={{ ...FONTS.h1, color: COLORS.primaryTxt, position: 'relative', left: '-50%' }}>
                        {user.nome}
                    </Text>
                    <Text style={{ ...FONTS.body3, color: COLORS.primaryTxt, position: 'relative', left: '-50%' }}>
                        {user.usuario}
                    </Text>

                </View>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 25 }}>
                    <Text style={{ ...FONTS.body3, color: COLORS.primaryTxt, }}>
                        Coletas Realizadas: {qtdColetas}
                    </Text>
                    <Text style={{ ...FONTS.body3, color: COLORS.primaryTxt, }}>
                        Quilos Reciclados: {qtdReciclado}
                    </Text>
                </View>
            </View>
            <View style={{ width: '100%', flex: 0.7, /*backgroundColor: '#922',*/ alignItems: 'center', paddingBottom: 90 }}>
                <View style={{/*backgroundColor: '#c19',*/ height: '15%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ ...FONTS.h2, color: COLORS.gray }}>
                        Histórico
                    </Text>
                </View>
                <ScrollView
                    //showsVerticalScrollIndicator={false}
                    style={
                        {
                            backgroundColor: COLORS.white,


                        }
                    }
                >

                    {coletas.map(coletas =>
                        <View
                            style={{
                                width: SIZES.width,
                                height: SIZES.height * 0.07,
                                borderRadius: 15,
                                justifyContent: 'center',
                                alignItems: 'center',
                                //backgroundColor: COLORS.primaryDark,
                                borderBottomColor: COLORS.black,
                                borderBottomWidth: 0.1,
                                marginHorizontal: 6.5,
                                shadowColor: COLORS.black,
                                shadowOffset: 1,
                                shadowOffset: 15,
                                shadowRadius: 200,
                                flexDirection: 'row'
                            }}
                        >

                            <View style={{ flex: 1, alignItems: 'center', marginLeft: 0 }}>
                                <Text style={{ color: COLORS.gray, }}>
                                    {coletas.data}
                                </Text >
                            </View>

                            <View style={{ flex: 1, /*backgroundColor:'#9aaa84',*/ paddingLeft: 0, alignItems: 'center' }}>
                                <Text style={{ color: COLORS.gray, }}>
                                    {coletas.nome}
                                </Text>
                            </View>

                            <View style={{ flex: 1, /*backgroundColor:'#a84',*/ alignItems: 'center' }}>
                                <Text style={{ color: COLORS.gray, }}>
                                    {coletas.qtd}Kgs
                                </Text>
                            </View>
                        </View>)}
                </ScrollView>
            </View>

            <View style={{ alignItems: 'center' }}>

                <TouchableOpacity style={{ backgroundColor: COLORS.primary, height: 70, width: 70, borderRadius: 100, position: 'absolute', bottom: 20, justifyContent: 'center', alignItems: 'center' }}

                    onPress={() => { navigation.navigate('ScannerQRCode', { id_coletor: user.id_coletor }) }}>
                    <Feather name="camera" style={{
                        color: COLORS.white,
                        fontSize: 55,
                    }} />
                </TouchableOpacity>
            </View>
        </View>
    );


}