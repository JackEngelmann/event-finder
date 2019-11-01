import React from 'react';
import { Footer } from "../components/Footer";
import { useHistory } from 'react-router';

export function FooterContainer() {
    const history = useHistory()
    return (
        <Footer>
            <button onClick={() => history.push('/impressum')}>Impressum</button>
            <button onClick={() => history.push('/data-policy')}>Data Policy</button>
            <button onClick={() => history.push('/contact')}>Contact</button>
        </Footer>
    )
}