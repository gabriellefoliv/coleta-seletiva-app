import React, { useState } from 'react';
import { View, Text, TextInput, Button , Alert} from 'react-native';
import axios from 'axios';

function ConversaoPontos() {
  const [partner, setPartner] = useState('');
  const [token, setToken] = useState('');
  const [cpf, setCpf] = useState('');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState('');
  const [autonum, setAutonum] = useState('');
  const [credited, setCredited] = useState('');
  const [rate, setRate] = useState('');
  const [balance, setBalance] = useState('');

  const handleSubmit = async () => {
    const data = {
      partner: partner,
      token: token,
      cpf: cpf,
      description: description,
      points: points,
      autonum: autonum
    };

    try {
      const response = await axios.post(
        'https://reciclopontos.com.br/api/partner_rate.php',
        JSON.stringify(data),
        { headers: { 'Content-Type': 'application/json' } }
      );

     const responseData = response.data;
      setCredited(responseData.credited);
      setRate(responseData.rate);
      setBalance(responseData.balance);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Parceiro"
        value={partner}
        onChangeText={(text) => setPartner(text)}
      />
      <TextInput
        placeholder="Token"
        value={token}
        onChangeText={(text) => setToken(text)}
      />
      <TextInput
        placeholder="CPF"
        value={cpf}
        onChangeText={(text) => setCpf(text)}
      />
      <TextInput
        placeholder="Descrição"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <TextInput
        placeholder="Pontos"
        value={points}
        onChangeText={(text) => setPoints(text)}
      />
      <TextInput
        placeholder="Autonum"
        value={autonum}
        onChangeText={(text) => setAutonum(text)}
      />
      <Button title="Converter" onPress={handleSubmit} style={{
        position: 'absolute',
        top: 200,
        alignSelf: 'flex-end',
        margin: 200,
      }} />
      {!credited ? (
        <View>
          <Text>
            Crédito: {credited}
          </Text>
          <Text>
            Taxa: {rate}
          </Text>
          <Text>
            Saldo: {balance}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

export default ConversaoPontos;