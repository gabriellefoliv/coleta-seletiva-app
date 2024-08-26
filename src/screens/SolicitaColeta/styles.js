import { StyleSheet} from 'react-native';
import DefColors from '../../styles/defaultColors'

export default StyleSheet.create({

    textInput: {
        width: '80%',
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 20,
        color: '#000',
        paddingLeft: 15,
        marginBottom: 20
    },
    dropDown: {
        width: '80%',
        height: 40,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20, 
        borderBottomRightRadius: 20,
        marginBottom: 20,
        marginLeft: 35,
        borderColor: '#fff',
    },
    dropDownContainer: {
        width: '80%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20, 
        borderBottomRightRadius: 20,
        marginBottom: 20,
        marginLeft: 35,
        borderColor: '#fff',
    },
    container: {
        flex: 1,
        backgroundColor: DefColors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },

    btnSolicita: {
        width: '30%',
        backgroundColor: DefColors.primaryBtnColor,
        borderRadius: 30,
        height: 40,
        justifyContent: 'center'
    },

    btnText:{
        textAlign: 'center',
        color: 'white'
    },

    title: {
        alignItems: 'center',
        paddingBottom: 20,
        fontSize: 35,
        color: DefColors.primaryTxtColor
    },

    logo: {
        width:100, 
        height: 100, 
        marginBottom: 20
    },

    offBtnCadastro: {
        width: '30%',
        backgroundColor: DefColors.offGray,
        borderRadius: 30,
        height: 40,
        justifyContent: 'center',
        marginTop:15
    },

    linkedText: {
        paddingBottom:6
    }

})