import React from 'react'
import {
    View, Text,
    Image
} from 'react-native'
import GlobalStyles from '../../styles/defaultColors.js'

export default function ({ route, navigation, }) {
    const { idColeta } = route.params;
    const teste = 2;

    return (
        <View style={GlobalStyles.container}>
            <Text>id: {idColeta}</Text>
            <Image
                source={{ uri: 'https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=' + idColeta }}
                style={{ width: 300, height: 300 }}
            />
        </View>
    );
}