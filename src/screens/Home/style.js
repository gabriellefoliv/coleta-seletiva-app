import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    topContainer: {
        width: '100%',
        height: 300,
        backgroundColor: '#00907a',
        borderEndEndRadius: 20,
        padding: 20,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    topText: {
        flexDirection: 'column',
        marginLeft: 20,
        padding: 10,
        justifyContent: 'center',
        gap: 5,
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold'
    },
    welcome: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#ddd'
    },
    bottomContainer: {
        marginTop: 20,
        width: '100%',
        height: 'auto',
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
        justifyContent: 'center',
        gap: 10,
        // Sombra para iOS
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        // Sombra para Android
        elevation: 5,
    },
    quizTitle: {
        color: '#000',
        fontSize: 18,
        marginLeft: 5
    }
})