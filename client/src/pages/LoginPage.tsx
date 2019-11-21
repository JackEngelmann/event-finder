import React from 'react';

type Props = {}

export function LoginPage(props: Props) {
    return (
        <form action="login" method="post">
            <div>
                <label>Username:</label>
                <input type="text" name="username" />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password" />
            </div>
            <div>
                <input type="submit" value="Log In" />
            </div>
        </form>
    )
}