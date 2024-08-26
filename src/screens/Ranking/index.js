import React, {useState, useEffect }  from 'react'
import { View,Text, Image, FlatList, StatusBar, TouchableOpacity, ScrollView} from 'react-native'
import LocalStyles from './styles.js'
import Config from '../../config/config'
import {useAuth} from '../../contexts/auth'
import api from '../../services/api.js'
import { COLORS, FONTS, SIZES } from '../../constants/theme.js'
import moment from 'moment'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


export default function({route,navigation,}){

    const {user, signOut} = useAuth()  
    const [ranking,setRanking] = useState([])
    const [totalColetado,setTotalColetado] = useState([])
    const {userRanking} = route.params;


    useEffect(() => {
        api.get("http://"+Config.apiBaseURL+"/users/ranking")
        .then((response) =>{
            setRanking(response.data.response.Ranking)
            console.log(ranking)
            api.get("http://"+Config.apiBaseURL+"/coletas/getquilos/"+user.id)
            .then((response)=>{
                setTotalColetado(response.data.result[0].totalReciclado)
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
        <View
            style={{backgroundColor: '#00483d', flex:1}}>
            <View
                style={{ height: '20%', width: '100%', flexDirection: 'row',backgroundColor: 'rgba(255, 252, 252, 0.05)', paddingBottom:10}}>
                
                <View
                    style={{/*backgroundColor:'#8a4444',*/flex: 1, justifyContent: 'flex-end', paddingLeft: 20}}>
                    <View
                        style={{flexDirection:'row',/* backgroundColor:'#a8f44a',*/alignItems:'center'}}>
                        <Text
                            style={{...FONTS.body2, color: COLORS.white}}>
                            {user.usuario}
                        </Text>
                    </View>

                    <View
                        style={{flexDirection:'row',/* backgroundColor:'#8e5548',*/alignItems:'flex-end',}}>
                        <Text
                            style={{color: COLORS.white, fontSize: 45}}>
                            {totalColetado}
                        </Text>
                        <Text
                            style={{...FONTS.body3, color: COLORS.white}}>
                            Kgs
                        </Text>
                    </View>
                </View>
                <View
                    style={{/*backgroundColor: '#d8d',*/ flex: 1, alignItems:'center', justifyContent: 'flex-end'}}>

                    <Text
                        style={{color: COLORS.white, fontSize: 45}}>
                        No.{userRanking}
                    </Text>
                </View>
            </View>
            <View 
                style={{ marginHorizontal:45, flex: 1}}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{/*backgroundColor: '#a4a',*/ height: '75%', width: '100%'}}>

                    {ranking.map((ranking,index) =>
                        <View>
                            {index <10 &&
                            <View
                                style={{width: '100%',
                                    height: SIZES.height*0.1,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderBottomColor: COLORS.black,
                                    flexDirection:'row',
                                    backgroundColor: index==userRanking-1? 'rgba(255, 252, 252, 0.2)':'rgba(255, 252, 252, 0.05)',
                                    marginVertical: 6,
                                    //marginHorizontal: 15
                                    }}
                                >
                                <View
                                    style={{ flex: 1, alignItems:'center'}}>
                                    <Text
                                        style={{ color: index==0?'#f1c232':
                                                        index==1?'#f3ce5a':
                                                        index==2?'#f8e098' :'#fff', fontSize:35}}>
                                        {index+1}
                                    </Text>
                                </View>
                                <View style={{flex: 3, alignItems: 'flex-start',paddingLeft: 12, borderStartWidth: 3, borderStartColor:'#00483d'}}>
                                    <Text
                                        style={{color:'#fff', ...FONTS.body3}}>
                                        {ranking.usuario}
                                    </Text>
                                    <Text
                                        style={{color:'#aaa', ...FONTS.body4}}>
                                        {ranking.nome}
                                    </Text >
                                </View>
                                <View
                                    style={{flex: 2, alignItems:'flex-end', paddingEnd: 10}}>
                                    <Text
                                        style={{color:'#fff', ...FONTS.body3}}>
                                        {ranking.quilos}Kgs
                                    </Text>
                                </View>

                            </View>}
                            <View>
                            {
                                index>=10&&index==userRanking-1 &&
                                <View>
                                    <View
                                        style={{alignItems:'center'}}>
                                        <MaterialCommunityIcons name="dots-vertical" style={{
                                            color: COLORS.white,
                                            fontSize: 30,
                                            //alignItems: 'stretch',
                                            }}/>
                                    </View>

                                    <View style={{width: '100%',
                                    height: SIZES.height*0.1,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderBottomColor: COLORS.black,
                                    flexDirection:'row',
                                    backgroundColor: index==userRanking-1? 'rgba(255, 252, 252, 0.2)':'rgba(255, 252, 252, 0.05)',
                                    marginVertical: 6,
                                    //marginHorizontal: 15
                                    }}>
                                        <View
                                        style={{ flex: 1, alignItems:'center'}}>
                                        <Text
                                            style={{ color:'#fff', fontSize:35}}>
                                            {index+1}
                                        </Text>
                                        </View>
                                        <View style={{flex: 3, alignItems: 'flex-start',paddingLeft: 12, borderStartWidth: 3, borderStartColor:'#00483d'}}>
                                            <Text
                                                style={{color:'#fff', ...FONTS.body3}}>
                                                {ranking.usuario}
                                            </Text>
                                            <Text
                                                style={{color:'#aaa', ...FONTS.body4}}>
                                                {ranking.nome}
                                            </Text >
                                        </View>
                                        <View
                                            style={{flex: 2, alignItems:'flex-end', paddingEnd: 10}}>
                                            <Text
                                                style={{color:'#fff', ...FONTS.body3}}>
                                                {ranking.quilos}Kgs
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            }
                            </View>
                        </View>
                        
                    )}
            </ScrollView>
            </View>
        </View>
    )
    
}   