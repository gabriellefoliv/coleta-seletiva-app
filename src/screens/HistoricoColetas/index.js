import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { useMemo, useState } from "react";
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { AntDesign, Feather } from '@expo/vector-icons';
import moment from 'moment';
import { ptBR } from "../../utils/localeCalendarConfig";

LocaleConfig.locales["pt-br"] = ptBR
LocaleConfig.defaultLocale = "pt-br"

const HistoricoColetas = () => {
    const [selectedRange, setSelectedRange] = useState({}); // Range de datas
    const [isModalVisible, setModalVisible] = useState(false); // Estado do modal

    const coletas = [
        { "id": 1, "dataColeta": "2024-07-09", "pesoColetado": "46kg" },
        { "id": 2, "dataColeta": "2024-09-23", "pesoColetado": "19kg" },
        { "id": 3, "dataColeta": "2024-06-14", "pesoColetado": "21kg" },
        { "id": 4, "dataColeta": "2024-10-28", "pesoColetado": "30kg" },
        { "id": 5, "dataColeta": "2024-10-31", "pesoColetado": "11kg" },
        { "id": 6, "dataColeta": "2024-08-22", "pesoColetado": "45kg" },
        { "id": 7, "dataColeta": "2024-03-07", "pesoColetado": "43kg" },
        { "id": 8, "dataColeta": "2024-09-30", "pesoColetado": "22kg" },
        { "id": 9, "dataColeta": "2024-05-12", "pesoColetado": "29kg" },
        { "id": 10, "dataColeta": "2024-04-12", "pesoColetado": "25kg" }
    ];

    // Ordena as coletas em ordem decrescente
    const sortedColetas = [...coletas].sort((a, b) => moment(b.dataColeta).diff(moment(a.dataColeta)));

    const [filteredData, setFilteredData] = useState(sortedColetas); // Dados filtrados

    const formatDate = (dateString) => {
        return moment(dateString).format('DD/MM/YYYY');
    };

    const calculateTotalWeight = (data) => {
        return data.reduce((total, item) => total + parseInt(item.pesoColetado, 10), 0);
    };

    const totalPesoColetado = useMemo(() => calculateTotalWeight(coletas), [coletas]);

    // Função para selecionar o range de datas
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

    // Filtra os dados da coleta pelo range de datas selecionado
    const filterDataByRange = (range) => {
        let filtered = [...coletas]; // Cópia dos dados originais
        if (range.startDate && range.endDate) {
            const start = moment(range.startDate);
            const end = moment(range.endDate);

            filtered = filtered.filter((item) => {
                const date = moment(item.dataColeta);
                return date.isBetween(start, end, undefined, '[]');
            });
        }

        // Ordena os dados filtrados em ordem decrescente
        const sortedFiltered = filtered.sort((a, b) => moment(b.dataColeta).diff(moment(a.dataColeta)));

        setFilteredData(sortedFiltered);
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const removeFilter = () => {
        setFilteredData(sortedColetas); // Retorna ao estado original
        setSelectedRange({}); // Limpa o range de datas
    };

    return (
        <View style={styles.container}>
            <View style={styles.totalCard}>
                <Text style={styles.totalText}>Total Coletado:</Text>
                <Text style={styles.totalPeso}>{totalPesoColetado} kg</Text>
            </View>
            <View style={styles.totalCard}>
                <Text style={styles.totalText}>Posição no Ranking:</Text>
                <Text style={styles.totalPeso}>1º</Text>
            </View>
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
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.coletaItem}>
                            <Text style={styles.coletaData}>{formatDate(item.dataColeta)}</Text>
                            <Text style={styles.separator}>|</Text>
                            <Text style={styles.coletaPeso}>{item.pesoColetado}</Text>
                        </View>
                    )}
                    contentContainerStyle={styles.coletaList}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    );
}

export default HistoricoColetas;