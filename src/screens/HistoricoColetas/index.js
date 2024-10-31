import { ActivityIndicator, Alert, FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { useContext, useEffect, useMemo, useState } from "react";
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { AntDesign, Feather } from '@expo/vector-icons';
import moment from 'moment';
import { ptBR } from "../../utils/localeCalendarConfig";
import { AuthContext } from "../../context/auth";
import { api } from "../../lib/axios";
import Header from "../../components/Header";

LocaleConfig.locales["pt-br"] = ptBR
LocaleConfig.defaultLocale = "pt-br"

const HistoricoColetas = () => {
    const { user } = useContext(AuthContext);
    const codCliente = user.codCliente;

    const [selectedRange, setSelectedRange] = useState({}); // Range de datas
    const [isModalVisible, setModalVisible] = useState(false); // Estado do modal
    const [position, setPosition] = useState(null);
    const [loading, setLoading] = useState(true);
    const [coletas, setColetas] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [totalPesoColetado, setTotalPesoColetado] = useState(0); // Novo estado

    const formatDate = (dateString) => {
        return moment(dateString).format('DD/MM/YYYY');
    };

    const fetchColetas = async () => {
        try {
            const response = await api.get(`/coleta?codCliente=${codCliente}`);
            const fetchedColetas = response.data;
            const sortedColetas = fetchedColetas.sort((a, b) => moment(b.dataColeta).diff(moment(a.dataColeta)));

            setColetas(sortedColetas);
            setFilteredData(sortedColetas);
            calculateTotalPeso(sortedColetas); // Calcula o peso inicial total
        } catch (error) {
            console.error("Erro ao buscar coletas: ", error);
        } finally {
            setLoading(false);
        }
    };

    const calculateTotalPeso = (data) => {
        const total = data.reduce((sum, coleta) => sum + (Number(coleta.peso) || 0), 0);
        setTotalPesoColetado(total);
    };

    const filterDataByRange = (range) => {
        if (!range.startDate || !range.endDate) return;

        const start = moment(range.startDate);
        const end = moment(range.endDate);
        const filtered = coletas.filter(item => {
            const date = moment(item.dataColeta);
            return date.isBetween(start, end, undefined, '[]');
        });

        const sortedFiltered = filtered.sort((a, b) => moment(b.dataColeta).diff(moment(a.dataColeta)));
        setFilteredData(sortedFiltered);
        calculateTotalPeso(sortedFiltered); // Atualiza o total baseado no filtro
    };

    // Função para selecionar o range de datas
    const onDayPress = (day) => {
        // Se já houver uma data inicial selecionada e ainda não houver uma data final
        if (selectedRange.startDate && !selectedRange.endDate) {
            const startDate = moment(selectedRange.startDate);
            const endDate = moment(day.dateString);

            // Verifica se a segunda data é posterior à primeira
            if (endDate.isBefore(startDate)) {
                Alert.alert("Aviso!", "A data final não pode ser anterior à data inicial.");
                return;
            }

            // Define o novo intervalo de datas e aplica o filtro
            const newRange = {
                startDate: selectedRange.startDate,
                endDate: day.dateString,
            };
            setSelectedRange(newRange);
            filterDataByRange(newRange);
        } else {
            // Define a data inicial se ainda não houver nenhuma data selecionada
            setSelectedRange({ startDate: day.dateString, endDate: null });
        }
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const removeFilter = () => {
        setFilteredData(coletas); // Retorna ao estado original
        setSelectedRange({}); // Limpa o range de datas
        calculateTotalPeso(coletas); // Recalcula o total para o conjunto completo
    };

    useEffect(() => {
        const fetchPosition = async () => {
            try {
                const response = await api.get(`/ranking/coletas/${codCliente}`);
                setPosition(response.data.position);
            } catch (error) {
                console.error("Erro ao carregar a posição no ranking de coleta_residuos: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosition();
        fetchColetas();
    }, [codCliente]);

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <>
            <Header title="Histórico de Coletas" />
            <View style={styles.container}>
                <View style={styles.totalCard}>
                    <Text style={styles.totalText}>Total Coletado:</Text>
                    <Text style={styles.totalPeso}>{totalPesoColetado} kg</Text>
                </View>
                {position !== null && (
                    <View style={styles.totalCard}>
                        <Text style={styles.totalText}>Sua posição no Ranking de Coletas é:</Text>
                        <Text style={styles.totalPeso}>{position}º</Text>
                    </View>
                )}
                {/* Filtro de Data */}
                {selectedRange.startDate && selectedRange.endDate ? (
                    <><TouchableOpacity style={styles.removeFilterButton} onPress={removeFilter}>
                        <Feather name="x" size={24} color="#fff" />
                        <Text style={styles.removeFilterButtonText}>Remover Filtro</Text>
                    </TouchableOpacity>
                        <Text style={styles.rangeText}>
                            * De {formatDate(selectedRange.startDate)} até {formatDate(selectedRange.endDate)}
                        </Text></>
                ) : (
                    <TouchableOpacity style={styles.filterButton} onPress={toggleModal}>
                        <AntDesign name="calendar" size={24} color="#00907a" />
                        <Text style={styles.filterButtonText}>Aplicar Filtro</Text>
                    </TouchableOpacity>
                )}

                {/* Modal com o calendário */}
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
                                    ...(selectedRange.startDate &&
                                        selectedRange.endDate && {
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
                <View style={styles.coletaContainer}>
                    <View style={styles.coletaHeader}>
                        <Text style={styles.headerText}>Data da Coleta</Text>
                        <Text style={styles.separator}>|</Text>
                        <Text style={styles.headerText}>Peso Coletado</Text>
                    </View>
                    <FlatList
                        data={filteredData} // Usando dados filtrados
                        keyExtractor={(item) => item.codColeta}
                        renderItem={({ item }) => (
                            <View style={styles.coletaItem}>
                                <Text style={styles.coletaData}>{formatDate(item.dataColeta)}</Text>
                                <Text style={styles.separator}>|</Text>
                                <Text style={styles.coletaPeso}>{item.peso}</Text>
                            </View>
                        )}
                        contentContainerStyle={styles.coletaList}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View></>
    );
}

export default HistoricoColetas;