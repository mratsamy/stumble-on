import { gql } from "apollo-server-micro"
import { mergeTypeDefs } from "graphql-toolkit"

import ItemSchema from "./items/Items.graphql"
import LocationSchema from "./locations/Locations.graphql"

const baseTypeDefs = gql`
    scalar Date
`

export default mergeTypeDefs([baseTypeDefs, ItemSchema, LocationSchema])
