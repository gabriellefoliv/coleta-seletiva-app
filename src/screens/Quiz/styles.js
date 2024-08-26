import {StyleSheet, StatusBar} from 'react-native';
import {COLORS,FONTS,SIZES} from '../../constants'
import DefColors from '../../styles/defaultColors'

export default StyleSheet.create({

    container:{
         
        //paddingBottom: 100, 
        backgroundColor: COLORS.primaryDark,
        flex:1,
        height:SIZES.height 
        
    },

    imageBG:{
        
    },

    topContainer:{
        flex: 1,
        width: "100%",
        height: SIZES.height *0.5,
        borderBottomStartRadius: SIZES.height *0.12,
        borderBottomEndRadius:  SIZES.height *0.12,
       
       

        shadowColor: COLORS.black,
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,

        backgroundColor: COLORS.primary,

        alignItems: 'center',
        
    },

    header:{
        flex: 1.1,
        width: '100%',
        justifyContent: 'center',
        alignItems:'center'
        //marginTop: StatusBar.currentHeight*1.5,
        //backgroundColor: '#5ff',
        
    },
  

    subTitle: {
        ...FONTS.h2,
        color: COLORS.white,
        paddingTop: SIZES.height *0.045, 
        paddingLeft: SIZES.width * 0.06
        //justifyContent: 'center',
        //alignItems: 'center'
        
    },

    profileButton:{
        height: 30,
        width: 30,
        resizeMode: 'contain',
        marginTop: StatusBar.currentHeight,
    },

    logoutButton:{
        height: 30,
        width: 30,
        marginTop: StatusBar.currentHeight*1.2,
    }

    ,userDetailsArea:{
        flex: 0.89, 
        flexDirection: 'row'
        //,backgroundColor:'#4f4'
    }

    ,qrCodeArea: {
        flex: 1.4, 
        justifyContent: 'center', 
        //paddingTop:25,
        alignItems: 'center'
    },

    qrCode: {
        width: '100%', 
        height:'100%', 
    }

    ,pointsRankingArea: {
        flex: 1, 
        //justifyContent: 'center',
        marginTop: '4%',
        //backgroundColor: '#F4f',
        //borderColor: '#cdcd',
        //justifyContent: 'center'

        
    }

    ,userStatsArea: {
        height: '26%'
        //,flexDirection: 'row'
        ,alignItems: 'flex-start'
        //,justifyContent:''
        //,backgroundColor: COLORS.primaryDark
        //,marginTop: 0
        //,paddingLeft: 0
        //,borderRadius: 15
        ,marginRight: 0
        ,marginBottom: 0
        //,borderLeftWidth: 1
        ,borderColor: COLORS.white
        

        //,borderBottomWidth: 1
                
    }

    ,userStatsIconsArea:{
        flex: 1.5, 
        justifyContent: 'flex-end', 
        alignItems: 'flex-start',
        //backgroundColor: '#44a',
        paddingLeft: 5

        
    }

    ,userStatsIcons:{
        width: '70%', height: '70%'
    }

    ,userStatsText:{
        ...FONTS.h2,
        color: COLORS.white ,
        paddingLeft: 5,
    }

    ,userStatsNumberArea:{
        flex: 2, 
        justifyContent: 'center', 
        alignItems: 'flex-start'
    }

    ,userDetailsBottom:{
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

    ,welcomeText:{
        paddingTop: 8,
        

        color: COLORS.primary,
        ...FONTS.h1,
        
    }

    ,buttonsArea:{
        flexDirection: 'row', 
        justifyContent: 'center', 
        overflow:'hidden' , 
        width: '100%', 
        flexWrap: 'wrap', 
        paddingTop: 35
    }

    ,menuButtons:{
        backgroundColor: COLORS.lightGray, 
        height: 45, 
        width: '90%', 
        marginHorizontal: 15, 
        marginVertical: 12,
        //paddingLeft: 15,
        paddingRight: 15,
        
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',

        shadowColor: COLORS.black,
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
        justifyContent: 'center',

    }

    ,menuButtonsOpcao:{
        backgroundColor: COLORS.offGray, 
        height: 45, 
        width: '90%', 
        marginHorizontal: 15, 
        marginVertical: 12,
        //paddingLeft: 15,
        paddingRight: 15,
        
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',

        shadowColor: COLORS.black,
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
        justifyContent: 'center',

    }

    ,menuButtonText:{
        ...FONTS.body3
        ,color: COLORS.black,
        textAlign:"center"
       
    }

    ,btnOK: {
        width: '20%',
        backgroundColor: DefColors.primaryColor,
        borderRadius: 3,
        height: 40,
        justifyContent: 'center',
        marginBottom: 15,
        marginTop: 15,
    }
    ,bntOKText:{
        ...FONTS.body3
        ,color: COLORS.white,
        textAlign:"center"
       
    }

    

})