import React, { useState } from 'react'
import './LoginPage.scss'
import { Button } from '../../components/Button/Button'
import { Page } from '../../components/Page/Page'
import { HeaderContainer } from '../../components/Header/HeaderContainer'
import { Content } from '../../components/Content/Content'

type Props = {}

const cn = 'login-page'

export function LoginPage(props: Props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  return (
    <Page>
      <HeaderContainer />
      <Content className={cn}>
        <form action="/login" method="post">
          <h1>Login</h1>
          <div className={`${cn}__labeled-input`}>
            <label htmlFor="user-name-input">Username</label>
            <input
              id="user-name-input"
              type="text"
              name="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              data-cy="login-username-input"
            />
          </div>
          <div className={`${cn}__labeled-input`}>
            <label htmlFor="user-password-input">Password</label>
            <input
              id="user-password-input"
              type="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              data-cy="login-password-input"
            />
          </div>
          <Button
            className={`${cn}__login-button`}
            type="submit"
            data-cy="login-submit-button"
          >
            Login
          </Button>
        </form>
      </Content>
    </Page>
  )
}
