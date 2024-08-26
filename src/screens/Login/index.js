

import React, {useState }  from 'react'
import { View,
         TextInput, Text,
         TouchableOpacity, 
         Image, StatusBar, KeyboardAvoidingView} from 'react-native'
         
import {useAuth} from '../../contexts/auth'
import {COLORS,FONTS, icons, images} from '../../constants'
import LocalStyles from './styles.js'
import Config from '../../config/config'
import api from '../../services/api.js'

export default function({navigation}){
    
    const [usuario, setUsuario]         = useState('');
    const [senha, setSenha]             = useState('');
    const [loginError,setLoginError]    = useState(false);

    const {signIn} = useAuth();

    async function handleSign(user) {
        signIn(user);
    }

    const login = () => {
        api.get("http://"+Config.apiBaseURL+"/users/",{
            "usuario" : usuario,
            "senha" : senha
        })
        .then((response) => 
            handleSign(usuario)
        )
        .catch((err) => {
            setLoginError(true)
          });
    }
    
    

    return(
        <KeyboardAvoidingView style= {LocalStyles.container} 
        behavior={"padding"}
        keyboardVerticalOffset={0}
        enabled={false} /*View principal de trás*/ >
        <View style={{flex: 1}}>
            
            <StatusBar translucent={true} backgroundColor={'transparent'} />
        
            <View style = {LocalStyles.topContainer} /* Quadrado de cima (fundo)*/>
                <View style={{flex: 1,alignItems: 'center',}} /* itens da frente */>
                    
                    <View //cabeçalho
                        style={LocalStyles.cabecalho}>
                            <Text style={LocalStyles.title}>
                                
                            </Text>
                            <Image
                                source={images.logoNova}
                                style={LocalStyles.logo}
                            />
                    </View>
                    
                    <View //card de login
                        style={LocalStyles.loginCard}>
                            <Text style = {LocalStyles.subTitle}>Login</Text>

                            <Text style = {LocalStyles.description}>
                                Entre com seu usuário ou email
                            </Text>
                            {loginError && <Text style = {{paddingBottom: 8, color: COLORS.error, ...FONTS.body4}}>Usuário ou senha incorretos</Text>}
                            
                            <View style={loginError? LocalStyles.textSectionError : LocalStyles.textSection}>
                                <Image
                                    source={icons.userGray}
                                    resizeMode='contain'
                                    style={LocalStyles.imageIcon}
                                />
                                <TextInput 
                                    style={loginError? LocalStyles.textInputError : LocalStyles.textInput}
                                    placeholder='Usuário/Email' //Breve logar com usuário ou email também
                                    placeholderTextColor={COLORS.placeHolderText}
                                    onChangeText={text=>setUsuario(text)}
                                />
                            </View>

                            <View style={loginError? LocalStyles.textSectionError : LocalStyles.textSection}>
                                <Image
                                    source={icons.passwordGray}
                                    resizeMode='contain'
                                    style={LocalStyles.imageIcon}
                                />

                                <TextInput 
                                    style={loginError? LocalStyles.textInputError : LocalStyles.textInput}
                                    placeholder='Senha'
                                    placeholderTextColor={COLORS.placeHolderText}
                                    secureTextEntry={true}
                                    onChangeText={text=>setSenha(text)}
                                />
                            </View>

                            <TouchableOpacity 
                                onPress={()=>login()}
                                style={LocalStyles.btnEntrar}>
                                    <Text style={LocalStyles.btnText}>
                                    Entrar
                                    </Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={()=>{navigation.navigate('SignUp')}}
                                style={LocalStyles.btnRegistrar}>
                                    <Text style={LocalStyles.btnRegistrarText}>
                                    Registrar
                                    </Text>
                            </TouchableOpacity>
                    </View>

                    
                    
                </View>
                
            </View>
            </View>
            <View style = {LocalStyles.bottom}>
                        <Text style = {{ color: '#000'}}>
                            Sigcol Residuos © 2021
                        </Text>
                    </View>
            
        </KeyboardAvoidingView>
        
        
        
    );
}