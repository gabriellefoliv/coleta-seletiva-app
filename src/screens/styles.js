import {StyleSheet} from 'react-native';
import DefColors from './styles/defaultColors'

export default StyleSheet.create({
    TextBox:{
        borderWidth: 1,
        borderColor: '#000',
    },
    textoCima:{
        color: '#00f',
        fontSize: 25,
    },
    container: {
        flex: 1,
        backgroundColor: DefColors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 20
    },

    scrollView: {
        //backgroundColor: DefColors.primaryColor,
    },

})