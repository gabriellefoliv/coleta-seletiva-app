import {StyleSheet, StatusBar} from 'react-native';
import {COLORS,FONTS,SIZES} from '../../constants'


export default StyleSheet.create({

    gameContainer:{
        width: '100%', 
        height: '50%',
    }

    ,gameButtonsArea:{
        flexDirection: 'row', 
        justifyContent: 'center', 
        
        width: '100%', 
        height: '100%',
        
    },

    gameButtons:{
        height: 300,
        alignItems: 'center',
        position:'absolute',
        width: '15%',
        height: '15%',
    },
    planta :{
        
        height: 300, 
        
        right: 30,
        
        
        
        //marginVertical: 12,
        //paddingLeft: 10,
        //paddingRight: 0,
        
        //borderRadius: 20,
        alignItems: 'center',
        flex: 1,
    }

    ,bg :{
        width:'100%',
        height:'100%',
        position:'absolute',
    }

    ,foot:{
        position: 'absolute',
        top: 710,
        width: '100%',
    }

    ,footButtonsArea :{
        flexDirection: 'row', 
        justifyContent: 'center', 
        
        width: '100%', 
        //height: '120%',
        //flexWrap: 'wrap', 
        /*
        paddingTop: 0,
        position: 'absolute',
        top: 666,
        //*/
    }

    ,footButtons :{
        backgroundColor: COLORS.lightGray, 
        height: 70, 
        width: '80%', 
        
        //marginVertical: 12,
        //paddingLeft: 10,
        //paddingRight: 0,
        
        //borderRadius: 20,
        alignItems: 'center',
        flexDirection: 'row',

        shadowColor: COLORS.black,
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
        flex: 1,
    },

    not:{
    }
    

})