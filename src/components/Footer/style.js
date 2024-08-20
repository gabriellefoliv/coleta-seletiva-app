import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants'


const styles = StyleSheet.create({
    footerContainer: {
        position: 'absolute',
        bottom: 0,
        width: '110%',
        backgroundColor: COLORS.white,
        borderTopWidth: 0,
        borderTopColor: COLORS.black,
        left: -20,
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 50,
    },
    footerButton: {
        backgroundColor: "gray",
        height: 70,
        width: '80%',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: COLORS.black,
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
        flex: 1,
        borderRadius: 20,
    },
    footerButtonImage: {
        width: '33%',
        height: '60%',
        left: 35,
    }
});