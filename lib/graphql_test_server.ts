import { graphql } from "graphql"
import { makeExecutableSchema } from "graphql-tools"

import typeDefs from "~graphql/typeDefs"
import resolvers from "~graphql/resolvers"

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
