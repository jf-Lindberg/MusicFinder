import { render } from '@testing-library/react-native';
import Header from "../components/Home/Header";

test('header should contain correct textual elements', async () => {
    const dimensions = {
        screen: {
            height: 1,
            width: 1
        }
    };
    const { getByText } = render(<Header dimensions={dimensions} isLoggedIn={false}/>);

    const title = await getByText('musicfinder');
    expect(title).toBeDefined();

    const sub = await getByText('Har du redan ett konto?');
    expect(sub).toBeDefined();

    const login = await getByText('Logga in');
    expect(login).toBeDefined();
});
