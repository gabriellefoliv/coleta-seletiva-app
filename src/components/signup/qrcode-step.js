import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, Alert, Button, Modal, TouchableOpacity } from "react-native";
import { Camera } from 'expo-camera/legacy';
import { Fontisto, Ionicons } from "@expo/vector-icons";

export default function QRCodeStep({ visible, onClose, onQRCodeScanned }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const previousType = useRef(type);

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

    const flipCamera = () => {
        setType(
            type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        );
    };

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
                <Camera
                    style={styles.camera}
                    type={type}
                    ref={(ref) => setCamera(ref)}
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                />
                <View style={styles.controls}>
                    <TouchableOpacity onPress={handleClose}>
                        <Ionicons name="close" size={40} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={flipCamera}>
                        <Fontisto name="arrow-return-right" size={30} color="white" />
                    </TouchableOpacity>
                </View>
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
