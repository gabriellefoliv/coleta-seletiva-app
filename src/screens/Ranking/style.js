import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#00907a',
        alignItems: 'center',
    },
    trophy: {
        marginTop: -30,
        width: 250,
        height: 250,
        marginBottom: 20,
    },
    dateText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center'
    },
    title: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    role: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ddd',
    },
    message: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        color: '#6c757d',
    },
    rankingContainer: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
        paddingHorizontal: 15, // Reduz o espaçamento lateral
        justifyContent: 'space-between',
    },
    rankingItem: {
        width: '100%',
        paddingVertical: 10, // Reduz a altura de cada item
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginHorizontal: 10,
        paddingRight: 25,
        paddingLeft: 0
    },
    position: {
        width: 40,
        fontSize: 14, // Reduz o tamanho da fonte
        fontWeight: 'bold',
        textAlign: 'left',
    },
    separator: {
        marginHorizontal: 10, // Ajusta o espaçamento dos separadores
        color: '#333',
    },
    separatorLeft: {
        marginHorizontal: 5,
    },
    separatorRight: {
        marginHorizontal: 5,
    },
    name: {
        flex: 1,
        fontSize: 14, // Reduz o tamanho da fonte
        fontWeight: 'bold',
        textAlign: 'center',
    },
    points: {
        fontSize: 14, // Reduz o tamanho da fonte
        width: 90,
        fontWeight: 'bold',
        textAlign: 'right',
        marginLeft: -10
    },
    headerText: {
        fontSize: 14, // Reduz o tamanho da fonte do cabeçalho
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    rankingList: {
        paddingBottom: 40,
    },
    totalCard: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 20,
        marginBottom: 20,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 4,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    totalPeso: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00907a',
    },

});