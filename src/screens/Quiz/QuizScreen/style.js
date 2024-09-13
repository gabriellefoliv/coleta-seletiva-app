import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#E3F2FD',
    },
    quizContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    levelText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#1976D2',
    },
    question: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
    },
    optionButton: {
        backgroundColor: '#64B5F6',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 5,
    },
    optionText: {
        color: 'white',
        fontSize: 16,
    },
    modalView: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    modalText: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    closeButton: {
        backgroundColor: '#2196F3',
        borderRadius: 10,
        padding: 10,
        elevation: 2,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
});