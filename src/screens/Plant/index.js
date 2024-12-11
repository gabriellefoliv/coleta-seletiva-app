import { api } from "../../lib/axios";
import { useRoute } from "@react-navigation/native";
import { AuthContext } from "../../context/auth";
import React, { useEffect, useContext, useState } from "react";
import Header from "../../components/Header";
import planta0 from "../../assets/images/planta/0.png";
import planta1 from "../../assets/images/planta/1.png";
import planta2 from "../../assets/images/planta/2.png";
import planta3 from "../../assets/images/planta/3.png";
import planta4 from "../../assets/images/planta/4.png";
import { styles } from "./style.js";
import GradientBackground from "../../components/Gradient/index.js";
import * as Notifications from "expo-notifications";
import { Button, Platform } from "react-native";

import {
  View,
  TextInput,
  Text,
  Alert,
  TouchableOpacity,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const PlantaPage = ({ navigation }) => {
  const route = useRoute();
  const { user } = useContext(AuthContext);
  const [plantaData, setPlantaData] = useState(null);
  const [tipoPlantas, setTipoPlantas] = useState([]);
  const [selectedTipoPlanta, setSelectedTipoPlanta] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [tempoRegaRestante, setTempoRegaRestante] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Is loading é ativo enquanto a planta ainda é carregada.
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  const agendarNotificacao = async (tempoRega) => {
    const status = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Lembrete",
        body: "É hora de regar a planta!",
        sound: "default", // Tocar o som padrão,
        vibrate: [0, 250, 250, 250],
      },
      trigger: {
        seconds: tempoRega / 1000, // Tempo em segundos após o qual a notificação será disparada
      },
    });

    console.log(status);
  };

  const formatarTempoRestante = (tempo) => {
    const horas = Math.floor(tempo / (1000 * 60 * 60)); // Calcula as horas
    const minutos = Math.floor((tempo % (1000 * 60 * 60)) / (1000 * 60)); // Calcula os minutos
    const segundos = Math.floor((tempo % (1000 * 60)) / 1000); // Calcula os segundos

    return `${horas.toString().padStart(2, "0")}:${minutos
      .toString()
      .padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`; // Formata o tempo como hh:mm:ss
  };

  const carregarPlanta = async () => {
    console.log("Em carregar planta, user = ", user);
    try {
      const response = await api.get(`/planta/${user.codCliente}`);
      const planta = response.data[0] || null; // Fallback para evitar null undefined
      setPlantaData(planta);
      if (planta) {
        setTempoRegaRestante(planta.tempoRestante);
        return planta.tempoRestante;
      }
    } catch (error) {
      console.error("Erro ao carregar planta:", error.message);
      setPlantaData(null); // Garante estado consistente
    } finally {
      setIsLoading(false);
    }
  };

  const carregarTiposPlanta = async () => {
    try {
      const response = await api.get(`/tipoPlanta`);
      const tipos = response.data.map((tipo) => ({
        label: tipo.nomeTipoPlanta,
        value: tipo.codTipoPlanta,
      }));
      setItems(tipos);
      setIsLoading(false); // Carregamento concluído
    } catch (error) {
      console.error("Erro ao carregar tipos de planta:", error.message);
      Alert.alert("Erro", "Não foi possível carregar os tipos de planta.");
    }
  };


  const criarPlanta = async () => {
    if (!selectedTipoPlanta) {
      alert("Por favor, selecione um tipo de planta.");
      return;
    }
    try {
      const response = await api.post(`/planta/${user.codCliente}`, {
        codTipoPlanta: selectedTipoPlanta,
      });
      alert(response.data.message);
      carregarPlanta(); // Atualiza a planta após criação
    } catch (error) {
      console.error("Erro ao criar planta:", error.message);
    }
  };

  const verificarTipoPlanta = async () => {
    if (!selectedTipoPlanta) return; // Evita execução se não houver tipo selecionado

    try {
      // Requisição para buscar todas as plantas do usuário
      const response = await api.get(`/planta/${user.codCliente}`);
      const plantas = response.data;

      // Procurar a planta que tem o tipo selecionado
      const plantaExistente = plantas.find(planta => planta.codTipoPlanta === selectedTipoPlanta);

      if (plantaExistente) {
        // Se a planta existe, renderiza a planta e mostra o nome do tipo
        setPlantaData(plantaExistente);
      } else {
        // Se a planta não existe, mostra o popup para criar uma nova planta
        Alert.alert(
          "Nova Planta",
          `Você deseja criar uma nova planta do tipo "${selectedTipoPlanta}"?`,
          [
            {
              text: "Sim",
              onPress: criarPlanta, // Cria nova planta
            },
            {
              text: "Cancelar",
              style: "cancel",
              onPress: () => setSelectedTipoPlanta(null), // Reseta o dropdown caso o usuário cancele
            },
          ]
        );
      }
    } catch (error) {
      console.error("Erro ao verificar tipo de planta:", error.message);
      Alert.alert("Erro", "Não foi possível verificar a planta selecionada.");
      setSelectedTipoPlanta(null); // Reseta o dropdown em caso de erro
    }
  };

  const handleTipoPlantaChange = (tipoPlantaSelecionada) => {
    setSelectedTipoPlanta(tipoPlantaSelecionada);
  };


  const regarPlanta = async () => {
    try {
      const response = await api.put(`/planta/rega/${user.codCliente}`);
      if (response.status === 200) {
        Alert.alert("Sucesso", "Planta regada com sucesso!");
        console.log("Regada");
        proximaRega = await carregarPlanta();
        agendarNotificacao(proximaRega);
        //setRefresh(!refresh);
      }
      setTempoRegaRestante(proximaRega); // Atualiza o tempo restante após regar
    } catch (error) {
      console.error("Erro ao regar planta:", error.message);
      Alert.alert("Error", "Erro ao regar a planta, pedimos desculpas");
    }
  };

  const coletarPlanta = async () => {
    try {
      const response = await api.post(`/planta/coleta/${user.codCliente}`);

      if (response.status === 200) {
        const message = await response.data.message;
        alert(message);
        setRefresh(!refresh);
      } else {
        const errorMessage = await response.text();
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Erro ao coletar planta:", error);
      Alert.alert("Error", "Erro ao colher a planta, pedimos desculpas");
    }
  };

  const pedirAjuda = async () => {
    Alert.alert(
      "Ajuda",
      "Regue a planta até ela atingir seu tamanho máximo, um botão de colher ficará disponível quando for o momento da colheita. Para verificar o tempo restante para regar novamente, basta clicar em regar."
    );
  };

  useEffect(() => {
    // Listener para quando uma notificação for recebida
    const notificacaoRecebida = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notificação recebida:", notification);
      }
    );

    // Listener para quando o usuário interagir com a notificação
    const notificacaoRespondida =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Resposta recebida da notificação:", response);
      });

    // Limpar listeners quando o componente for desmontado
    return () => {
      notificacaoRecebida.remove();
      notificacaoRespondida.remove();
    };
  }, []);

  // Função para o countdown do tempo restante
  useEffect(() => {
    if (tempoRegaRestante !== null && tempoRegaRestante > 0) {
      console.log(tempoRegaRestante);
      const interval = setInterval(() => {
        setTempoRegaRestante((prevTempo) => {
          const novoTempo = prevTempo - 1000; // Decrease 1 second (in milliseconds)
          if (novoTempo <= 0) {
            clearInterval(interval); // Clear interval when countdown ends
          }
          return novoTempo;
        });
      }, 1000); // Executa a cada segundo
      return () => clearInterval(interval); // Limpa o intervalo quando o componente desmontar ou tempoRestante for 0
    }
  }, [tempoRegaRestante]);

  useEffect(() => {
    const criarCanal = async () => {
      if (Platform.OS === "android") {
        const { status } = await Notifications.getPermissionsAsync(); // Verifica o status atual
        if (status !== "granted") {
          const { status: newStatus } =
            await Notifications.requestPermissionsAsync(); // Solicita permissão se não for concedida
          if (newStatus !== "granted") {
            alert("Permissão de notificação não concedida");
            return;
          }
        }

        // Configuração do canal de notificações
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.HIGH,
          sound: true,
          vibrate: [0, 250, 250, 250], // Vibração personalizada
        });
      }
    };
    criarCanal();
  }, []);

  useEffect(() => {
    verificarTipoPlanta();
  }, [selectedTipoPlanta])

  useEffect(() => {
    carregarPlanta();
    carregarTiposPlanta();
  }, [refresh]);

  useEffect(() => {
    if (plantaData) {
      //console.log(plantaData.estagio); // APAGAR DEPOIS
    }
  }, [plantaData]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="400" color="green" />
        <Text>Carregando dados da planta...</Text>
      </View>
    );
  } else {
    return (
      <>
        <Header navigation={navigation} title="Planta" />
        <View style={styles.Area}>
          {plantaData ? (
            <View style={styles.plantaContainer}>
              <DropDownPicker
                open={open}
                value={selectedTipoPlanta}
                items={items}
                setOpen={setOpen}
                setValue={setSelectedTipoPlanta}
                setItems={setItems}
                placeholder="Selecione um tipo de planta"
                onChangeValue={handleTipoPlantaChange}
                style={styles.picker}
              />
              <View style={styles.plantTitle}>
                <Text>Planta atual</Text>
                <Text style={{ fontWeight: 'bold' }}>{plantaData.nomeTipoPlanta}</Text>
              </View>
              {/* <Text>Tempo restante para regar: {formatarTempo(plantaData.tempoRestante)}</Text> */}
              <TouchableOpacity style={styles.area_planta}>
                <Image
                  source={
                    plantaData?.estagio === 4
                      ? planta4
                      : plantaData?.estagio === 3
                        ? planta3
                        : plantaData?.estagio === 2
                          ? planta2
                          : plantaData?.estagio === 1
                            ? planta1
                            : planta0
                  }
                  style={styles.planta}
                />
              </TouchableOpacity>

              {/* Botões de regar e colher */}
              <View style={styles.botaoContainer}>
                {plantaData.estagio < 4 ? (
                  <TouchableOpacity
                    style={[
                      styles.botao,
                      { opacity: tempoRegaRestante > 0 ? 0.5 : 1 },
                    ]}
                    onPress={regarPlanta}
                    disabled={tempoRegaRestante > 0}
                  >
                    <Text style={styles.textoBotao}>
                      {tempoRegaRestante > 0
                        ? `Aguarde: ${formatarTempoRestante(tempoRegaRestante)}`
                        : "Regar Planta"}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.botao} onPress={coletarPlanta}>
                    <Text style={styles.textoBotao}>Colher Planta</Text>
                  </TouchableOpacity>
                )}
              </View>

              <TouchableOpacity style={styles.botaoAjuda} onPress={pedirAjuda}>
                <Text style={styles.textoBotaoAjuda}>Ajuda ?</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.criarPlantaContainer}>
              <Text style={styles.title}>Você ainda não tem uma planta!</Text>
              <Text style={styles.title}>Crie uma para começar.</Text>
              <View style={styles.pickerWrapper}>
                <DropDownPicker
                  open={open}
                  value={selectedTipoPlanta}
                  items={items}
                  setOpen={setOpen}
                  setValue={setSelectedTipoPlanta}
                  setItems={setItems}
                  placeholder="Selecione uma planta"
                  style={styles.picker}
                  dropDownContainerStyle={styles.dropdownContainer}
                />
              </View>
              <TouchableOpacity onPress={criarPlanta} style={styles.criarPlantaButton}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Criar planta</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </>
    );
  }
};

export default PlantaPage;
