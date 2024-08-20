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

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Game" component={Game} />
        <Stack.Screen name="planta" component={Planta} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Desenvolvedores" component={Desenvolvedores} />
        <Stack.Screen name="UseTerms" component={TermsOfUseScreen} />
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
