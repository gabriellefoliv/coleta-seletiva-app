import {StyleSheet} from 'react-native';
import {COLORS,FONTS, SIZES} from '../../constants'

export default StyleSheet.create({

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
    },

    loginCard:{
        
        position: 'absolute',
        bottom: -SIZES.height*0.24,
        backgroundColor: COLORS.white,
        width: "90%",
        paddingHorizontal: 10,
        paddingTop: SIZES.height*0.025,
        paddingBottom: SIZES.height*0.045,
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
        backgroundColor: COLORS.white,
        
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
        marginRight: 5
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
        marginBottom: 0,
        
    },

    logo: {
        width: SIZES.width*0.60,
        height: SIZES.width*0.48,
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

    bottom: {
        //bottom: -SIZES.height*0.6, 
        width: '100%', 
        //height: '10%', 
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 7
        //backgroundColor: '#4a4'
    }

})