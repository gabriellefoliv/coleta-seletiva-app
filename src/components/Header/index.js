import React, { useContext } from 'react';
import { Text, TouchableOpacity, View, StatusBar, SafeAreaView } from 'react-native';
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
        if (navigation && navigation.canGoBack()) {
            navigation.goBack();
        } else {
            navigation.navigate('Home');
        }
    }

    return (
        <>
            <StatusBar translucent={true} backgroundColor={'transparent'} />
            <SafeAreaView style={[styles.container, !showBackButton && { backgroundColor: '#00907a', color: '#fff' }]}>
                {showBackButton && (
                    <TouchableOpacity onPress={handleGoBack}>
                        <AntDesign name='arrowleft' size={24} color='black' />
                    </TouchableOpacity>
                )}

                <Text style={[styles.title, !showBackButton && { backgroundColor: '#00907a', color: '#fff' }]}>{title}</Text>

                <TouchableOpacity onPress={handleLogout}>
                    <MaterialCommunityIcons name='logout' size={30} color='black' />
                </TouchableOpacity>
            </SafeAreaView>
        </>
    );
};

export default Header;
