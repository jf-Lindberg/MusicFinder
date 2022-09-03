import { render } from '@testing-library/react-native';
import Login from "../components/User/Login";

test('login should exist containing correct textual elements', async () => {
    const dimensions = {
        screen: {
            height: 1,
            width: 1
        }
    };
    const { getByText } = render(<Login dimensions={dimensions}/>);

    const login = await getByText('Logga in');
    expect(login).toBeDefined();

    const email = await getByText('E-mail');
    expect(email).toBeDefined();

    const pw = await getByText('Lösenord');
    expect(pw).toBeDefined();

    const reg = await getByText('Registrera istället');
    expect(reg).toBeDefined();
});
