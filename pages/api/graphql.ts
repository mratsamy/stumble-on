import ApolloServer from "~api/graphql"
import connectDb from "~lib/mongoose"

export const config = {
    api: {
        bodyParser: false,
    },
}

const server = ApolloServer.createHandler({ path: "/api/graphql" })
export default connectDb(server)
