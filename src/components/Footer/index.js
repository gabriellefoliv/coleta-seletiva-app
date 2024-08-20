import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Image, ScrollView } from 'react-native';
import styles from './style'

import About from '../../assets/icons/about.png'
import Game from '../../assets/icons/game.png'
import Home from '../../assets/icons/home.png'


const Footer = ({ navigation, init }) => {

    const [load, setLoad] = useState(true);
    const [lstRanking, setLstRanking] = useState([{ usuario: 'carregando' }]);
    const [kgReciclados, setKgReciclados] = useState(0)
    const [userPoints, setUserPoints] = useState(0);

    const setHomeVariables = (contents) => {
        //console.log(contents),
        //setLstRanking(contents[0]),
        //setKgReciclados(contents[1]),
        //setUserPoints(contents[2].pontos)
    }

    useEffect(() => {
        navigation.addListener('focus', async () => setLoad(!load))
        init()
            .then(contents => setHomeVariables(contents))
            .catch(error => console.log('Error during init:', error));
    }, [load, navigation]);

    return (
        <ScrollView
            horizontal={false}
            style={styles.footerContainer}>
            <View style={styles.footerRow}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Dashboard');
                    }}
                    style={styles.footerButton}>
                    <Image
                        source={Home}
                        style={styles.footerButtonImage}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Game');
                    }}
                    style={styles.footerButton}>
                    <Image
                        source={Game}
                        style={styles.footerButtonImage}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('About');
                    }}
                    style={styles.footerButton}>
                    <Image
                        source={About}
                        style={styles.footerButtonImage}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default Footer;