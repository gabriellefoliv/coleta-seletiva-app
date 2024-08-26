import {StyleSheet} from 'react-native';
import DefColors from '../../styles/defaultColors'

export default StyleSheet.create({

btnFinalizar: {
    width: '30%',
    backgroundColor: DefColors.primaryBtnColor,
    borderRadius: 30,
    height: 40,
    justifyContent: 'center',
    marginTop:15
    
},

offBtnFinalizar: {
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

txtColeta:{
    textAlign: 'center',
    color: "#fff",
    fontSize: 16
},

})