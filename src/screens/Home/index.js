import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";


export default function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.quizButton} onPress={() => navigation.navigate("QuizLevels")}>
                <Text style={styles.quizTitle}>
                    Acessar quiz
                </Text>
            </TouchableOpacity>
        </View>
    )
}