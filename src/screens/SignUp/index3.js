import React, {useState} from 'react'
import { View,
    TextInput, Text,
    TouchableOpacity, 
    ScrollView,KeyboardAvoidingView,Image, StatusBar, Alert} from 'react-native'

import { mask,unMask } from 'remask'
import LocalStyles from './styles.js'
import GlobalStyles from '../../styles'
import DefColors from '../../styles/defaultColors'
import api from '../../services/api.js'
import Config from '../../config/config'
import {COLORS,FONTS, icons, images} from '../../constants'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function({route,navigation,}){
    
    function ValidaEndereco(){
        if(cep=='' | rua=='' | bairro=='' | numero=='' | cidade=='' | estado=='' ){
            return false
        }
        return true
    }

    const [endereco, setEndereco]= useState('');
    const [rua, setRua]= useState('');
    const [bairro, setBairro]= useState('');
    const [numero, setNumero]= useState('');
    const [cidade, setCidade]= useState('');
    const [estado, setEstado]= useState('');
    const [cep, setCep]= useState('');
    const [complemento, setComplemento]= useState('');
    const [siafi,setSiafi]= useState('')
    //JOGO
    
    const {nome} = route.params;
    const {cpf} = route.params;
    const {celular} = route.params;
    const {email} = route.params;
    const {usuario} = route.params;
    const {senha} = route.params;
    const {confSenha} = route.params;

    function buscarCep(cep){
        
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json()).then(data=>{
            if("erro" in data){
                setRua('')
                setBairro('')
                setCidade('')
                setEstado('')
                setNumero('')
                setComplemento('')
                setSiafi('')  
                setCep('')  
            }
            else{
                setRua(data.logradouro)
                setBairro(data.bairro)
                setCidade(data.localidade)
                setEstado(data.uf)
                setNumero(data.complemento)
                setSiafi(data.siafi)
            }    
        })  
        .catch(erro => {
            console.log(erro)    
        });
              
    }

    function ValidaCep() {
        
        const res = /^[0-9]{5}-[0-9]{3}$/;
        if(res.test(String(cep).toLowerCase())){
            return true
        }
        return false
        
    }


    function ValidaCadastro(){
        
        if(ValidaEndereco()){
            return true;
        }
        
        return false;

    }

    function handleSignUp(){
        Alert.alert("", "Cadastro realizado com sucesso");
        navigation.navigate('SignIn');
    }

    const cadastro = () => {
        api.post("http://"+Config.apiBaseURL+"/users/adduser",{
            "nome": nome,
            "email": email,
            "usuario": usuario,
            "senha": senha,
            "cpf": cpf,
            "rua": rua,
            "bairro": bairro,
            "numero": numero,
            "cidade": cidade,
            "estado": estado,
            "cep": cep,
            "complemento": complemento,
            "celular": celular,
            "permissao": 0

        })
        .then((response) => handleSignUp() )
        .catch(function (error) {
            console.error("ops! ocorreu um erro" + error);
     });
    }
    
    return(
        
        <KeyboardAvoidingView style= {LocalStyles.container} 
        behavior={"padding"}
        keyboardVerticalOffset={100}
        enabled={false} /*View principal de trás*/ >
            
            <StatusBar translucent={true} backgroundColor={'transparent'} /> 

            <View style = {LocalStyles.topContainer} /* Quadrado de cima (fundo)*/>
                <View style={{flex: 1,alignItems: 'center',}} /* itens da frente */>
                    
                    <View //cabeçalho
                        style={LocalStyles.cabecalho}>
                            <Text style={LocalStyles.title}>
                                
                            </Text>
    
                    </View>

                    <View //card de login
                        style={LocalStyles.loginCard}>
                            
                            <Text style = {LocalStyles.subTitle}>Cadastro</Text>

                            <Text style = {LocalStyles.description}>
                                Preencha seu endereço
                            </Text>
                            
                            <View style={LocalStyles.textSection_Conteiner}>
                                <View style={LocalStyles.textSection}>
                                <Image
                                    source={icons.cep}
                                    resizeMode='contain'
                                    style={LocalStyles.imageIcon}
                                />
                                <TextInput 
                                    style={ cep && !ValidaCep() ? LocalStyles.textInputError : LocalStyles.textInput}
                                    placeholder="CEP"
                                    placeholderTextColor={COLORS.placeHolderTextColor}
                                    onChangeText={text=>setCep(mask(unMask(text),'99999-999'))}
                                    value={cep}   
                                    keyboardType={"numeric"}
                                />
                                 </View>

                                <View style={LocalStyles.btnBuscar}>
                                
                                <TouchableOpacity 
                                    onPress={()=>buscarCep(cep)}>
                                    <Image
                                    source={icons.source}
                                    resizeMode='contain'
                                    style={LocalStyles.imageIcon}
                                />
                                </TouchableOpacity>
                                </View>

                                
                            </View>
                            
                    
                            <View style={LocalStyles.textSection}>
                                <MaterialCommunityIcons name="home" style={{
                                    color: COLORS.gray,
                                    fontSize:22,
                                    marginLeft: 10,
                                    marginRight: 5,
                                    }} 
                                />
                                <TextInput 
                                    style={LocalStyles.textInput}
                                    placeholder="Rua"
                                    placeholderTextColor={DefColors.placeHolderTextColor}
                                    onChangeText={text=>setRua(text)}
                                    value={rua}
                                />
                            </View>

                            <View  style={LocalStyles.textSection_Conteiner}>
                                <View style={LocalStyles.textSection}>
                                    <MaterialCommunityIcons name="home-floor-1" style={{
                                        color: COLORS.gray,
                                        fontSize:22,
                                        marginLeft: 10,
                                        marginRight: 5,
                                        }} 
                                    />
                                    <TextInput 
                                        style={LocalStyles.textInput}
                                        placeholder="Número"
                                        placeholderTextColor={DefColors.placeHolderTextColor}
                                        onChangeText={text=>setNumero(text)}
                                        value={numero}
                                    />
                                </View>

                                <View style={LocalStyles.textSection_PorcMedia}>
                                    <MaterialCommunityIcons name="home-plus" style={{
                                        color: COLORS.gray,
                                        fontSize:22,
                                        marginLeft: 10,
                                        marginRight: 5,
                                        }} 
                                    />
                                    <TextInput 
                                        //style={LocalStyles.textInput1}
                                        placeholder="Complemento"
                                        placeholderTextColor={DefColors.placeHolderTextColor}
                                        onChangeText={text=>setComplemento(text)}
                                        value={complemento}
                                    />
                                </View>
                            </View>
                            

                            <View style={LocalStyles.textSection}>
                                    <MaterialCommunityIcons name="home-city" style={{
                                        color: COLORS.gray,
                                        fontSize:22,
                                        marginLeft: 10,
                                        marginRight: 5,
                                        }} 
                                    />
                                <TextInput 
                                    style={LocalStyles.textInput}
                                    placeholder="Bairro"
                                    placeholderTextColor={DefColors.placeHolderTextColor}
                                    onChangeText={text=>setBairro(text)}
                                    value={bairro}
                                />
                            </View>

                            <View  style={LocalStyles.textSection_Conteiner}>
                                <View style={LocalStyles.textSection}>
                                    <MaterialCommunityIcons name="city" style={{
                                        color: COLORS.gray,
                                        fontSize:22,
                                        marginLeft: 10,
                                        marginRight: 5,
                                        }} 
                                    />
                                    <TextInput 
                                        style={LocalStyles.textInput}
                                        placeholder="Cidade"
                                        placeholderTextColor={DefColors.placeHolderTextColor}
                                        onChangeText={text=>setCidade(text)}
                                        value={cidade}
                                    />
                                </View>

                                <View style={LocalStyles.textSection_PorcMenor}>
                                    <MaterialCommunityIcons name="order-alphabetical-ascending" style={{
                                        color: COLORS.gray,
                                        fontSize:22,
                                        marginLeft: 10,
                                        marginRight: 5,
                                        }} 
                                    />
                                    <TextInput 
                                        style={LocalStyles.textInput}
                                        placeholder="UF"
                                        placeholderTextColor={DefColors.placeHolderTextColor}
                                        onChangeText={text=>setEstado(text)}
                                        value={estado}
                                    />
                                </View>
                            </View>

                            
                            
                            {ValidaCadastro() && 
                            <TouchableOpacity 
                                onPress={()=>cadastro()}
                                style={LocalStyles.btnCadastro}>
                                    <Text style={LocalStyles.btnText}>
                                        Cadastrar
                                    </Text>
                            </TouchableOpacity>}
                            
                            {!ValidaCadastro() &&
                            <TouchableOpacity 
                                style={LocalStyles.offBtnCadastro}>
                                    <Text style={LocalStyles.btnText}>
                                        Cadastrar
                                    </Text>
                            </TouchableOpacity>}
                           
                    </View>

                    <View style = {{ bottom: "-90%", width: '100%', height: '10%', alignItems: 'center'}}>
                        <Text style = {{ color: '#000'}}>
                            SigCol Residuos © 2021
                        </Text>
                    </View>
                    
                </View>
            </View>
        </KeyboardAvoidingView>
        
        
    );
}
/*
<TextInput 
                    style={LocalStyles.textInput}
                    placeholder="CEP"
                    placeholderTextColor={DefColors.placeHolderTextColor}
                    onChangeText={text=>setCep(mask(unMask(text),'99999-999'))}
                    value={cep}   
                    keyboardType={"numeric"}
                />
                <Text/>
                
                <TouchableOpacity 
                    onPress={()=>buscarCep(cep)}
                    style={LocalStyles.btnBuscar}>
                        <Text style={LocalStyles.btnText}>
                            Buscar
                        </Text>
                </TouchableOpacity>

                { siafi ? <View style={{alignItems:'center'}}>
                    <TextInput 
                        style={LocalStyles.textInput1}
                        placeholder="Rua"
                        placeholderTextColor={DefColors.placeHolderTextColor}
                        onChangeText={text=>setRua(text)}
                        value={rua}
                    />
                    <Text style={LocalStyles.error}>{!rua && 'Preencha a Rua'}</Text>

                    <TextInput 
                        style={LocalStyles.textInput1}
                        placeholder="Número"
                        placeholderTextColor={DefColors.placeHolderTextColor}
                        onChangeText={text=>setNumero(text)}
                        value={numero}
                    />
                    <Text style={LocalStyles.error}>{!numero && 'Preencha o Numero'}</Text>

                    <TextInput 
                        style={LocalStyles.textInput1}
                        placeholder="Complemento"
                        placeholderTextColor={DefColors.placeHolderTextColor}
                        onChangeText={text=>setComplemento(text)}
                        value={complemento}
                    />
                    <Text/>

                    <TextInput 
                        style={LocalStyles.textInput1}
                        placeholder="Bairro"
                        placeholderTextColor={DefColors.placeHolderTextColor}
                        onChangeText={text=>setBairro(text)}
                        value={bairro}
                    />
                   <Text style={LocalStyles.error}>{!bairro && 'Preencha o Bairro'}</Text>

                    <TextInput 
                        style={LocalStyles.textInput1}
                        placeholder="Cidade"
                        placeholderTextColor={DefColors.placeHolderTextColor}
                        onChangeText={text=>setCidade(text)}
                        value={cidade}
                    />
                   <Text style={LocalStyles.error}>{!cidade && 'Preencha a Cidade'}</Text>

                    <TextInput 
                        style={LocalStyles.textInput1}
                        placeholder="Estado"
                        placeholderTextColor={DefColors.placeHolderTextColor}
                        onChangeText={text=>setEstado(text)}
                        value={estado}
                    />
                    <Text style={LocalStyles.error}>{!estado && 'Preencha o Estado'}</Text>
                    

                    
                </View> : null 
                }
*/