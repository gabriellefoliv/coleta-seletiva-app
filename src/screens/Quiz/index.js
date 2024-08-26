import React, {useEffect, useState }  from 'react'
import { View, Text, Alert,
         TouchableOpacity , Modal,
         Image, StatusBar, ScrollView, ImageBackground,StyleSheet,Pressable} from 'react-native'
         
import {useAuth} from '../../contexts/auth'
import {COLORS,FONTS, icons, images, SIZES} from '../../constants'
import LocalStyles from './styles.js'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import LottieView from 'lottie-react-native';
import api from '../../services/api'
import config from '../../config/config'

export default function({route,navigation}){

    const {id} = route.params;

    const [Questao, setQuestao] = useState()
    const [questaoParams, setQuestaoParams] = useState({
        id: 0,
        texto: "teste texto pergunta",
        options: ["a", "b"],
        resposta: "b",
      }
    )
    const [OpcaoCorreta,setOpcaoCorreta] = useState()
    const [Opcao,setOpcao] = useState([])
    const {user, signOut} = useAuth()
    const [goBack,setGoBack] = useState();
    const canGoBack = Boolean(goBack)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleQrModal = () => setIsModalVisible(() => !isModalVisible);

    const handleFinish = () => {
      handleQrModal,
      navigation.goBack()
    }

    const pontos = () => {
      let ponto = 0;
      switch (id) {
        case 1:
          ponto = 1;
          break;
        case 2:
          ponto = 1.3;
          break;
        case 3:
          ponto = 1.6;
          break;
        case 4:
          ponto = 2;
          break;
      }
      return ""+ponto;
    }

    useEffect(() => {
        getQuestao(id)
    }, []);
    
    const [OpcaoSelecionada, setOpcaoSelecionada] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [VerificaResposta, setVerificaResposta] = useState(false);

    const MudaCheck = (selecionada) =>{
        for(let i=0; i<Opcao.length; i++){
            if(Opcao[i]==selecionada){
                setOpcaoSelecionada(Opcao[i])            
            }
        }

    }
    
    const acertaQuestao = () => {
        api.patch("http://"+config.apiBaseURL+"/clientes/addpontos/"+user.id+"/2")
        .then(() =>{
            api.patch("http://"+config.apiBaseURL+"/clientes/sobenivel/"+user.id)
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            })
        })
        .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        })
    }
      
    const ValidaQuestao = () => {
        if(OpcaoSelecionada==OpcaoCorreta){
            setModalVisible(true)
            setVerificaResposta(true)
            acertaQuestao()
         
        }
        else if(OpcaoSelecionada!=OpcaoCorreta){
            setModalVisible(true)
            setVerificaResposta(false)
            
        }    
    }

    const perguntaVerdadeiroFalso = () => {
        const rand = Math.floor(Math.random() * 6);
    
        if (rand === 0) {
          return {
            texto: "A reciclagem é uma prática ambiental importante, pois ajuda a reduzir a quantidade de lixo que acaba em aterros sanitários.",
            resposta: "Verdadeiro",
          };
        }
        if (rand === 1) {
          return {
            texto: "As florestas tropicais são importantes para a manutenção do equilíbrio ambiental e para a conservação da biodiversidade.",
            resposta: "Verdadeiro",
          };
        }
        if (rand === 2) {
          return {
            texto: "A poluição do ar é um problema ambiental que afeta principalmente as grandes cidades.",
            resposta: "Verdadeiro",
          };
        }
        if (rand === 3) {
          return {
            texto: "A poluição da água é um problema ambiental que afeta apenas os ecossistemas aquáticos.",
            resposta: "Falso",
          };
        }
        if (rand === 4) {
          return {
            texto: "A água é um recurso renovável, portanto, não é necessário se preocupar com o seu desperdício.",
            resposta: "Falso",
          };
        }
        if (rand === 5) {
          return {
            texto: "A sustentabilidade é um conceito que se aplica apenas às questões ambientais, não tendo relação com aspectos sociais e econômicos.",
            resposta: "Falso",
          };
        }
      };
    
      const getRandomQuestion = () => {
        const opts = ["Verdadeiro", "Falso"];
        const pergunta = perguntaVerdadeiroFalso();
    
        const question = {
          id: 0,
          texto: pergunta.texto,
          options: opts,
          resposta: pergunta.resposta,
        };
    
        setQuestaoParams(question);
        return question;
      };
    
      const handleAnswer = (question, selectedOption) => {
        if (question.resposta === selectedOption) {
          if (playerRank < 10) {
            setPlayerRank(playerRank + 1);
          }
          alert("Resposta correta! Rank aumentou!");
        } else {
          alert("Tente novamente...");
        }
      };
    
      const renderQuestion = (question) => {
        return (
          <View style={LocalStyles.Question} key={question.id}>
            <Text>{question.texto}</Text>
            {question.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleAnswer(question, option)}
              >
                <Text>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      };

    const getQuestao = (id) => {
        let pergunta = 'a';
        let randQuest = getRandomQuestion();
        pergunta = randQuest.texto;

        if (id == 1){
            setQuestao(pergunta);
        }
    }

    return(
        
        <ScrollView horizontal={false} style={LocalStyles.container}>
            
            
            <StatusBar translucent={true} backgroundColor={'transparent'} />

            <ImageBackground
                style = {LocalStyles.imageBG}
                source={images.quiz}
                resizeMode='cover'>

                <View style={LocalStyles.topContainer}>
               
                    <View style={LocalStyles.header} >
            
                            <Text style={{...FONTS.h3, color: COLORS.white, paddingTop: SIZES.height *0.055, paddingLeft: SIZES.width * 0.06}}>
                                Quiz { id }
                            </Text>

                    </View>

                    <View style = {{ width: '100%',flex: 2, alignItems:'center'}}>
                
                   
                        <Text variant="body" style={LocalStyles.subTitle}>
                            {Questao}
                        </Text>

                    </View>
                </View>

                <View style = {LocalStyles.buttonsArea} >
                    
                    {questaoParams.options.map(Opcao =>
                    <TouchableOpacity onPress={()=>MudaCheck(Opcao)} 
                        style={LocalStyles.menuButtons}
                        key={Opcao}>
                        <Text style={LocalStyles.menuButtonText}>
                            {Opcao}
                        </Text>
                        {Opcao == OpcaoSelecionada && 
                            <MaterialCommunityIcons name="check" style={{
                                color: COLORS.primaryBtn,
                                fontSize: 20,
                                alignItems: 'stretch',
                                position:'absolute',
                                left: '90%'
                            }} />
                        }
                        
                    </TouchableOpacity>
                    )}

                    <View>
                        <Modal  visible={isModalVisible} 
                                transparent = {true}
                                animationType='slide'
                                statusBarTranslucent= {true}>
                            <View
                                style={{backgroundColor:'#fff',borderRadius:25,
                                        height:'70%', width:'70%',position:'absolute', 
                                        top:((SIZES.height/3)-SIZES.height*0.2), right:((SIZES.width/2)-SIZES.width*0.35),
                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 2
                                        },
                                        shadowOpacity: 0.25,
                                        shadowRadius: 4,
                                        elevation: 5}}>
                                          
                                    <View //PARABÉNS //PONTOS //TROFÉU
                                        style={{flex:4}}>
                                            {VerificaResposta?
                                            <View //TEXTOS
                                                style={{flex:1, alignItems:'center',paddingTop:10}}>
                                                    <Text
                                                        style={{...FONTS.h1}}>
                                                        Parabéns
                                                    </Text>
                                                    <Text
                                                        style={{...FONTS.body3,paddingTop:10}}>
                                                        Você acertou e ganhou {pontos()} pontos!
                                                    </Text>
                                            </View>
                                            :<View
                                                style={{flex:1, alignItems:'center',paddingTop:10}}>
                                                    <Text
                                                        style={{...FONTS.h1}}>
                                                        Oops!
                                                    </Text>
                                                    <Text
                                                        style={{...FONTS.body3,paddingTop:10}}>
                                                        Você errou! Talvez na próxima...
                                                    </Text>
                                            </View>}
                                            <View
                                                style={{flex:1}}>
                                            {VerificaResposta? 
                                            <LottieView
                                                source={require('../../../Assets/9651-winner.json')}
                                                resizeMode='cover'
                                                style ={{flex:3,justifyContent:'center',alignItems:'center',marginBottom:70}}
                                                autoPlay 
                                                loop
                                            
                                            />:
                                            <LottieView
                                                source={require('../../../Assets/95614-error-occurred.json')}
                                                style ={{width: "100%", height:"100%", bottom: 30, left: 35,}}
                                                marginBottom={0}
                                                autoPlay 
                                                loop
                                            
                                            />
                                            }
                                            </View>
                                    </View>

                                    <View
                                        style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                                        <TouchableOpacity
                                            style={{backgroundColor:COLORS.primaryBtn, width:'40%',height:'50%', justifyContent:'center',alignItems:'center', top:90}}
                                            onPress={()=>{handleFinish()}}>
                                                <Text style={LocalStyles.bntOKText}>
                                                    Ok
                                                </Text>
                                        </TouchableOpacity>
                                    </View>
                                    
                                    <View //PARABÉNS //PONTOS //TROFÉU
                                        style={{flex:1}}>
                                            {VerificaResposta?
                                            <View //TEXTOS
                                                style={{alignItems:'center',bottom:140, left: 10, width: '90%', height:"200%", }}>
                                                    <Text
                                                        style={{...FONTS.body3,paddingTop:0}}>
                                                        A sustentabilidade abrange questões ambientais, sociais e econômicas, visando um equilíbrio entre esses três pilares.
                                                    </Text>
                                            </View>
                                            :<View
                                                style={{alignItems:'center',bottom:140, left: 10, width: '90%', height:"200%", }}>
                                                    <Text
                                                        style={{...FONTS.body3,paddingTop:0}}>
                                                        Resposta errada... A sustentabilidade abrange aspectos ambientais, sociais e econômicos, buscando uma abordagem holística para o desenvolvimento sustentável.
                                                    </Text>
                                            </View>
                                            }
                                            
                                    </View>

                            </View>
                        </Modal>
                    </View>
                         
                    <TouchableOpacity onPress={
                        ()=>{
                            console.log('antesDoSet'+canGoBack),
                            setGoBack(true),
                            ValidaQuestao(),
                            handleQrModal()
                        }
                        } style={LocalStyles.btnOK}>
                        <Text style={LocalStyles.bntOKText}>
                            OK
                        </Text>
                    </TouchableOpacity>
                    

                </View>

            </ImageBackground>
        </ScrollView>
    );
}

