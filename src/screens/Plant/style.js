import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    Area:{
        width: '100%',
        height: '100%',
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#fff',
        //backgroundColor: '#c7edfc'
    },
    Text:{
        width: "100%",
    },
    planta:{
        // Defina o tamanho desejado da imagem
        width: 500, // ajuste para o tamanho que preferir
        height: 500, // ajuste para o tamanho que preferir
        resizeMode: 'contain', // pode ser 'cover', 'contain', etc., dependendo do efeito desejado
        bottom: 60
    },
    area_planta:{
        flex: 2,
        alignContent: 'center',
        justifyContent: 'center',
        width: 100, // mantenha o mesmo tamanho da planta
        height: 100, // mantenha o mesmo tamanho da planta
        //backgroundColor: 'lightgray', // para visualizar a área, pode remover depois
        alignItems: 'center', // para centralizar a planta dentro da área
        borderRadius: 10, // exemplo de estilo opcional
    },
    botaoContainer: {
        position: 'absolute', // Para sobrepor na tela
        bottom: 30, // Colocar os botões à esquerda da tela
        //justifyContent: 'center', // Centraliza verticalmente
        height: 'auto',
        paddingBottom: 0,
        alignItems: 'center'
    },
    botaoAjuda:{
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
    },
    textoBotao: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
})