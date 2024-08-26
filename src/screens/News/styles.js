import {StyleSheet, StatusBar} from 'react-native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import {COLORS,FONTS,SIZES} from '../../constants'


export default StyleSheet.create({

    subtitulo:{
        fontSize:12,
        color:COLORS.primaryTxt
    }   ,

    titulo:{
        fontSize:18,
        color:COLORS.primaryTxt
    }   ,

    viewTitulo:{
        alignItems:'center',
        justifyContent: 'flex-start'
    },

    viewSubtitulo:{
        alignItems:'center',
        justifyContent: 'flex-start'
    },

    caixa:{
        backgroundColor: COLORS.primaryDark, 
        borderRadius: 10,
        padding:10,
        
    }
})