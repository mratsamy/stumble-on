import React from "react"
import { NextPage } from "next"
import Head from "next/head"
import ApolloClient from "apollo-client"
import { ApolloProvider } from "@apollo/react-hooks"
import fetch from "isomorphic-unfetch"
import { InMemoryCache } from "apollo-cache-inmemory"
import { HttpLink } from "apollo-link-http"

export const withApollo = (PageComponent: NextPage) => {
    const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
        const client = apolloClient || initApolloClient(apolloState)

        return (
            <ApolloProvider client={client}>
                <PageComponent {...pageProps} />
            </ApolloProvider>
        )
    }

    WithApollo.getInitialProps = async (ctx) => {
        const { AppTree } = ctx
        const apolloClient = (ctx.apolloClient = initApolloClient())

        let pageProps = {}
        if (PageComponent.getInitialProps) {
            pageProps = await PageComponent.getInitialProps(ctx)
        }

        // if on server
        if (typeof window === "undefined") {
            if (ctx.res && ctx.res.finished) {
                return pageProps
            }

            try {
                const { getDataFromTree } = await import("@apollo/react-ssr")
                await getDataFromTree(<AppTree pageProps={{ ...pageProps, apolloClient }} />)
            } catch (e) {
                console.error(e)
            }

            Head.rewind()
        }

        const apolloState = apolloClient.cache.extract()

        return {
            ...pageProps,
            apolloState,
        }
    }

    return WithApollo
}

const initApolloClient = (initialState = {}) => {
    const ssrMode: boolean = typeof window === "undefined"
    const cache = new InMemoryCache().restore(initialState)

    return new ApolloClient({
        cache,
        ssrMode,
        link: new HttpLink({ uri: `http://${process.env.URL ?? "localhost:3000"}/api/graphql`, fetch }),
    })
}
