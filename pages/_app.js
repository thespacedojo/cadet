import App, {Container} from 'next/app'
import React from 'react'
import withApolloClient from '../lib/with-apollo-client'
import { ApolloProvider } from 'react-apollo'
import { ServerStyleSheet } from 'styled-components'

class MyApp extends App {
  componentDidMount() {
    const cadetId = localStorage.getItem('cadetId') || this.props.router.query.cadet
    if (cadetId)
      this.setState({cadetId})
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state && this.state.cadetId) {
      localStorage.setItem('cadetId', this.state.cadetId)
    }
  }

  updateCadet = (cadetId) => {
    this.setState({cadetId})
  }

  render () {
    const {Component, pageProps, apolloClient} = this.props
    pageProps['updateCadet'] = this.updateCadet
    pageProps['cadetId'] = this.state && this.state.cadetId
    return <Container>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Container>
  }
}

export default withApolloClient(MyApp)
