import { mergeResolvers } from "graphql-toolkit"
import { GraphQLScalarType } from "graphql"
import { Kind } from "graphql/language"

import { ItemMutations } from "~api/items/mutations"
import { ItemResolvers } from "~api/items/resolvers"
import { LocationMutations } from "~api/locations/mutations"
import { LocationResolvers } from "~api/locations/resolvers"

const baseScalarType = {
    Date: new GraphQLScalarType({
        name: "Date",
        description: "Date custom scalar",
        parseValue(value) {
            return new Date(value) // value from the client
        },
        serialize(value) {
            return value.getTime() //value sent to the client
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                return new Date(ast.value)
            }
            return null
        },
    }),
}

export default mergeResolvers([baseScalarType, ItemMutations, ItemResolvers, LocationMutations, LocationResolvers])
