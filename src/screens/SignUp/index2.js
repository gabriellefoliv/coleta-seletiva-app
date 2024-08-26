import React, {useState} from 'react'
import { View,
    TextInput, Text,
    TouchableOpacity
    ,KeyboardAvoidingView,Image, StatusBar, ScrollView} from 'react-native'
import LocalStyles from './styles.js'


import {COLORS,FONTS, icons, images} from '../../constants'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'



export default function({route,navigation,}){

  
    function ValidaEmail(){
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(String(email).toLowerCase())){
            return true;
        }
        return false;
    }

    function ValidaUsuario(){
        const regex = /\W/;
        if(regex.test(String(usuario).toLowerCase()) || !usuario){
            return false
        }
        return true
    }

    function ValidaSenha(){
        if(senha.length>7){
            return true;
        }
        return false;
    }

    function SenhaCorresponde(){
        if(confSenha == senha){
            return true;
        }
        return false;
    }
    
    const [email, setEmail]= useState('');
    const [usuario, setUsuario]= useState('');
    const [senha, setSenha]= useState('');
    const [confSenha, setConfSenha]= useState('');
    //const nome = props.nome;
    const {nome} = route.params;
    const {cpf} = route.params;
    const {celular} = route.params;
    
    const [regError, setregError] = useState(false)

    const cadastroErro = () => {
        setregError(true)
    }


    function ValidaCadastro(){
        
        if(ValidaSenha() && SenhaCorresponde() 
            && ValidaEmail() && ValidaUsuario()){
            return true;
        }  
        return false;
    }
    /*
    function handleSignUp(){
        alert("ok");
        navigation.navigate('SignIn');
    }*/
    

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
                                    Preencha seu email, usuario e senha
                                </Text>

                                {regError && <Text style = {{paddingBottom: 8, color: COLORS.error, ...FONTS.body4}}>E-mail inválido ou senhas não compatíveis.</Text>}                

                                
                                <View style={LocalStyles.textSection}>
                                    <Image
                                        source={icons.email}
                                        resizeMode='contain'
                                        style={LocalStyles.imageIcon}
                                    />
                                    <TextInput 
                                        style={email && !ValidaEmail() ? LocalStyles.textInputError : LocalStyles.textInput}
                                        placeholder="Email"
                                        placeholderTextColor={COLORS.placeHolderTextColor}
                                        onChangeText={text=>setEmail(text)}
                                    />
                                </View>

                                <View style={LocalStyles.textSection}>
                                    <Image
                                        source={icons.nome}
                                        resizeMode='contain'
                                        style={LocalStyles.imageIcon}
                                    />

                                    <TextInput 
                                        style={usuario && !ValidaUsuario() ? LocalStyles.textInputError : LocalStyles.textInput}
                                        placeholder="Usuario"
                                        placeholderTextColor={COLORS.placeHolderTextColor}
                                        onChangeText={text=>setUsuario(text)}
                                    />
                                    
                                </View>

                                <View style={LocalStyles.textSection}>
                                    <MaterialCommunityIcons name="lock" style={{
                                        color: COLORS.gray,
                                        fontSize:22,
                                        marginLeft: 10,
                                        marginRight: 5,
                                        }} 
                                    />

                                    <TextInput 
                                        style={senha && !ValidaSenha() ? LocalStyles.textInputError : LocalStyles.textInput}
                                        //style={LocalStyles.textInput}
                                        placeholder="Senha"
                                        placeholderTextColor={COLORS.placeHolderTextColor}
                                        secureTextEntry={true}
                                        onChangeText={text=>setSenha(text)}

                                    />                                
                                </View>

                                <View style={LocalStyles.textSection}>
                                    <MaterialCommunityIcons name="lock" style={{
                                        color: COLORS.gray,
                                        fontSize:22,
                                        marginLeft: 10,
                                        marginRight: 5,
                                        }} 
                                    />

                                    <TextInput 
                                        style={confSenha && !SenhaCorresponde()? LocalStyles.textInputError : LocalStyles.textInput}
                                        placeholder="Confirme sua senha"
                                        placeholderTextColor={COLORS.placeHolderTextColor}
                                        secureTextEntry={true}
                                        onChangeText={text=>setConfSenha(text)}
                                    />
                                </View>
                                

                                {ValidaCadastro() && 
                                <TouchableOpacity 
                                    onPress={()=>{navigation.navigate('SignUp3', {nome:nome,cpf:cpf,celular:celular,email:email,usuario:usuario,senha:senha,confSenha:confSenha})}}
                                    style={LocalStyles.btnCadastro}>
                                        <Text style={LocalStyles.btnText}>
                                            Próximo
                                        </Text>
                                </TouchableOpacity>}
                                
                                {!ValidaCadastro() &&
                                <TouchableOpacity 
                                    onPress={()=>cadastroErro()}
                                    style={LocalStyles.offBtnCadastro}>
                                        <Text style={LocalStyles.btnText}>
                                            Próximo
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