import React, { useState } from 'react';
import { View, StyleSheet, Alert, Button } from 'react-native';
import QRCodeStep from '../../components/signin/qrcode-step';
import RegisterStep from '../../components/signin/register-step';

export default function SignIn({ navigation }) {
    const [qrCodeData, setQrCodeData] = useState('');
    const [step, setStep] = useState('scan'); // Controla a etapa atual
    const [cameraVisible, setCameraVisible] = useState(false);
    const [capturedPhoto, setCapturedPhoto] = useState(null);


    const handleRegisterSuccess = () => {
        navigation.navigate('Login');
    };

    const handleOpenCamera = () => {
        setCameraVisible(true);
    };

    // Função para fechar a câmera
    const handleCloseCamera = () => {
        setCameraVisible(false);
    };

    // Função para lidar com a foto tirada
    const handlePhotoTaken = (photoUri) => {
        setCapturedPhoto(photoUri);
        Alert.alert('Foto capturada!', `Foto salva em: ${photoUri}`);
    };

    // Função para lidar com o QRCode escaneado
    const handleQRCodeScanned = (data) => {
        Alert.alert('QR Code escaneado!', `Dados: ${data}`);
        // Aqui você pode fazer algo com os dados do QRCode, como validá-los
        setQrCodeData(data);
        setStep('register'); // Avança para a etapa de registro
    };

    return (
        <View style={styles.container}>
            {step === 'scan' ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Button title="Abrir Câmera" onPress={handleOpenCamera} />

                    {capturedPhoto && <Text>Foto Capturada: {capturedPhoto}</Text>}

                    <QRCodeStep
                        visible={cameraVisible}
                        onClose={handleCloseCamera}
                        onPhotoTaken={handlePhotoTaken}
                        onQRCodeScanned={handleQRCodeScanned} // Passando a função de escanear QRCode
                    />
                </View>
            ) : (
                <RegisterStep qrCodeData={qrCodeData} onRegisterSuccess={handleRegisterSuccess} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
