import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { styles } from "./style";

import Header from '../../components/Header'
import Trophy from '../../assets/ranking/trophy-3d.png'

const Ranking = ({ navigation }) => {
    const [ranking, setRanking] = useState([]);
    const [loading, setLoading] = useState(true);

    const formatName = (name) => {
        const parts = name.split(" ");
        if (parts.length > 1) {
            return `${parts[0]} ${parts[parts.length - 1]}`; // Retorna o primeiro nome e o último sobrenome
        }
        return name; // Caso o nome tenha apenas uma palavra
    };

    useEffect(() => {
        const fetchRanking = async () => {
            try {
                const response = await api.get('/ranking');
                setRanking(response.data);
                console.log(response.data)
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

                <View style={styles.rankingContainer}>
                    <View style={styles.rankingItem}>
                        <Text style={styles.position}>Pos</Text>
                        <Text style={styles.separatorLeft}>|</Text>
                        <Text style={styles.headerText}>Cliente</Text>
                        <Text style={styles.separatorRight}>|</Text>
                        <Text style={styles.points}>Total Acumulado</Text>
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