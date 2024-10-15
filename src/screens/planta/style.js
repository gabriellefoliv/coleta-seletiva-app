import {StyleSheet} from 'react-native';

export default StyleSheet.create({

    Area:{
        width: '100%',
        height: '100%',
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#c7edfc'
    },
    Text:{
        width: "100%",
    },
    planta:{
        // Defina o tamanho desejado da imagem
        width: 500, // ajuste para o tamanho que preferir
        height: 500, // ajuste para o tamanho que preferir
        resizeMode: 'contain', // pode ser 'cover', 'contain', etc., dependendo do efeito desejado
    },
    area_planta:{
        flex: 2,
        alignContent: 'center',
        justifyContent: 'center',
        width: 100, // mantenha o mesmo tamanho da planta
        height: 100, // mantenha o mesmo tamanho da planta
        //backgroundColor: 'lightgray', // para visualizar a área, pode remover depois
        alignItems: 'center', // para centralizar a planta dentro da área
        borderRadius: 10, // exemplo de estilo opcional
    }
})