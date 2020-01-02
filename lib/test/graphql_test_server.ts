import { graphql } from "graphql"
import { makeExecutableSchema } from "graphql-tools"

import typeDefs from "~api/typeDefs"
import resolvers from "~api/resolvers"

const schema = makeExecutableSchema({ typeDefs, resolvers })

export const graphqlTestCall = async (query: any, variables?: any, userId?: number | string) => {
    return graphql(
        schema,
        query,
        undefined,
        {
            req: {
                session: {
                    userId,
                },
            },
            res: {
                clearCookie: () => {},
            },
        },
        variables
    )
}
