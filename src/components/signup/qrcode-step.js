import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, Alert, Button, Modal, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Fontisto, Ionicons } from "@expo/vector-icons";

export default function QRCodeStep({ visible, onClose, onQRCodeScanned }) {
    const [hasPermission, setHasPermission] = useCameraPermissions();
    const [camera, setCamera] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [facing, setFacing] = useState('back');

    // Solicita permissão para usar a câmera
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        if (!scanned) {
            setScanned(true);
            console.log("QR Code escaneado: ", data)
            onQRCodeScanned(data);
        }
    };

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const handleClose = async () => {
        if (camera) {
            setCamera(null);
        }
        onClose();
    };

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>Acesso à câmera negado!</Text>;
    }

    return (
        <Modal visible={visible} onRequestClose={handleClose} animationType="slide">
            <View style={{ flex: 1 }}>
                <CameraView
                    style={styles.camera}
                    facing={facing}
                    ref={(ref) => setCamera(ref)}
                    onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                >

                    <View style={styles.controls}>
                        <TouchableOpacity onPress={handleClose}>
                            <Ionicons name="close" size={40} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toggleCameraFacing}>
                            <Fontisto name="arrow-return-right" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                </CameraView>
            </View>
            {scanned && (
                <Button title="Escanear novamente" onPress={() => setScanned(false)} />
            )}
        </Modal>
    );
}

const styles = StyleSheet.create({
    camera: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    controls: {
        position: 'absolute',
        bottom: 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingHorizontal: 20,
    },
});
