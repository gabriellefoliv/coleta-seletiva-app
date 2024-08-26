import React, {useState} from 'react'
import { View,
         TextInput, Text,
         TouchableOpacity, 
         ScrollView,KeyboardAvoidingView,Image, StatusBar, Keyboard} from 'react-native'
import { mask,unMask } from 'remask'
import LocalStyles from './styles.js'
import {COLORS,FONTS, icons, images} from '../../constants'

var interruptorValidaCpf = true;

export default function({navigation}){

    function TestaCPF(strCPF) {
        if(!interruptorValidaCpf)
            return true
        var Soma;
        var Resto;
        var i;
        Soma = 0;   
        if (strCPF == "00000000000")
            return false;
        for (i=1; i<=9; i++)
            Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i); 
        Resto = (Soma * 10) % 11;
        if ((Resto == 10) || (Resto == 11)) 
            Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10)) )
            return false;
        Soma = 0;
        for (i = 1; i <= 10; i++)
            Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;
        if ((Resto == 10) || (Resto == 11)) 
            Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11) ) )
            return false;
        return true;
    }
  
    function ValidaNome(){
        const regex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;
        if(regex.test(String(nome).toLowerCase())){
            return true
        }
        return false
    }

    function ValidaCelular() {
        const reg = /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/;
        if (reg.test(String(celular).toLowerCase())) {
            return true
        }
        return false
    }

    const [nome, setNome]= useState('');
    const [cpf, setCPF]= useState('');
    const [celular, setCelular]= useState('');
    const [regError,setregError] = useState(false);
    
    
    function ValidaCadastro(){
        
        if(TestaCPF(unMask(cpf)) && ValidaNome() && ValidaCelular()){
            return true;
        }  
        return false;
    }

    function handleSignUp(){
        alert("ok");
        navigation.navigate('SignIn');
    }
    
    const cadastroErro = () => {
            setregError(true)
    }

    function handleSignUp(){
        alert("ok");
        navigation.navigate('SignIn');
    }
    
    //const headerHeight = useHeaderHeight();
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
                                Preencha seu nome, CPF e celular
                            </Text>
                            
                            {regError && <Text style = {{paddingBottom: 8, color: COLORS.error, ...FONTS.body4}}>Nome, CPF ou Telefone inválido(s)</Text>}	

                            <View style={LocalStyles.textSection}>
                                <Image
                                    source={icons.nome}
                                    resizeMode='contain'
                                    style={LocalStyles.imageIcon}
                                />
                                <TextInput 
                                    style={!ValidaNome() && nome ? LocalStyles.textInputError : LocalStyles.textInput}
                                    placeholder="Nome"
                                    placeholderTextColor={COLORS.placeHolderTextColor}
                                    onChangeText={text=>setNome(text)}
                                />
                            </View>

                            <View style={LocalStyles.textSection}>
                                <Image
                                    source={icons.cpf}
                                    resizeMode='contain'
                                    style={LocalStyles.imageIcon}
                                />

                                <TextInput 
                                    style={cpf && !TestaCPF(unMask(cpf))? LocalStyles.textInputError : LocalStyles.textInput}
                                    placeholder="CPF"
                                    placeholderTextColor={COLORS.placeHolderTextColor}
                                    onChangeText={text=>setCPF(mask(unMask(text),'999.999.999-99'))}
                                    value={cpf}
                                    keyboardType={"numeric"}
                                />                                
                            </View>

                            <View style={LocalStyles.textSection}>
                                <Image
                                    source={icons.tel}
                                    resizeMode='contain'
                                    style={LocalStyles.imageIcon}
                                />

                                <TextInput 
                                    style={celular && !ValidaCelular()? LocalStyles.textInputError : LocalStyles.textInput}

                                    placeholder="Celular"
                                    placeholderTextColor={COLORS.placeHolderTextColor}
                                    onChangeText={text=>setCelular(mask(unMask(text),'(99) 99999-9999'))}
                                    value={celular}
                                    keyboardType={"numeric"}
                                />
                                
                            </View>

                            {ValidaCadastro() && 
                            <TouchableOpacity 
                                onPress={()=>{navigation.navigate('SignUp2',{nome:nome,cpf:cpf,celular:celular})}}
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