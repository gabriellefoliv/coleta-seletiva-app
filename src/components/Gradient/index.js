import React from 'react';
import { Svg, Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { StyleSheet } from 'react-native';

const GradientBackground = () => {
    return (
        <Svg height="100%" width="100%" style={styles.gradient}>
            <Defs>
                <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <Stop offset="0%" stopColor="#00907a" stopOpacity="1" />
                    <Stop offset="45%" stopColor="white" stopOpacity="1" />
                </LinearGradient>
            </Defs>
            <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
        </Svg>
    );
};

const styles = StyleSheet.create({
    gradient: {
        position: 'absolute', // Certifique-se de que o SVG está posicionado corretamente
        top: 0,
        left: 0,
    },
});

export default GradientBackground;