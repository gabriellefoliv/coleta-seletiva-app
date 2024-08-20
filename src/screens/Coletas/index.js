import React, {useState, useEffect }  from 'react'
import { View, Text,
         TouchableOpacity,FlatList } from 'react-native'
import LocalStyles from './styles.js'
import GlobalStyles from '../../styles'
import Config from '../../config/config'
import api from '../../services/api.js'
import {useAuth} from '../../contexts/auth'

export default function({navigation}){
    
    const {user} = useAuth()

    const [coletas,setColetas] = useState()

    useEffect(() => {
        api
          .get('http://'+Config.apiBaseURL+'/coletas/getcoletas/'+user?.id_cliente)
          .then((response) => setColetas(response.data.result))
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, []);
    
      const login = (id) => {
        
        navigation.navigate('QRCode', {idColeta: id})
          
    }

    return(
        <View style={GlobalStyles.container}>
            <FlatList
                data={coletas}
                renderItem={({item}) => 
                    <View style={{alignItems: 'center'}}>
                        <Text>
                        Local: {item.tipo} Baldes: {item.qtd_baldes} Status: {item.status}
                        </Text>
                        <TouchableOpacity 
                            onPress={()=>login(item.id)}
                            style={LocalStyles.btnQrCode}>
                                <Text style={LocalStyles.btnText}>
                                Qr Code
                                </Text>
                        </TouchableOpacity>
                    </View>  
                    }
            /> 
        </View>
    );
}