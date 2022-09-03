import { render } from '@testing-library/react-native';
import Register from "../components/User/Register";

test('register should exist contain correct textual elements', async () => {
    const dimensions = {
        screen: {
            height: 1,
            width: 1
        }
    };
    const { getByText } = render(<Register dimensions={dimensions}/>);

    const register = await getByText('Registrera');
    expect(register).toBeDefined();

    const email = await getByText('E-mail');
    expect(email).toBeDefined();

    const pw = await getByText('Lösenord');
    expect(pw).toBeDefined();
});
