import { FlatList, Modal, Text, TouchableOpacity, View, ActivityIndicator, Alert } from "react-native";
import { styles } from "./style";
import { useMemo, useState, useContext, useEffect } from "react";
import { Calendar } from 'react-native-calendars';
import { AntDesign, Feather } from '@expo/vector-icons';
import moment from 'moment';
import { AuthContext } from "../../context/auth";
import { api } from "../../lib/axios";
import Header from "../../components/Header";

const HistoricoTransacoes = ({ navigation }) => {
    const [selectedRange, setSelectedRange] = useState({});
    const [isModalVisible, setModalVisible] = useState(false);
    const [transacoes, setTransacoes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filteredData, setFilteredData] = useState([]);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user && user.codCliente) {
            fetchTransacoes();
        }
    }, [user]);

    const fetchTransacoes = async () => {
        console.log("cliente no histórico:", user.codCliente);
        try {
            const response = await api.get(`/recompensa/${user.codCliente}`);
            console.log("Transações recebidas:", response.data);
            setTransacoes(response.data);
            setFilteredData(response.data); // Inicializa o filteredData com transações
            setIsLoading(false);
        } catch (error) {
            console.error("Erro ao carregar as transações:", error);
            setIsLoading(false);
            Alert.alert("Erro", "Erro ao carregar histórico de transações.");
        }
    };

    const formatDate = (dateString) => moment(dateString).format('DD/MM/YYYY');

    const totalPontosTransferidos = useMemo(
        () => filteredData.reduce((total, item) => total + item.pontos, 0),
        [filteredData]
    );

    const onDayPress = (day) => {
        if (selectedRange.startDate && !selectedRange.endDate) {
            const newRange = {
                startDate: selectedRange.startDate,
                endDate: day.dateString,
            };
            setSelectedRange(newRange);
            filterDataByRange(newRange);
        } else {
            setSelectedRange({ startDate: day.dateString, endDate: null });
        }
    };

    const filterDataByRange = (range) => {
        if (range.startDate && range.endDate) {
            const start = moment(range.startDate);
            const end = moment(range.endDate).endOf('day');

            const filtered = transacoes.filter((item) => {
                const dataResgate = moment(item.dataResgate);
                // A lógica de filtro foi ajustada
                const isInRange = dataResgate.isSameOrAfter(start) && dataResgate.isSameOrBefore(end);
                // Log para verificar o que está sendo filtrado
                console.log(`Data de Resgate: ${dataResgate.format()}, In Range: ${isInRange}`);
                return isInRange;
            });

            console.log(`Filtered Data:`, filtered); // Log para verificar o resultado do filtro
            setFilteredData(filtered);
        } else {
            setFilteredData(transacoes);
        }
    };

    const toggleModal = () => setModalVisible(!isModalVisible);

    const removeFilter = () => {
        setFilteredData(transacoes);
        setSelectedRange({});
    };

    if (isLoading) {
        return (<ActivityIndicator size="large" color="#00907a" />);
    }

    return (
        <>
        <Header navigation={navigation} title="Transferir" />
        <View style={styles.container}>
            <View style={styles.totalCard}>
                <Text style={styles.totalText}>Total de Pontos Transferidos:</Text>
                <Text style={styles.totalValor}>{totalPontosTransferidos} pontos</Text>
            </View>
            {selectedRange.startDate && selectedRange.endDate ? (
                <>
                    <TouchableOpacity style={styles.removeFilterButton} onPress={removeFilter}>
                        <Feather name="x" size={24} color="#fff" />
                        <Text style={styles.removeFilterButtonText}>Remover Filtro</Text>
                    </TouchableOpacity>
                    <Text style={styles.rangeText}>
                        * De {formatDate(selectedRange.startDate)} até {formatDate(selectedRange.endDate)}
                    </Text>
                </>
            ) : (
                <TouchableOpacity style={styles.filterButton} onPress={toggleModal}>
                    <AntDesign name="calendar" size={24} color="#00907a" />
                    <Text style={styles.filterButtonText}>Aplicar Filtro</Text>
                </TouchableOpacity>
            )}
            <Modal
                transparent={true}
                visible={isModalVisible}
                animationType="fade"
                onRequestClose={toggleModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.filterTitle}>Selecione o Intervalo de Datas</Text>
                        <Calendar
                            onDayPress={onDayPress}
                            markingType={'period'}
                            markedDates={{
                                [selectedRange.startDate]: { startingDay: true, color: '#70d7c7', textColor: 'white' },
                                [selectedRange.endDate]: { endingDay: true, color: '#70d7c7', textColor: 'white' },
                                ...(selectedRange.startDate && selectedRange.endDate && {
                                    [selectedRange.startDate]: { color: '#70d7c7', textColor: 'white' },
                                    [selectedRange.endDate]: { color: '#70d7c7', textColor: 'white' },
                                }),
                            }}
                            minDate={'2023-01-01'}
                            maxDate={moment().format('YYYY-MM-DD')}
                            firstDay={1}
                            pastScrollRange={12}
                            futureScrollRange={12}
                            scrollEnabled
                            showScrollIndicator
                            horizontal
                            hideExtraDays
                            headerStyle={{
                                borderBottomWidth: 0.5,
                                borderBottomColor: "#E8E8E8",
                                paddingBottom: 10,
                                marginBottom: 10,
                            }}
                        />
                        <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
                            <Text style={styles.closeButtonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <FlatList
                data={filteredData}
                keyExtractor={(item) => `${item.codRecompensa}`} // Usando codRecompensa como chave
                renderItem={({ item }) => (
                    <View style={styles.transacaoItem}>
                        <Text style={styles.transacaoData}>{formatDate(item.dataResgate)}</Text>
                        <Text style={styles.separator}>|</Text>
                        <Text style={styles.transacaoParceiro}>{item.nomeParceiro}</Text>
                        <Text style={styles.separator}>|</Text>
                        <Text style={styles.transacaoPontos}>{item.pontos}</Text>
                    </View>
                )}
                contentContainerStyle={styles.transacaoList}
                showsVerticalScrollIndicator={false}
            />
        </View>
        </>
    );
};

export default HistoricoTransacoes;
