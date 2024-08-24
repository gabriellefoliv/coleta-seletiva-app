import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, Image, ImageBackground, Alert } from 'react-native';
import { COLORS, FONTS, icons, images } from '../../constants';

import Shelf from '../../assets/images/shelf.jpg';
import regador from '../../assets/icons/regador.png';
import planta_icon from '../../assets/images/plant_icon.png';
import coin from '../../assets/icons/coin.png';

import planta0 from '../../assets/images/planta/0.png';
import planta1 from '../../assets/images/planta/1.png';
import planta2 from '../../assets/images/planta/2.png';
import planta3 from '../../assets/images/planta/3.png';
import planta4 from '../../assets/images/planta/4.png';
import vase from '../../assets/images/vaso.png';

const Planta = () => {

    //#region CONSTS
    const MAX_HAPPINESS = 15;
    const MAX_HUNGER = 5;
    const MAX_REGADOR = 100;

    const [hunger, setHunger] = useState(0);
    const [happiness, setHappiness] = useState(0);
    const [growthPace, setGrowthPace] = useState(1000);
    const [regadorDisponivel, setRegadorDisponivel] = useState(100);
    const [plantasColetadas, setPlantasColetadas] = useState(0);
    const [showStats, setShowStats] = useState(false);
    //#endregion

    //#region CONST FUNCTIONS

    const showHideDebug = () => {
        setShowStats(!showStats);
    };

    const renderizaTextoRegador = () => {
        let showRegadorDisponivel = "";
        if (regadorDisponivel >= 100) {
            showRegadorDisponivel = "Pronto";
        } else {
            showRegadorDisponivel = regadorDisponivel.toString();
        }
        return showRegadorDisponivel;
    }

    const feedPou = () => {
        setHunger(Math.max(0, hunger - 1));
    };

    const coletarPlanta = () => {
        setHappiness(0);
        setGrowthPace(1000);
        setPlantasColetadas((prevplantasColetadas) => prevplantasColetadas + 1);
        Alert.alert("", "Planta coletada");
    };
    const increaseGrowthPace = () => {
        setGrowthPace(500);
        setRegadorDisponivel(0)
    };
    //#endregion

    //#region USE EFFECT
    useEffect(() => {
        const happinessTimer = setInterval(() => {
            if (happiness < MAX_HAPPINESS) {
                setHappiness((prevHappiness) => prevHappiness + 1);
            }
        }, growthPace);

        const regadorTimer = setInterval(() => {
            if (regadorDisponivel < MAX_REGADOR) {
                setRegadorDisponivel((prevRegadorDisponivel) => prevRegadorDisponivel + 1);
            }
            else if (regadorDisponivel >= MAX_REGADOR) {
                setHunger((prevRegadorDisponivel) => prevRegadorDisponivel);
            }
        }, 500);

        const hungerTimer = setInterval(() => {
            if (hunger < MAX_HUNGER) {
                setHunger((prevHunger) => prevHunger + 1);
            }

        }, 10000);


        return () => {
            clearInterval(happinessTimer);
            clearInterval(hungerTimer);
            clearInterval(regadorTimer);
        };
    }, [happiness, hunger]);


    //#endregion
    /*
    <TouchableOpacity style={styles.button} onPress={showHideDebug}>
                  <Image source={icons.about} style={styles.icone} />
          </TouchableOpacity>
     */


    return (
        <ImageBackground style={styles.container} source={Shelf}>


            <View style={styles.container}>
                <View style={styles.plantIcon}>
                    <Image style={styles.plant_icon} source={planta_icon} />
                    <Text style={styles.plantas_coletadas}>{plantasColetadas}</Text>
                </View>
                    <TouchableOpacity style={styles.planta} onPress={coletarPlanta} disabled={happiness < MAX_HAPPINESS}>
                        <Image
                        source={
                            happiness >= 15 ? planta4 :
                            happiness >= 12 ? planta3 :
                            happiness >= 8 ? planta2 :
                            happiness >= 4 ? planta1 :
                            planta0
                        }
                        style={styles.headerImage}
                        />
                    </TouchableOpacity>

                    <Image style={styles.vase} source={vase} />
            </View>

            <View style={styles.actionsContainer} /* REGADOR */>
                <TouchableOpacity style={styles.action} onPress={increaseGrowthPace} disabled={regadorDisponivel < MAX_REGADOR}>
                    <Image source={regador} style={styles.icone} />
                    <Text style={styles.statValue}>{renderizaTextoRegador}</Text>
                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity style={styles.botao_converter}>
                    <Text style={styles.texto_botao_converter}>
                        Troque plantas em pontos
                    </Text>
                    <Image source={coin} style={styles.imagem_botao_conveter} />
                </TouchableOpacity>
            </View>

            {showStats && //DEBUGGING
                <View style={styles.statsContainer}>
                    <View style={styles.stat}>
                        <Text style={styles.statName}>Lixos:</Text>
                        <Text style={styles.statValue}>{hunger}</Text>
                    </View>

                    <View style={styles.stat}>
                        <Text style={styles.statName}>Crescimento:</Text>
                        <Text style={styles.statValue}>{happiness}</Text>
                    </View>

                    <View style={styles.stat}>
                        <Text style={styles.statName}>% regador:</Text>
                        <Text style={styles.statValue}>{regadorDisponivel}</Text>
                    </View>

                    <View style={styles.stat}>
                        <Text style={styles.statName}>Plantas coletadas:</Text>
                        <Text style={styles.statValue}>{plantasColetadas}</Text>
                    </View>
                </View>
            }

        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    statsContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: 'lightgray',
        position: 'absolute',
        top: 565,
        left: 0,
    },
    stat: {
        marginRight: 20,
    },
    statName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    statValue: {
        fontSize: 18,
    },
    actionsContainer: {
        flexDirection: 'row',
        position: 'absolute',
        top: 80,
        right: -30,
    },
    plant_icon: {
        width: 50,
        height: 50,
    },
    plantIcon: {
        flexDirection: 'row',
        bottom: 280,
        right: 170,
    },
    plantas_coletadas: {
        position: 'absolute',
        top: 15,
        left: 60,
        backgroundColor: 'lightgray',
        borderRadius: 100,
        fontSize: 20,
    },
    action: {
        marginRight: 50,
    },
    planta: {
        position: 'absolute',
        top: 170,
        paddingLeft: 10,
    },
    vase: {
        position: 'absolute',
        top: 180,
        left: -30,
        width: '38%' ,
        height: 350,
    },
    icone: {
        width: 50,
        height: 50,
    },
    headerImage: {
        width: 150,
        height: 150,
        resizeMode: 'contain'
    },
    iconContainer: {
        width: 50,
        height: 50,
        resizeMode: 'contain',

    },
    trashRow: {
        flexDirection: 'row',
        position: 'absolute',
        top: 170,
    },
    debugButton: {
        backgroundColor: '#007AFF',
        padding: 100,
        borderRadius: 10,
        marginTop: 200,
    },

    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 10,
        marginTop: 300,
        marginLeft: 300,
    },

    botao_converter: {
        flexDirection: 'row',
        backgroundColor: '#007AFF',
        top: 220,
    },
    texto_botao_converter: {
        left: 250,
        bottom: 1,
        fontSize: 20,
    },
    imagem_botao_conveter: {
        width: '100%',
        height: '100%',
        right: 50,
        resizeMode: 'contain',
    }

});

export default Planta;