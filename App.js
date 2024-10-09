import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider } from "./src/context/auth";
import { NavigationContainer } from "@react-navigation/native";
import Home from './src/screens/Home';
import SignUp from './src/screens/Auth/SignUp';
import Login from "./src/screens/Auth/Login";
import Ranking from './src/screens/Ranking';
import QuizScreen from './src/screens/Quiz/QuizScreen';
import { QuizLevels } from './src/screens/Quiz/QuizLevels';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Home" component={Home} options={{ gestureEnabled: false }} />
          <Stack.Screen name="QuizLevels" component={QuizLevels} />
          <Stack.Screen name="QuizScreen" component={QuizScreen} />
          <Stack.Screen name="Ranking" component={Ranking} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  )
}

export default App;