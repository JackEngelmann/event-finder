import * as React from 'react'
import { Button } from '../Button/Button'
import './ErrorBoundary.scss'
import { ErrorMessageContainer } from './ErrorMessage/ErrorMessageContainer'

type Props = {
  children: React.ReactNode
}

type State = {
  hasError: boolean
  error: string
  errorInfo: string
}

const cn = 'error-boundary'

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  state = {
    hasError: false,
    error: '',
    errorInfo: '',
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true }
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({ error })
  }

  render() {
    if (this.state.hasError) {
      return <ErrorMessageContainer error={this.state.error} />
    }
    return this.props.children
  }
}
