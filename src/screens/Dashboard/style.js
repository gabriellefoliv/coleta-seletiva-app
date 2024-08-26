import { StyleSheet, StatusBar } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants'


export default StyleSheet.create({

    container: {
        paddingBottom: 100,
        //backgroundColor: '#4a4',
    },

    topContainer: {
        flex: 1,
        width: "100%",
        height: SIZES.height * 0.45,
        borderBottomStartRadius: SIZES.width * 0.12,
        borderBottomEndRadius: SIZES.width * 0.12,

        shadowColor: COLORS.black,
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,

        backgroundColor: COLORS.primary,

        alignItems: 'center',

    },

    header: {
        flex: 1.1,
        width: '100%',
        justifyContent: 'center',
        //marginTop: StatusBar.currentHeight*1.5,
        //backgroundColor: '#5ff',

    },

    profileButton: {
        height: 30,
        width: 30,
        resizeMode: 'contain',
        // marginTop: StatusBar.currentHeight,
    },

    logoutButton: {
        height: 30,
        width: 30,
        // marginTop: StatusBar.currentHeight * 1.2,
    }

    , userDetailsArea: {
        flex: 0.89,
        flexDirection: 'row'
        //,backgroundColor:'#4f4'
    }

    , qrCodeArea: {
        flex: 1.4,
        justifyContent: 'center',
        //paddingTop:25,
        alignItems: 'center'
    },

    qrCode: {
        width: '100%',
        height: '100%',
    }

    , pointsRankingArea: {
        flex: 1,
        //justifyContent: 'center',
        marginTop: '4%',
        //backgroundColor: '#F4f',
        //borderColor: '#cdcd',
        //justifyContent: 'center'


    }

    , userStatsArea: {
        height: '26%'
        //,flexDirection: 'row'
        , alignItems: 'flex-start'
        //,justifyContent:''
        //,backgroundColor: COLORS.primaryDark
        //,marginTop: 0
        //,paddingLeft: 0
        //,borderRadius: 15
        , marginRight: 0
        , marginBottom: 0
        //,borderLeftWidth: 1
        , borderColor: COLORS.white


        //,borderBottomWidth: 1

    }

    , userStatsIconsArea: {
        flex: 1.5,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        //backgroundColor: '#44a',
        paddingLeft: 5


    }

    , userStatsIcons: {
        width: '70%', height: '70%'
    }

    , userStatsText: {
        ...FONTS.h2,
        color: COLORS.white,
        paddingLeft: 5,
    }

    , userStatsNumberArea: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'flex-start'
    }

    , userDetailsBottom: {
        flex: 1,

        //paddingStart: SIZES.width*0.13,
        alignItems: 'center',
        backgroundColor: '#f4f',
        flex: 1,
        justifyContent: 'center',
        //borderTopStartRadius: 80,
        //borderBottomEndRadius: 80,
        //borderTopEndRadius: 80
        paddingHorizontal: 55,


    }

    , welcomeText: {
        paddingTop: 8,


        color: COLORS.primary,
        ...FONTS.h1,

    }

    , buttonsArea: {
        flexDirection: 'row',
        justifyContent: 'center',
        overflow: 'hidden',
        width: '100%',
        flexWrap: 'wrap',
    }

    , menuButtons: {
        backgroundColor: COLORS.lightGray,
        height: 60,
        width: '80%',
        marginHorizontal: 15,
        marginVertical: 8,
        //paddingLeft: 15,
        paddingRight: 15,

        borderRadius: 20,
        alignItems: 'center',
        flexDirection: 'row',

        shadowColor: COLORS.black,
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,

    }

    , menuButtonText: {
        ...FONTS.body3
        , color: COLORS.gray
    },

    popUpMensagemPrimeiraColeta: {
        position: 'absolute',
        top: 0,
        right: 9,
        height: '80%',
        width: 300,
        transform: [{ translateX: -50 }, { translateY: -50 }],
        backgroundColor: 'black',
        borderRadius: 10,
        padding: 20,
    },


})