import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#E8F5E9',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2E7D32',
    },
    quizContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    levelButton: {
        backgroundColor: '#66BB6A',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        width: '80%',
        alignItems: 'center',
    },
    levelText: {
        color: 'white',
        fontSize: 18,
    },
});