import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#00907a',
        alignItems: 'center',
        paddingTop: 30,

    },
    coletaContainer: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
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
    filterButton: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    filterButtonText: {
        color: '#00907a',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo opaco e semitransparente
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: 300,
        height: 450,
        backgroundColor: '#fff',
        padding: 0,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    filterTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5,
    },
    removeFilterButton: {
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: '#ff6666',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 5,

    },
    removeFilterButtonText: {
        color: '#fff',
        fontSize: 16,
    },

    closeButton: {
        backgroundColor: '#00907a',
        padding: 12,
        borderRadius: 8,
        marginTop: 0,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    rangeText: {
        borderRadius: 5, // Bordas arredondadas
        padding: 10, // Espaçamento interno
        textAlign: 'center', // Centraliza o texto
        fontSize: 16, // Tamanho da fonte
        color: '#fff', // Cor do texto
        fontWeight: 'bold', // Texto em negrito
    },

    coletaHeader: {
        width: '100%',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f8f8f8',
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginHorizontal: 25,
    },
    coletaList: {
        paddingBottom: 40,
    },
    coletaItem: {
        width: '100%',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    coletaData: {
        fontSize: 16,
        textAlign: 'center',
    },
    coletaPeso: {
        fontSize: 16,
        width: 60,
        textAlign: 'center',
    },
    separator: {
    },
    positionText: {
        fontSize: 18,
        color: "#333",
        textAlign: "center",
        marginVertical: 8
    },
})