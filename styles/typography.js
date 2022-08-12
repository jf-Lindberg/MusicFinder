import fonts from "../styles/variables/fonts";
import colors from "./variables/colors";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const standardScreenHeight = 896;

export const logo = {
    fontFamily: fonts.italic900,
    fontSize: RFValue(30, standardScreenHeight),
    color: colors.bg,
    lineHeight: 31
};

export const registered = {
    fontSize: RFValue(15, standardScreenHeight)
};

export const belowLogo = {
    fontFamily: fonts.reg400,
    fontSize: RFValue(15, standardScreenHeight),
    color: colors.bg,
    lineHeight: 16
};

export const signIn = {
    fontFamily: fonts.reg700,
    fontSize: RFValue(15, standardScreenHeight),
    color: colors.bg,
    textDecorationLine: 'underline',
    lineHeight: 16
};

export const belowHeadliner = {
    fontFamily: fonts.reg700,
    fontSize: RFValue(22, standardScreenHeight),
    color: colors.text,
    marginLeft: dimensions.screen.width,
    marginTop: 25
};
