import { ApolloClient } from "apollo-client"
import fetch from "isomorphic-unfetch"
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory"
import { HttpLink } from "apollo-link-http"

let apolloClient = null

interface Global extends NodeJS.Global {
    document: Document
    window: Window
    fetch?: typeof fetch
}

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
    ;(global as Global).fetch = fetch
}

function create(initialState?: NormalizedCacheObject) {
    return new ApolloClient({
        connectToDevTools: process.browser,
        ssrMode: !process.browser,
        link: new HttpLink({
            uri: process.env.GRAPHQL_URI || "http://localhost:3000/api/graphql",
            credentials: "same-origin",
        }),
        cache: new InMemoryCache().restore(initialState || {}),
    })
}

export default function initApollo(initialState?: NormalizedCacheObject) {
    // Make sure to create a new client for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if (!process.browser) {
        return create(initialState)
    }

    // Reuse client on the client-side
    if (!apolloClient) {
        apolloClient = create(initialState)
    }

    return apolloClient
}
