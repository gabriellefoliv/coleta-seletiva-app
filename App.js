import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider } from "./src/context/auth";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./src/screens/Home";
import SignUp from "./src/screens/Auth/SignUp";
import Login from "./src/screens/Auth/Login";
import Ranking from "./src/screens/Ranking";
import QuizScreen from "./src/screens/Quiz/QuizScreen";
import { QuizLevels } from "./src/screens/Quiz/QuizLevels";
import Plant from "./src/screens/Plant";
import Transacao from "./src/screens/Transacao";
import HistoricoColetas from "./src/screens/HistoricoColetas";
import HistoricoTransacoes from "./src/screens/HistoricoTransacoes";
import { LogBox } from "react-native";
import * as Notifications from "expo-notifications";

const Stack = createNativeStackNavigator();

const App = () => {
  LogBox.ignoreAllLogs(true); // Desativa avisos e erros da tela (apresentacoes e testes sem interferencia)

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldShowAlert: true,
      shouldSetBadge: true,
    }),
  });

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen name="QuizLevels" component={QuizLevels} />
          <Stack.Screen name="QuizScreen" component={QuizScreen} />
          <Stack.Screen name="Ranking" component={Ranking} />
          <Stack.Screen name="Plant" component={Plant} />
          <Stack.Screen name="Transacao" component={Transacao} />
          <Stack.Screen name="HistoricoColetas" component={HistoricoColetas} />
          <Stack.Screen
            name="HistoricoTransacoes"
            component={HistoricoTransacoes}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
