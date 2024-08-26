import {StyleSheet} from 'react-native';
import DefColors from '../../styles/defaultColors'
import {COLORS,FONTS} from '../../constants'


export default StyleSheet.create({

    textInput: {
        width: '80%',
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 20,
        color: '#000',
        paddingLeft: 15,
        marginTop: 5,
           
    },
    textInput1: {
        width: 250,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 20,
        color: '#000',
        paddingLeft: 15,
        marginTop: 5,
    },


    btnCadastro: {
        width: '30%',
        backgroundColor: DefColors.primaryBtnColor,
        borderRadius: 30,
        height: 40,
        justifyContent: 'center',
        marginTop:15
        
    },

    offBtnCadastro: {
        width: '30%',
        backgroundColor: DefColors.offGray,
        borderRadius: 30,
        height: 40,
        justifyContent: 'center',
        marginTop:15
    },

    btnText:{
        textAlign: 'center',
        color: 'white'
    },

    title: {
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 35,
        color: DefColors.primaryTxtColor,
        marginVertical: 20
    },

    error: {
        color: "#e84033",
        fontSize: 14,
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold'
    },

    container:{
        flex: 1, 
        paddingBottom: 100, 
        backgroundColor: COLORS.white,

    },

    topContainer:{
        width: "100%",
        height: '65%',
        borderBottomStartRadius: 40,
        borderBottomEndRadius: 40,

        shadowColor: COLORS.black,
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 19,

        backgroundColor: COLORS.primary,
        
    },

    cabecalho:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 55,
        paddingTop: 55,
    },

    loginCard:{
        
        position: 'absolute',
        bottom: "-38%",
        backgroundColor: COLORS.white,
        width: "90%",
        paddingHorizontal: 15,
        paddingTop: 25,
        paddingBottom: 35,
        borderRadius: 15,
        alignItems: 'center',

        shadowColor: COLORS.black,
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 19,    
        
    },

    container:{
        flex: 1, 
        paddingBottom: 100, 
        backgroundColor: COLORS.white
    },

    textInput: {
        flex: 1,
        width: '90%',
        height: 40,
        backgroundColor: COLORS.textInputGray,
        color: '#000',
        paddingLeft: 5,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15
    },

    textInputError: {
        flex: 1,
        width: '90%',
        height: 40,
        backgroundColor: COLORS.textInputGray,
        borderBottomColor: COLORS.error,
        borderBottomWidth: 1,
        color: '#000',
        paddingLeft: 5,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15
    },

    textSection: {
        flex: 1,
        width: '90%',
        height: 40,
        backgroundColor: COLORS.textInputGray,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
        
    },

    textSection_PorcMedia: {
        ///flex: 1,
        width: '50%',
        height: 40,
        backgroundColor: COLORS.textInputGray,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginLeft:'2%',
        
    },
    textSection_PorcMenor: {
        ///flex: 1,
        width: '25%',
        height: 40,
        backgroundColor: COLORS.textInputGray,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginLeft:'2%',

    },
    textSection_Conteiner: {
        flex: 1,
        width: '90%',
        height: 40,
        //backgroundColor: COLORS.textInputGray,
        //borderRadius: 15,
        flexDirection: 'row',
        //alignItems: 'center',
        marginBottom: 20
        
    },
    btnBuscar: {
        //flex: 1,
        width: '25%',
        backgroundColor: COLORS.textInputGray,
        borderRadius: 30,
        height: 40,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        marginLeft:'2%',

        
    },

    textSectionError: {
        flex: 1,
        width: '90%',
        height: 40,
        backgroundColor: COLORS.textInputGray,
        borderBottomColor: COLORS.error,
        borderBottomWidth: 0,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
        
    },

    imageIcon: {
        height: 20,
        width: 20,
        marginLeft: 10,
        marginRight: 5,
        opacity: 0.6
    },

    btnEntrar: {
        width: '90%',
        backgroundColor: COLORS.primaryBtn,
        borderRadius: 3,
        height: 40,
        justifyContent: 'center',
        marginBottom: 13,
    },

    btnRegistrar: {
        width: '90%',
        borderColor: COLORS.primaryBtn,
        borderWidth: 1.2,
        borderRadius: 3,
        height: 40,
        justifyContent: 'center',
        
    },

    btnRegistrarText:{
        textAlign: 'center',
        color: COLORS.primaryBtn,
    },

    btnText:{
        textAlign: 'center',
        color: 'white'
    },

    title: {
        color: COLORS.white,
        ...FONTS.h1,
        marginBottom: 40,
        
    },

    logo: {
        width: 120,
        height: 120,
    },

    subTitle: {
        ...FONTS.h2,
        color: COLORS.gray,
        paddingBottom: 5,
    },

    description: {
        ...FONTS.body3,
        color: COLORS.gray,
        paddingBottom: 15,
    },

})