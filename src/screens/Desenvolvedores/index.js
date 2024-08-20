//IMPORTS
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import LocalStyles from './styles.js';

//MAIN
export default function TermsOfUseScreen({ navigation }) {
  return (
    <View style={LocalStyles.container}>
      <View style={LocalStyles.main}>
        <Text style={LocalStyles.title}>Desenvolvedores</Text>
      </View>
      <View style={LocalStyles.intro}>
        <Text style={LocalStyles.introText}>
          Bem-vindo a página de desenvolvedores.
          Segue as páginas do github de cada dev:
        </Text>
      </View>
      <ScrollView style={LocalStyles.scrollView}>
        <Text style={LocalStyles.text}>
          Não sabemos o desenvolvedor, pois ele não colocou o próprio nome no aplicativo.
        </Text>
      </ScrollView>
    </View>
  );
}