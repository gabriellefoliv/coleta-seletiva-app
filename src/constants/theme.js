import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {

    primary: '#00907a',
    primaryDark: '#077d6c',
    primaryBtn: '#6cbe71',
    primaryTxt: 'white',
    error: '#D66B54',
    offGray: '#5c5c5c',
    placeHolderText: '#5c5c5c',

    textInputGray: '#eef',

    white: "#fff",
    black: "#000000",
    gray: "#6A6A6A",
    lightGray: "#fafafa",
    transparentButton: '#8e8e8e'

};

export const SIZES = {
    // global sizes

    base: 8,
    font: 14,
    radius: 12,
    padding: 24,

    // font sizes

    h1: 30,
    h2: 25,
    h3: 18,
    h4: 14,
    body1: 30,
    body2: 25,
    body3: 18,
    body4: 14,
    body5: 12,

    // app dimensions

    width,
    height,
};

export const FONTS = {
    h1: { fontFamily: "Cabin Bold", fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: "Cabin Bold", fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: "Cabin Bold", fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: "Cabin Bold", fontSize: SIZES.h4, lineHeight: 22 },
    body1: { fontFamily: "Cabin Regular", fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: "Cabin Regular", fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: "Cabin Regular", fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: "Cabin Regular", fontSize: SIZES.body4, lineHeight: 22 },
    body5: { fontFamily: "Cabin Regular", fontSize: SIZES.body5, lineHeight: 22 },
};

let pontos = 1245;

const appTheme = {
    COLORS,
    SIZES,
    FONTS,
    get PONTOS() {
        return pontos;
    },
    set PONTOS(value) {
        pontos = value;
    },
};


export default appTheme;