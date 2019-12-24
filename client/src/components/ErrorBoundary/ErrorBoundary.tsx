import * as React from 'react'
import { ErrorMessageContainer } from './ErrorMessage/ErrorMessageContainer'

type Props = {
  children: React.ReactNode
}

type State = {
  hasError: boolean
  error: string
  errorInfo: string
}

export class ErrorBoundary extends React.Component<Props, State> {
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
