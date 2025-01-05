import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { styles } from "./style";

import Header from '../../components/Header';
import Trophy from '../../assets/ranking/trophy-3d.png';
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
        const currentDate = new Date();
        setFormattedDate(formatDate(currentDate));
    }, []);

    useEffect(() => {
        const fetchRanking = async () => {
            try {
                const response = await api.get('/ranking');
                console.log("Ranking data:", response.data);
                setRanking(response.data);


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
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    const renderRankingItem = ({ item, index }) => (
        <View style={styles.card}>
            <Text style={styles.position}>{index + 1}º</Text>
            <Text style={styles.name}>{formatName(item.nome)}</Text>
            <Text style={styles.points}>{item.total_pontos} pts</Text>
        </View>
    );

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
                <Text style={styles.dateText}>{formattedDate}</Text>
                {ranking.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>
                            Não há ranking no momento. Jogue e consiga uma colocação!
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        data={ranking}
                        keyExtractor={(item) => item.codCliente.toString()}
                        renderItem={renderRankingItem}
                        contentContainerStyle={styles.rankingList}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </View>
        </>
    );
}

export default Ranking;
