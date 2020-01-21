import App from "next/app"
import React from "react"
import withApolloClient from "~lib/with-apollo-client"
import { ApolloProvider } from "@apollo/react-hooks"
import { NextComponentType } from "next"
import ApolloClient from "apollo-client"
import { NormalizedCacheObject } from "apollo-cache-inmemory"
import "normalize.css/normalize.css"

type Props = {
    apolloClient: ApolloClient<NormalizedCacheObject>
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
