import { StyleSheet} from 'react-native';
import { COLORS } from '../../constants';
import DefColors from '../../styles/defaultColors'

export default StyleSheet.create({

    btnScanner: {
        width: '40%',
        backgroundColor: DefColors.primaryBtnColor,
        borderRadius: 30,
        height: 40,
        justifyContent: 'center',
        marginBottom: 10
    },

    btnText:{
        textAlign: 'center',
        color: 'white'
    },


    linkedText: {
        paddingBottom:6
    },

    container: {
        flex: 1,
        backgroundColor: COLORS.white
    }

})