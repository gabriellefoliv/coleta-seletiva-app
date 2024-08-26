import React, {useState} from 'react'
import { View,
         TextInput, Text, 
         TouchableOpacity, 
        } from 'react-native'
import GlobalStyles from '../../styles'
import LocalStyles from './styles.js'
import DefColors from '../../styles/defaultColors'
import Config from '../../config/config'
import DropDownPicker from 'react-native-dropdown-picker';
import {useAuth} from '../../contexts/auth'
import api from '../../services/api.js'

export default function({navigation}){

    const [baldes, setBaldes]= useState("");
    const [tiposColeta, setTiposColeta] = useState([
        {label: 'Em casa', value: 'casa'},
        {label: 'No ponto', value: 'ponto'},
      ]);
    const [open, setOpen] = useState(false);
    const [tipoColeta, setTipoColeta] = useState(null);

    const {user, signOut} = useAuth()  

    const solicitaColeta = () => {
        api.post("http://"+Config.apiBaseURL+"/coletas/addcoleta",{
            "id_cliente":user?.id_cliente,
            "tipo": tipoColeta,
            "local": user?.rua,
            "status": "Pendente",
            "qtd_baldes": baldes
        })
        .then((response)=> 
            alert("Coleta solicitada com sucesso")
        )
        .catch((err)=>{
            alert("erro" + err)
        });
    }

    const handleSignOut = () => {
        signOut();
    }

    function ValidaColeta(){
        if(tipoColeta != null && baldes != "")
            return true;
        return false
    }
    
    return(
        
       <View style={GlobalStyles.container}>
           
           <TextInput 
                style={LocalStyles.textInput}
                placeholder='Quantidade de Baldes' //Permitir apenas numeros
                placeholderTextColor={DefColors.placeHolderTextColor}
                onChangeText={text=>setBaldes(text)}
                keyboardType={"numeric"}
            />
            
            <DropDownPicker
                open={open}
                value={tipoColeta}
                items={tiposColeta}
                setOpen={setOpen}
                setValue={setTipoColeta}
                setItems={setTiposColeta}
                style={LocalStyles.dropDown}
                placeholder='Local da coleta'
                dropDownContainerStyle={LocalStyles.dropDownContainer}
            />

            {ValidaColeta() &&
            <TouchableOpacity 
                onPress={()=>solicitaColeta()}
                style={LocalStyles.btnSolicita}>
                    <Text style={LocalStyles.btnText}>
                       Solicitar
                    </Text>
            </TouchableOpacity>}
            {!ValidaColeta() &&
            <TouchableOpacity 
                style={LocalStyles.offBtnCadastro}>
                    <Text style={LocalStyles.btnText}>
                        Solicitar
                    </Text>
            </TouchableOpacity>}
            <Text/>
            <TouchableOpacity 
                onPress={()=>navigation.navigate('Coletas')}
                style={LocalStyles.btnSolicita}>
                    <Text style={LocalStyles.btnText}>
                       Minhas Coletas
                    </Text>
            </TouchableOpacity>
            <Text/>
            <TouchableOpacity 
                onPress={()=>handleSignOut()}
                style={LocalStyles.linkedText}>
                    <Text style={LocalStyles.btnText}>
                       Logout
                    </Text>
            </TouchableOpacity>

            

       </View>
    );
}