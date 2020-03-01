import { NextApiResponse } from "next"

import { UserModel } from "~api/users/users"
import { setCookie } from "~lib/setCookie"
import { AccessToken, RefreshToken } from "~api/token"
import { AuthenticationError } from "apollo-server-micro"

export const UserResolvers = {
    Query: {
        getUser(object, args, context, info) {
            const { id } = args
            return { user: UserModel.findById(id).exec() }
        },
        async signIn(object, args, context, info) {
            const { email, password } = args
            const user = await UserModel.signIn(email, password)

            if (user) {
                let accessToken = AccessToken.createToken(user),
                    refreshToken = RefreshToken.createToken(user)

                if (accessToken !== false && refreshToken !== false) {
                    setCookie(context.res, "RefreshToken", refreshToken, { maxAge: RefreshToken.expiresInMS })
                    setCookie(context.res, "AccessToken", accessToken, { maxAge: AccessToken.expiresInMS })
                }
            } else {
                throw new AuthenticationError("Invalid user credentials.")
            }

            return { user }
        },
        signOut(object, args, context: { res: NextApiResponse }, info) {
            context.res.removeHeader("AccessToken")
            context.res.removeHeader("RefreshToken")
        },
    },
}
