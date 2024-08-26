//IMPORTS
import React, {useState, useEffect }  from 'react'
import { Text, View, TouchableOpacity , Image, ScrollView, ImageBackground,} from 'react-native'
         
import {useAuth} from '../../contexts/auth'
import {COLORS,FONTS, icons, images, SIZES} from '../../constants'
import LocalStyles from './styles.js'
import News from './../News'

//MAIN
export default function({navigation}){

    //#region CONSTANTES
    let noticias = [
        <News/>,
        <News/> ,
        <News/>,
        <News/>
    ]
    return (
        <>
               
            <ScrollView
            style={LocalStyles.not}
            >
                
                    {noticias.map((noticia) => {
                        return noticia;
                    })}
                
                
            </ScrollView>

        </>
    );
}