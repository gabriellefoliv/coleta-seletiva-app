import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { AntDesign, EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { styles } from './style';

const Header = ({ title }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign name='arrowleft' size={24} color='black' />
            </TouchableOpacity>

            <Text style={styles.title}>{title}</Text>

            <EvilIcons name='gear' size={30} color='transparent' />

        </View>
    );
};

export default Header;