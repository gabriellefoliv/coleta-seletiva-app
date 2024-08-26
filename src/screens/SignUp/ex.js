import React, {useState} from 'react'
import { View,
         TextInput, Text,
         TouchableOpacity, 
         ScrollView} from 'react-native'

import { mask,unMask } from 'remask'
import LocalStyles from './styles.js'
import GlobalStyles from '../../styles'
import DefColors from '../../styles/defaultColors'
import api from '../../services/api.js'
import Config from '../../config/config'


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

    function ValidaEmail(){
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(String(email).toLowerCase())){
            return true;
        }
        return false;
    }

    function ValidaUsuario(){
        const regex = /\W/;
        if(regex.test(String(usuario).toLowerCase())){
            return false
        }
        return true
    }
    
    function ValidaNome(){
        const regex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;
        if(regex.test(String(nome).toLowerCase())){
            return true
        }
        return false
    }

    function ValidaEndereco(){
        if(cep=='' | rua=='' | bairro=='' | numero=='' | cidade=='' | estado=='' ){
            return false
        }
        return true
    }

    const [nome, setNome]= useState('');
    const [email, setEmail]= useState('');
    const [cpf, setCPF]= useState('');
    const [endereco, setEndereco]= useState('');
    const [usuario, setUsuario]= useState('');
    const [senha, setSenha]= useState('');
    const [confSenha, setConfSenha]= useState('');
    const [rua, setRua]= useState('');
    const [bairro, setBairro]= useState('');
    const [numero, setNumero]= useState('');
    const [cidade, setCidade]= useState('');
    const [estado, setEstado]= useState('');
    const [cep, setCep]= useState('');
    const [complemento, setComplemento]= useState('');
    const [celular, setCelular]= useState('');
    const [siafi,setSiafi]= useState('')
    
    function buscarCep(cep){
        setRua('')
        setBairro('')
        setCidade('')
        setEstado('')
        setNumero('')
        setComplemento('')
        setSiafi('')

        fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json()).then(data=>{
            setRua(data.logradouro)
            setBairro(data.bairro)
            setCidade(data.localidade)
            setEstado(data.uf)
            setSiafi(data.siafi)

        })  
        .catch(err => {
            console.log(err)
        });
    }

    function ValidaCadastro(){
        
        if(ValidaSenha() && SenhaCorresponde() 
        && TestaCPF(unMask(cpf)) && ValidaEmail()
        && ValidaUsuario() && ValidaNome() && ValidaEndereco()){
            return true;
        }
        
        return false;

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
        <ScrollView style={GlobalStyles.scrollView}>
            <View style={GlobalStyles.container}>
                <Text style={LocalStyles.title}>
                    Cadastro
                </Text>          
                
                <TextInput 
                    style={LocalStyles.textInput}
                    placeholder="Nome"
                    placeholderTextColor={DefColors.placeHolderTextColor}
                    onChangeText={text=>setNome(text)}
                />
                <Text style={LocalStyles.error}>{nome && !ValidaNome() &&'Nome Invalido'}</Text>
                
                <TextInput 
                    style={LocalStyles.textInput}
                    placeholder="Email"
                    placeholderTextColor={DefColors.placeHolderTextColor}
                    onChangeText={text=>setEmail(text)}
                />
                <Text style={LocalStyles.error}>{email &&!ValidaEmail(email)&&'Email invalido'}</Text>
                
                <TextInput 
                    style={LocalStyles.textInput}
                    placeholder="CPF"
                    placeholderTextColor={DefColors.placeHolderTextColor}
                    onChangeText={text=>setCPF(mask(unMask(text),'999.999.999-99'))}
                    value={cpf}
                    keyboardType={"numeric"}
                />
                <Text style={LocalStyles.error}>{cpf && !TestaCPF(unMask(cpf))&&'CPF invalido'}</Text>

                <TextInput 
                    style={LocalStyles.textInput}
                    placeholder="Celular"
                    placeholderTextColor={DefColors.placeHolderTextColor}
                    onChangeText={text=>setCelular(text)}
                />
                <Text/>
                <TextInput 
                    style={LocalStyles.textInput}
                    placeholder="Usuário"
                    placeholderTextColor={DefColors.placeHolderTextColor}
                    onChangeText={text=>setUsuario(text)}
                />
                <Text style={LocalStyles.error}>{usuario && !ValidaUsuario() && 'Usuario invalido'}</Text>

                <TextInput 
                    style={LocalStyles.textInput}
                    placeholder="Senha"
                    placeholderTextColor={DefColors.placeHolderTextColor}
                    secureTextEntry={true}
                    onChangeText={text=>setSenha(text)}
                />
                <Text style={LocalStyles.error}>{senha && !ValidaSenha(senha)&&'Senha Fraca'}</Text>

                <TextInput 
                    style={LocalStyles.textInput}
                    placeholder="Confirme sua senha"
                    placeholderTextColor={DefColors.placeHolderTextColor}
                    secureTextEntry={true}
                    onChangeText={text=>setConfSenha(text)}
                />
                <Text style={LocalStyles.error}>{confSenha && !SenhaCorresponde(confSenha)&&'Senha Incorreta'}</Text>
                
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


                {ValidaCadastro() && 
                <TouchableOpacity 
                    onPress={()=>cadastro()}
                    style={LocalStyles.btnCadastro}>
                        <Text style={LocalStyles.btnText}>
                            Registrar
                        </Text>
                </TouchableOpacity>}
                
                {!ValidaCadastro() &&
                <TouchableOpacity 
                    style={LocalStyles.offBtnCadastro}>
                        <Text style={LocalStyles.btnText}>
                            Registrar
                        </Text>
                </TouchableOpacity>}
                
            </View>
        </ScrollView>

    );
}




