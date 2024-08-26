import React, {useEffect, useState} from "react";
import { View,Text, ScrollView,TouchableOpacity, Image, ImageBackground, Modal, StyleSheet, Pressable } from "react-native";
import LocalStyles from './styles.js'
import { StatusBar } from 'react-native';
import { COLORS, FONTS, SIZES } from "../../constants/theme.js";
import icons from "../../constants/icons.js";
import images from "../../constants/images.js";

export default function({navigation}){

    const rankCondition1 = 0, rankCondition2 = 3, rankCondition3 = 6, rankCondition4 = 9;
    const debbuging = false;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [load, setLoad] = useState(true)
    const [playerRank, setPlayerRank] = useState(1); // Example player rank (can be dynamic)
    const [questionList, setQuestionList] = useState([]);

    const init = async () => {
        
      };
    

      const handleQuizzSelection = (rank) => {
        if (playerRank >= rank){
          //alert("Sim");
          let idQuiz = 1; 
          if (rank >= rankCondition4){
            idQuiz = 4;
          }
          else if (rank >= rankCondition3){
            idQuiz = 3;
          }
          else if (rank >= rankCondition2){
            idQuiz = 2;
          }
          navigation.navigate('Quiz', {id: idQuiz})

        }
        else {
          alert("Rank insuficiente");
        }

      }
    
      useEffect(() => {
        navigation.addListener('focus', async () => setLoad(!load));
        init();
      }, [load, navigation]);
    
      return (
        <ImageBackground
          style={LocalStyles.container}
          source={images.blueBg}
          resizeMode='stretch'
        >
          
          {!debbuging && //BOTÃO DE DEBBUGING
            <TouchableOpacity style={LocalStyles.rankButton} onPress={() => setPlayerRank(playerRank + 1)}>
                <Image style={LocalStyles.rankButtonImage} source={images.ButtonBg}/>
                <Text style={LocalStyles.rankButtonText}>Increase Rank</Text>
            </TouchableOpacity>
          }

          <View style={LocalStyles.quizzButtons}>
            <TouchableOpacity style={LocalStyles.quizzButton} onPress={() => handleQuizzSelection(rankCondition1)}>
                <Image style={LocalStyles.quizzButtonImage} source={images.ButtonBg}/>
                <Text style={LocalStyles.quizzButtonText}>Fácil</Text>
            </TouchableOpacity>

            <TouchableOpacity style={LocalStyles.quizzButton} onPress={() => handleQuizzSelection(rankCondition2)}>
                <Image style={LocalStyles.quizzButtonImage} source={images.ButtonBg}/>
                <Text style={LocalStyles.quizzButtonText}>Medio</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={LocalStyles.quizzButton} onPress={() => handleQuizzSelection(rankCondition3)}>
                <Image style={LocalStyles.quizzButtonImage} source={images.ButtonBg}/>
                <Text style={LocalStyles.quizzButtonText}>Difícil</Text>
            </TouchableOpacity>

            <TouchableOpacity style={LocalStyles.quizzButton} onPress={() => handleQuizzSelection(rankCondition4)}>
                <Image style={LocalStyles.quizzButtonImage} source={images.ButtonBg}/>
                <Text style={LocalStyles.quizzButtonText}>Extremo</Text>
            </TouchableOpacity>
            
          </View>

          <Text style={LocalStyles.quizzTitle}> Quizz Rank: {playerRank}</Text>
        </ImageBackground>
      )
    }