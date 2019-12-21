import ApolloServer from "~graphql/apolloServer"

export const config = {
    api: {
        bodyParser: false,
    },
}

export default ApolloServer.createHandler({ path: "/api/graphql" })
