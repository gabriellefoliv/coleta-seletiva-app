import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Linking } from 'react-native'

import GlobalStyles from '../../styles/defaultColors'
import LocalStyles from './styles'

export default function ({ route, navigation }) {
    const sucess = (e) => {
        navigation.navigate('Coletor', { idUsuario: e.data, idColetor: route.params.id_coletor })
    }


    const styles = StyleSheet.create({
        centerText: {
            flex: 1,
            fontSize: 18,
            padding: 32,
            color: '#777'
        },
        textBold: {
            fontWeight: '500',
            color: '#000'
        },
        buttonText: {
            fontSize: 21,
            color: 'rgb(0,122,255)'
        },
        buttonTouchable: {
            marginTop: 50,
            padding: 16
        }
    });


    return (
        <View style={GlobalStyles.container}>
            {/* <QRCodeScanner
                //reactivate={true} 
                showMarker={true}
                onRead={sucess}
                flashMode={RNCamera.Constants.FlashMode.auto}

                topContent={
                    <Text>

                    </Text>
                }
                bottomContent={
                    <TouchableOpacity style={styles.buttonTouchable}>
                        <Text style={LocalStyles.helpTxt}>Escaneie o código QR de uma coleta</Text>

                    </TouchableOpacity>
                }
            /> */}


        </View>
    );

}