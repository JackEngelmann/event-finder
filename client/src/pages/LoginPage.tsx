import React from 'react'
import './LoginPage.scss'
import { Button } from '../components/Button'

type Props = {}

const cn = 'login-page'

export function LoginPage(props: Props) {
    return (
        <div className={cn}>
            <form action="login" method="post">
                <h1>Login</h1>
                <div className={`${cn}__labeled-input`}>
                    <label htmlFor="user-name-input">Username</label>
                    <input id="user-name-input" type="text" name="username" />
                </div>
                <div className={`${cn}__labeled-input`}>
                    <label htmlFor="user-password-input">Password</label>
                    <input id="user-password-input" type="password" name="password" />
                </div>
                <Button className={`${cn}__login-button`}>
                    Login
                </Button>
            </form>
        </div>
    )
}
