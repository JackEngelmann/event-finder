import React from 'react'
import './Footer.css'
import { useHistory } from 'react-router'

export function Footer() {
    const history = useHistory()
    return <footer className="footer">
        <div className="footer__content">
            <a onClick={() => history.push('/impressum')}>Impressum</a>
            <a onClick={() => history.push('/data-policy')}>Data Policy</a>
            <a onClick={() => history.push('/contact')}>Contact</a>
        </div>
    </footer>
}