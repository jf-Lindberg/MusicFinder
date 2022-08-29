import {View} from "react-native";
import {SLIDER_WIDTH, ITEM_WIDTH} from "../../constants/CarouselDimensions"
import Carousel from "react-native-snap-carousel";
import EventPressable from "./EventPressable";


export default function EventCarousel({events, dimensions, imageScale, navigation}) {
    const CarouselItem = ({item, index}) => {
        return (
            <View key={index}>
                <EventPressable event={item} dimensions={dimensions} imageScale={imageScale} navigation={navigation}/>
            </View>
        )
    }


    return (
        <View>
            <Carousel
                activeSlideAlignment='start'
                data={events}
                renderItem={CarouselItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                inactiveSlideShift={0}
                inactiveSlideOpacity={1}
                inactiveSlideScale={1}
                enableSnap={false}
            />
        </View>
    )
}
