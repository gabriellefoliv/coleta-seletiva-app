import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',  // Ajuste de fundo conforme necessário para harmonia
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  pointsContainer: {
    flexDirection: 'row',    
    justifyContent: 'space-between',  
    alignItems: 'center',    
    width: '100%',           
    paddingHorizontal: 100,
    paddingLeft: 90,
    marginTop: 10,
    marginBottom: 10,
  },
  pointsText: {
    fontSize: 10,
    textAlign: 'center',
    margin: 20,
    color: 'black',
  },
  points: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00807f', // Verde, ou outra cor em harmonia com a tela de histórico
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyButton: {
    backgroundColor: '#00907a', // Azul, ou outro contraste harmonioso
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  historyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});