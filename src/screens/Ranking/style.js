import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#00907a',
        alignItems: 'center',
    },
    trophy: {
        width: 250,
        height: 250,
        marginBottom: 20,
    },
    rankingList: {
        paddingBottom: 40,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between', // Alinha os itens na horizontal
        alignItems: 'center', // Alinha verticalmente os itens
    },
    position: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#00907a',
        textAlign: 'center',
        flex: 1, // Permite que o nome use o espaço restante
        marginHorizontal: 10, // Adiciona margem lateral
    },
    points: {
        fontSize: 16,
        color: '#333',
    },
});
