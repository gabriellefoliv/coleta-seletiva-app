import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, StatusBar, KeyboardAvoidingView, ScrollView, Dimensions } from 'react-native';
import LocalStyles from './styles.js';
import { useAuth } from '../../contexts/auth';
import { COLORS, FONTS, icons, images } from '../../constants';
import Config from '../../config/config';
import api from '../../services/api.js';
import { PONTOS } from '../../constants/theme.js'
import BeigeBg from '../../assets/images/beige_bg.jpg'


export default function ({ navigation }) {


  return (
    <>
      <View style={LocalStyles.elements}>
        <Text style={LocalStyles.LojaTitle}>LOJA</Text>

        <Text style={LocalStyles.PontosTexto}>Quantidade de pontos = 0</Text>

      </View>
    </>
  );
}
