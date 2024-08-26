import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Footer from './src/components/Footer';
import About from './src/screens/About';
import Desenvolvedores from './src/screens/Desenvolvedores';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import TermsOfUseScreen from './src/screens/UseTerms';
import Planta from './src/screens/Planta';
import Game from './src/screens/Game';
import ConversaoPontos from './src/screens/ConversaoPontos';
import Coletor from './src/screens/Coletor';
import AboutScreen from './src/screens/Sobre';
import Loja from './src/screens/Loja';
import HomeColetor from './src/screens/HomeColetor';
import ScannerQRCode from './src/screens/ScannerQRCode';
import InfoColeta from './src/screens/InfoColeta';
import Coletas from './src/screens/Coletas';
import QRCode from './src/screens/QRCode';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Coletor" component={Coletor} />
        <Stack.Screen name="UseTerms" component={TermsOfUseScreen} />
        <Stack.Screen name="Sobre" component={AboutScreen} />
        <Stack.Screen name="Loja" component={Loja} />
        <Stack.Screen name="Game" component={Game} />
        <Stack.Screen name="Planta" component={Planta} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Desenvolvedores" component={Desenvolvedores} />
        <Stack.Screen name="InfoColeta" component={InfoColeta} />
        <Stack.Screen name="HomeColetor" component={HomeColetor} />
        <Stack.Screen name="ScannerQRCode" component={ScannerQRCode} />
        <Stack.Screen name="ConversaoPontos" component={ConversaoPontos} />
        <Stack.Screen name="QRCode" component={QRCode} />
        <Stack.Screen name="Coletas" component={Coletas} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
