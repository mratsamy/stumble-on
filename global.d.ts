declare module "*.graphql" {
    import { DocumentNode } from "graphql"

    const value: DocumentNode
    export = value
}

declare namespace API {
    type token<TokenType> = TokenType | false
}
