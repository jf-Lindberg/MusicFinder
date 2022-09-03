import { render } from '@testing-library/react-native';
import EventPressable from "../components/Home/EventPressable";

test('header should contain correct textual elements', async () => {
    const event = {
        artistImage: {
            uri: ''
        },
        name: 'Torsten',
        artist: 'Torsten'
    };

    const dimensions = {
        screen: {
            height: 1,
            width: 1
        }
    };

    const imageScale = {
        width: 1,
        height: 1
    }

    const { getByText } = render(<EventPressable event={event} dimensions={dimensions} imageScale={imageScale}/>);

    const artist = await getByText('Torsten');
    expect(artist).toBeDefined();
});
