import React, { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './style';
import { AuthContext } from '../../context/auth';

const Header = ({ title, navigation, showBackButton = true }) => {
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        navigation.navigate('Login');
    };

    return (
        <View style={[styles.container, !showBackButton && { backgroundColor: '#00907a', color: '#fff' }]}>
            {showBackButton && (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name='arrowleft' size={24} color='black' />
                </TouchableOpacity>
            )}

            <Text style={[styles.title, !showBackButton && { backgroundColor: '#00907a', color: '#fff' }]}>{title}</Text>

            <TouchableOpacity onPress={handleLogout}>
                <MaterialCommunityIcons name='logout' size={30} color='black' />
            </TouchableOpacity>
        </View>
    );
};

export default Header;
