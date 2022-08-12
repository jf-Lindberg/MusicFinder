import {Dimensions} from "react-native";

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.75);

export {SLIDER_WIDTH, ITEM_WIDTH};
