import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    topContainer: {
        width: '100%',
        paddingVertical: 30,
        backgroundColor: '#00907a',
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    topText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        marginVertical: 5,
    },
    bottomContainer: {
        marginTop: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    quizButton: {
        padding: 18,
        width: "90%",
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        shadowColor: "#000", // Sombra para iOS
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5, // Sombra para Android
    },
    quizTitle: {
        color: '#000',
        marginLeft: 5,
        fontSize: 16,
        fontWeight: '500',
    },
});
