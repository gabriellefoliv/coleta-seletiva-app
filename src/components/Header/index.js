import React, { useContext } from 'react';
import { Text, TouchableOpacity, View, StatusBar } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './style';
import { AuthContext } from '../../context/auth';
import { useNavigation } from '@react-navigation/native';

const Header = ({ title, showBackButton = true }) => {
    const { logout } = useContext(AuthContext);
    const navigation = useNavigation();

    const handleLogout = () => {
        logout();
        navigation.navigate('Login');
    };

    const handleGoBack = () => {
        if(navigation && navigation.canGoBack()) {
            console.log("Voltou pagina");
            navigation.goBack();
        } else {
            console.log("Voltou para Home");
            navigation.navigate('Home');
        }
    }

    return (
        <>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
        <View style={[styles.container, !showBackButton && { backgroundColor: '#00907a', color: '#fff' }]}>
            {showBackButton && (
                <TouchableOpacity onPress={handleGoBack}>
                    <AntDesign name='arrowleft' size={24} color='black' />
                </TouchableOpacity>
            )}

            <Text style={[styles.title, !showBackButton && { backgroundColor: '#00907a', color: '#fff' }]}>{title}</Text>

            <TouchableOpacity onPress={handleLogout}>
                <MaterialCommunityIcons name='logout' size={30} color='black' />
            </TouchableOpacity>
        </View>
        </>
    );
};

export default Header;
