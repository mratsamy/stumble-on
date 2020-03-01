import { NextApiRequest, NextApiResponse } from "next"
import { ApolloServer } from "apollo-server-micro"

import typeDefs from "~api/typeDefs"
import resolvers from "~api/resolvers"
import { AccessToken, RefreshToken } from "~api/token"
import { StatusCode } from "~lib/statusCodes"
import { setCookie } from "~lib/setCookie"
import { UserModel, IUser } from "~api/users/users"

// Type declarations

type Context = {
    user: IUser | false
}

// End of Type declarations

// this section does
const context = async ({ req: request, res: response }: { req: NextApiRequest; res: NextApiResponse }) => {
    const accessToken: API.token<AccessToken.AccessToken> = AccessToken.isTokenValid(
        request.cookies["AccessToken"] || ""
    )
    const refreshToken: API.token<RefreshToken.RefreshToken> = RefreshToken.isTokenValid(
        request.cookies["RefreshToken"] || ""
    )
    let user: IUser | false = false,
        addUserToContext: boolean = false

    const contextObject: Context = {
        user: false,
    }

    if (!accessToken && !refreshToken) {
        response.status(StatusCode.Unauthorized)
    } else {
        user = await UserModel.findById((accessToken && accessToken.userId) || (refreshToken && refreshToken.userId))

        if (user) {
            if (accessToken && refreshToken && accessToken.count == user.count) {
                // all good, generate a new accesstoken & grab the user
                let refreshToken = RefreshToken.createToken(user)
                if (refreshToken) {
                    setCookie(response, "AccessToken", refreshToken, { maxAge: AccessToken.expiresInMS })
                    addUserToContext = true
                }
            } else if (accessToken) {
                user.count = 1 + +user.count
                try {
                    //@ts-ignore, TODO: Need to add an iterator def to IUser
                    const [error, updatedUser] = await user.save()
                    if (!error) {
                        let refreshToken = RefreshToken.createToken(updatedUser),
                            accessToken = AccessToken.createToken(updatedUser)

                        if (refreshToken !== false && accessToken !== false) {
                            setCookie(response, "AccessToken", accessToken, { maxAge: AccessToken.expiresInMS })
                            setCookie(response, "RefreshToken", refreshToken, { maxAge: RefreshToken.expiresInMS })
                            addUserToContext = true
                        }
                    }
                } catch {}
            }
        }
    }

    if (addUserToContext) {
        contextObject.user = user
    }

    return contextObject
}

const apolloServer = new ApolloServer({ typeDefs, resolvers, context })

export default apolloServer
