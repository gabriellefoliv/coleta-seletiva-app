import { StyleSheet } from 'react-native';
import { COLORS } from '../../assets/theme';

export const styles = StyleSheet.create({
    Area: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        //backgroundColor: '#c7edfc'
    },
    Text: {
        width: "100%",
    },
    planta: {
        // Defina o tamanho desejado da imagem
        width: 500, // ajuste para o tamanho que preferir
        height: 500, // ajuste para o tamanho que preferir
        resizeMode: 'contain', // pode ser 'cover', 'contain', etc., dependendo do efeito desejado
        bottom: 60
    },
    area_planta: {
        flex: 2,
        alignContent: 'center',
        justifyContent: 'center',
        width: 100, // mantenha o mesmo tamanho da planta
        height: 100, // mantenha o mesmo tamanho da planta
        //backgroundColor: 'lightgray', // para visualizar a área, pode remover depois
        alignItems: 'center', // para centralizar a planta dentro da área
        borderRadius: 10, // exemplo de estilo opcional
        marginLeft: 60
    },
    botaoContainer: {
        position: 'absolute', // Para sobrepor na tela
        bottom: 30, // Colocar os botões à esquerda da tela
        //justifyContent: 'center', // Centraliza verticalmente
        height: 'auto',
        paddingBottom: 0,
        alignItems: 'center'
    },
    botaoAjuda: {
        position: 'absolute', // Para sobrepor na tela
        bottom: 65,
        right: 30, // Colocar os botões à esquerda da tela
        justifyContent: 'center', // Centraliza verticalmente
        height: 'auto',
        paddingBottom: 0,
        color: 'gray'
    },
    botao: {
        backgroundColor: '#00907a',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20, // Espaçamento entre os botões
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 100
    },
    textoBotao: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    criarPlantaContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00907a',
    },

    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    pickerWrapper: {
        width: '90%',
        marginBottom: 20, // Espaço abaixo do Picker para evitar sobreposição
        zIndex: 1, // Garante que o Picker fique acima de outros elementos
    },
    picker: {
        height: 50,
        width: '100%', // Adapta à largura do contêiner
        backgroundColor: '#e0f7fa',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#00838f',
        paddingHorizontal: 10,
        color: '#006064',
    },
    criarPlantaButton: {
        width: '90%',
        backgroundColor: '#00695c',
        borderRadius: 8,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        zIndex: 0, // Garante que o botão fique abaixo do Picker
        color: 'white'
    },
    plantaContainer: {
        padding: 40,
    },
    plantTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        fontSize: 24,
    }

})