import React from 'react';
import { Text, View , TouchableOpacity} from 'react-native';
import LocalStyles from './styles.js'

const HelloWorldApp = () => {
    return (
      <TouchableOpacity
      style={LocalStyles.caixa}
      >
      <>

        <View
        style={LocalStyles.viewTitulo}
        >
          <Text
          style={LocalStyles.titulo}
          >
            COP27: ‘Brasil escolheu parar a destruição da Amazônia’, diz Al Gore
          </Text>
        </View>

        <View
          style={LocalStyles.viewSubtitulo}
          >
          <Text
          style={LocalStyles.subtitulo}
          >
            Em referência ao resultado das eleições que elegeram Lula como presidente, ex-vice americano diz que mundo tem a 'base para a esperança' 
          </Text>
        </View>

      </>
      </TouchableOpacity>
    )
  }
  export default HelloWorldApp;