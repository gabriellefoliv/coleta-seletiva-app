import {StyleSheet, StatusBar} from 'react-native';
import {COLORS,FONTS,SIZES} from '../../constants'


export default StyleSheet.create({

    whiteBg:{
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
    }
    
    ,aboutButtonsContainer:{
        position: 'absolute',
        top: 100,
        height: 500,
    }

    ,buttonsArea:{
        flexDirection: 'row', 
        justifyContent: 'center', 
        overflow:'hidden' , 
        width: '100%', 
        flexWrap: 'wrap', 
        paddingTop: 15

    }

    ,menuButtons:{
        backgroundColor: COLORS.lightGray, 
        height: 60, 
        width: '80%', 
        marginHorizontal: 15, 
        marginVertical: 12,
        //paddingLeft: 15,
        paddingRight: 15,
        
        borderRadius: 20,
        alignItems: 'center',
        flexDirection: 'row',

        shadowColor: COLORS.black,
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,

    }

    ,menuButtonText:{
        ...FONTS.body3
        ,color: COLORS.gray
    }
    ,logo:{
        width: 200,
        height: 200,
        position: 'absolute',
        top: 500,
        transform: [{scaleY: -1}],
    }
})