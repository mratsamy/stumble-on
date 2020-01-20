import App from "next/app"
import React from "react"
import withApolloClient from "~lib/with-apollo-client"
import { ApolloProvider } from "@apollo/react-hooks"
import { NextComponentType } from "next"

type Props = {
    apolloClient: any
    Component: NextComponentType
}

type State = {}

class MyApp extends App<Props, State> {
    render() {
        const { Component, pageProps, apolloClient } = this.props

        return (
            <ApolloProvider client={apolloClient}>
                <Component {...pageProps} />
            </ApolloProvider>
        )
    }
}

export default withApolloClient(MyApp)
