import * as React from 'react';
import { Button } from '../components/Button';
import './ErrorBoundary.scss'

type Props = {
  children: React.ReactNode
}

type State = {
  hasError: boolean
  error: string
  errorInfo: string
  showDetails: boolean
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
    showDetails: false
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({ error })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={cn}>
          An error occured. We're sorry that happened :(
          <br />
          <Button onClick={() => this.setState({ showDetails: true })}>
            Show details
          </Button>
          {this.state.showDetails && (
            <div>
              {this.state.error}
            </div>
          )}
        </div>
      )
    }
    return this.props.children
  }
}