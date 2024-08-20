import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    padding: SIZES.padding,
    justifyContent: 'center',
  },
  main: {
    alignItems: 'center',
    marginBottom: SIZES.padding * 2,
  },
  title: {
    fontSize: SIZES.h1,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
  },
  intro: {
    marginTop: SIZES.padding * 2,
    marginBottom: SIZES.padding * 2,
    textAlign: 'center',
    fontSize: SIZES.body4,
    fontFamily: FONTS.regular,
    color: COLORS.darkGray,
    lineHeight: 20,
  },
  sectionTitle: {
    marginTop: SIZES.padding * 2,
    marginBottom: SIZES.padding,
    fontSize: SIZES.h3,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
  },
  sectionText: {
    marginBottom: SIZES.padding * 2,
    fontSize: SIZES.body3,
    fontFamily: FONTS.regular,
    color: COLORS.darkGray,
    lineHeight: 20,
  },
});