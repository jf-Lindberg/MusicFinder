import { render } from '@testing-library/react-native';
import SingleEvent from "../components/Event/SingleEvent";

jest.mock("../components/MapViewComp", () => "MapViewComp");

test('singleEvent should contain correct textual elements', async () => {
    const route = {
        params: {
            "event": {
                artistImage: {
                    uri: ''
                },
                name: 'Torsten',
                artist: 'Torsten',
                genre: 'Rock',
                day: '18',
                monthNumeric: '10',
                year: '1995',
                address: "Testroad 1",
                city: "Karlskrona",
                location: {
                    latitude: 0,
                    longitude: 0
                }
            }
        }
    };

    const dimensions = {
        screen: {
            height: 1,
            width: 1
        }
    };

    const isLoggedIn  = false;

    const { getByText, getAllByText } = render(<SingleEvent route={route} dimensions={dimensions} isLoggedIn={isLoggedIn}/>);

    const artist = await getAllByText('Torsten');
    expect(artist).toBeDefined();

    const date = await getByText('18/10/1995');
    expect(date).toBeDefined();

    const address = await getByText('Testroad 1, Karlskrona');
    expect(address).toBeDefined();
});
