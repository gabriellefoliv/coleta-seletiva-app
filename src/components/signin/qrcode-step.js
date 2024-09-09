import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, Alert, Button, Modal, TouchableOpacity, ActivityIndicator } from "react-native";
import { Camera } from 'expo-camera/legacy';
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { api } from "../../lib/axios";

export default function QRCodeStep({ visible, onClose, onQRCodeValidated, navigateToRegister }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [loading, setLoading] = useState(false); // Para exibir loading durante a requisição
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = async ({ type, data }) => {
        if (!scanned) {
            setScanned(true);
            setLoading(true); // Inicia o loading

            try {
                // Faz a requisição para a API passando o QRCode escaneado
                const response = await api.post("/register", {
                    qrCode: data,
                });

                if (response.data.valid) {
                    Alert.alert('QR Code válido!', 'Você será redirecionado para a tela de registro.');
                    onQRCodeValidated(data); // Chama a função de sucesso
                    navigateToRegister(); // Navega para a tela de registro
                } else {
                    Alert.alert('QR Code inválido!', 'Tente escanear outro código.');
                    setScanned(false); // Permite escanear novamente
                }
            } catch (error) {
                Alert.alert('Erro', 'Não foi possível validar o QR Code. Tente novamente mais tarde.');
                setScanned(false); // Permite escanear novamente
            } finally {
                setLoading(false); // Finaliza o loading
            }
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
                {loading && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#fff" />
                        <Text style={styles.loadingText}>Validando QR Code...</Text>
                    </View>
                )}
                <View style={styles.controls}>
                    <TouchableOpacity onPress={handleClose}>
                        <Ionicons name="close" size={40} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={flipCamera}>
                        <Fontisto name="arrow-return-right" size={30} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
            {scanned && !loading && (
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
    loadingContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -50 }, { translateY: -50 }],
        alignItems: 'center',
    },
    loadingText: {
        color: '#fff',
        marginTop: 10,
    },
});


// import React, { useState, useEffect, useRef } from "react";
// import { Text, View, StyleSheet, Alert, Button, Modal, TouchableOpacity } from "react-native";
// import { Camera } from 'expo-camera/legacy';
// import { Fontisto, Ionicons } from "@expo/vector-icons";

// export default function QRCodeStep({ visible, onClose, onQRCodeScanned }) {
//     const [hasPermission, setHasPermission] = useState(null);
//     const [camera, setCamera] = useState(null);
//     const [scanned, setScanned] = useState(false);
//     const [type, setType] = useState(Camera.Constants.Type.back);
//     const previousType = useRef(type);

//     // Solicita permissão para usar a câmera
//     useEffect(() => {
//         (async () => {
//             const { status } = await Camera.requestCameraPermissionsAsync();
//             setHasPermission(status === 'granted');
//         })();
//     }, []);

//     const handleBarCodeScanned = ({ type, data }) => {
//         if (!scanned) {
//             setScanned(true);
//             Alert.alert('QR Code escaneado!', `Dados: ${data}`);
//             onQRCodeScanned(data);
//         }
//     };

//     const flipCamera = () => {
//         setType(
//             type === Camera.Constants.Type.back
//                 ? Camera.Constants.Type.front
//                 : Camera.Constants.Type.back
//         );
//     };

//     const handleClose = async () => {
//         if (camera) {
//             setCamera(null);
//         }
//         onClose();
//     };

//     if (hasPermission === null) {
//         return <View />;
//     }
//     if (hasPermission === false) {
//         return <Text>Acesso à câmera negado!</Text>;
//     }

//     return (
//         <Modal visible={visible} onRequestClose={handleClose} animationType="slide">
//             <View style={{ flex: 1 }}>
//                 <Camera
//                     style={styles.camera}
//                     type={type}
//                     ref={(ref) => setCamera(ref)}
//                     onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
//                 />
//                 <View style={styles.controls}>
//                     <TouchableOpacity onPress={handleClose}>
//                         <Ionicons name="close" size={40} color="white" />
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={flipCamera}>
//                         <Fontisto name="arrow-return-right" size={30} color="white" />
//                     </TouchableOpacity>
//                 </View>
//             </View>
//             {scanned && (
//                 <Button title="Escanear novamente" onPress={() => setScanned(false)} />
//             )}
//         </Modal>
//     );
// }

// const styles = StyleSheet.create({
//     camera: {
//         flex: 1,
//         justifyContent: 'flex-end',
//         alignItems: 'center',
//     },
//     controls: {
//         position: 'absolute',
//         bottom: 30,
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         width: '100%',
//         paddingHorizontal: 20,
//     },
// });
