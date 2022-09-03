import { render } from '@testing-library/react-native';
import Header from "../components/Home/Header";

test('header should contain correct textual elements', async () => {
    const dimensions = {
        screen: {
            height: 1,
            width: 1
        }
    };
    const { getByText } = render(<Header dimensions={dimensions} isLoggedIn={true}/>);

    const title = await getByText('musicfinder');
    expect(title).toBeDefined();

    const sub = await getByText('Välkommen till MusicFinder!');
    expect(sub).toBeDefined();

    const logout = await getByText('Logga ut');
    expect(logout).toBeDefined();
});
