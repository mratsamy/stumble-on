import { NextApiRequest } from "next"
import { ApolloServer, AuthenticationError } from "apollo-server-micro"

import typeDefs from "~graphql/typeDefs"
import resolvers from "~graphql/resolvers"

// this section does
const context = ({ request }: { request: NextApiRequest }) => {
    const token = request?.headers?.authorization || ""
    // const user = getUser();
    // if (!user) {
    // throw new AuthenticationError("you must be logged in") // this is from apollo docs, maybe do something different w/ next
    // }

    // return { user }
}

const apolloServer = new ApolloServer({ typeDefs, resolvers })

export default apolloServer
