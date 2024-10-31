import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { styles } from "./style";

import Header from '../../components/Header'
import Trophy from '../../assets/ranking/trophy-3d.png'
import { AuthContext } from "../../context/auth";

const Ranking = ({ navigation }) => {
    const { user } = useContext(AuthContext);
    const codCliente = user.codCliente;

    const [ranking, setRanking] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formattedDate, setFormattedDate] = useState("");
    const [position, setPosition] = useState(null);

    const formatName = (name) => {
        const parts = name.split(" ");
        if (parts.length > 1) {
            return `${parts[0]} ${parts[parts.length - 1]}`; // Retorna o primeiro nome e o último sobrenome
        }
        return name; // Caso o nome tenha apenas uma palavra
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const monthNames = [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        return `${month} de ${year}`;
    };

    useEffect(() => {
        const fetchRanking = async () => {
            try {
                const response = await api.get('/ranking');
                setRanking(response.data);

                // Extrai a data do primeiro item e formata
                if (response.data.length > 0) {
                    setFormattedDate(formatDate(response.data[0].dataAcao));
                }
            } catch (error) {
                console.error("Erro ao carregar o ranking: ", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchPosition = async () => {
            try {
                const response = await api.get(`/ranking/${codCliente}`);
                setPosition(response.data.position);
            } catch (error) {
                console.error("Erro ao carregar a posição do cliente: ", error);
            }
        };

        fetchPosition();
        fetchRanking();
    }, [codCliente]);


    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator
                    size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <>
            <Header navigation={navigation} title="Ranking de Pontuação" />
            <View style={styles.container}>
                <Image style={styles.trophy} source={Trophy} />
                {position !== null && (
                    <View style={styles.totalCard}>
                        <Text style={styles.totalText}>Sua posição atual é:</Text>
                        <Text style={styles.totalPeso}>{position}º</Text>
                    </View>
                )}
                <Text style={styles.dateText}>
                    {formattedDate}
                </Text>
                <View style={styles.rankingContainer}>
                    <View style={styles.rankingItem}>
                        <Text style={styles.position}>Pos</Text>
                        <Text style={styles.separator}>|</Text>
                        <Text style={styles.headerText}>Cliente</Text>
                        <Text style={styles.separator}>|</Text>
                        <Text style={styles.points}>Pontos</Text>
                    </View>
                    <FlatList
                        data={ranking}
                        keyExtractor={(item) => item.codCliente.toString()}
                        renderItem={({ item, index }) => (
                            <View style={styles.rankingItem}>
                                <Text style={styles.position}>{index + 1}º</Text>
                                <Text style={styles.separator}>|</Text>
                                <Text style={styles.name}>{formatName(item.nome)}</Text>
                                <Text style={styles.separator}>|</Text>
                                <Text style={styles.points}>{item.total_pontos} pts</Text>
                            </View>
                        )}
                        contentContainerStyle={styles.rankingList}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        </>
    );
}

export default Ranking;