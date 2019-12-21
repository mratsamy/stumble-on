import { gql } from "apollo-server-micro"

const typeDefs = gql`
    type Query {
        sayHello: string
    }
`

export default typeDefs
