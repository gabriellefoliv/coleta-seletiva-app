import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { styles } from "./style";

import Header from '../../components/Header'
import Trophy from '../../assets/ranking/trophy-3d.png'

const Ranking = ({ navigation }) => {
    const [ranking, setRanking] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRanking = async () => {
            try {
                const response = await api.get('/ranking');
                setRanking(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Erro ao carregar o ranking: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRanking();
    }, []);

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
            <Text style={styles.name}>{item.nome}</Text>
            <Text style={styles.points}>{item.total_pontos} pts</Text>
        </View>
    );

    return (
        <>
            <Header navigation={navigation} title="Ranking de Pontuação" />
            <View style={styles.container}>
                <Image style={styles.trophy} source={Trophy} />
                <FlatList
                    data={ranking}
                    keyExtractor={(item) => item.codCliente.toString()}
                    renderItem={renderRankingItem}
                    contentContainerStyle={styles.rankingList}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </>
    );
}

export default Ranking;
