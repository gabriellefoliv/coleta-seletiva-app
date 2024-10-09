import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    questionText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: '#00907a',
    },
    button: {
        backgroundColor: '#00907a',
        padding: 15,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
        marginVertical: 10,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
        elevation: 5,
    },
    modalText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10,
    },
    modalPoints: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: 'bold'
    },
    modalButton: {
        backgroundColor: '#00907a',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        width: '50%',
        alignItems: 'center',
    },
});
