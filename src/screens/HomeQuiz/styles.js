import {StyleSheet, StatusBar} from 'react-native';
import {COLORS,FONTS,SIZES} from '../../constants'


export default StyleSheet.create({

    container:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: COLORS.primaryBtn,
        paddingTop: SIZES.height*0.05,
    },

    quizzTitle:{
        backgroundColor: COLORS.primaryDark,
        height: 40,
        width: '100%',
        ...FONTS.body1,
        color: COLORS.white,
        borderTopLeftRadius: 20, // Adiciona borda arredondada superior esquerda
        borderTopRightRadius: 20,
    },

    Question: {
        backgroundColor: COLORS.primaryBtn,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 10,
      },
    
    rankButton:{
        alignItems: 'center',
        width: 100,
    },

    rankButtonText: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center',
        bottom: 25,
    },
    
    rankButtonImage:{
        width: 100,
        height: 33,
    },

    quizzButtons: {
        width: '80%',
        left: 35,
        height: '80%'
    },

    quizzButton:{
        alignItems: 'center',
        width: 100,
        left: 115,
        top: 20
    },

    quizzButtonText: {
        color: COLORS.lightGray,
        fontSize: 28,
        textAlign: 'center',
        bottom: 25,
        width: 200,
        bottom: 50,
    },
    
    quizzButtonImage:{
        width: 200,
        height: 66,
    },

    
})