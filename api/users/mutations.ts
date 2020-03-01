import { AuthenticationError, ApolloError } from "apollo-server-micro"
import { NextApiResponse } from "next"

import { setCookie } from "~lib/setCookie"
import { AccessToken, RefreshToken } from "~api/token"
import { UserModel, IUser } from "~api/users/users"

export const UserMutation = {
    Mutation: {
        async updatePassword(object, args, context, info) {
            const { user, res: response }: { user: IUser | false; res: NextApiResponse } = context
            if (user === false) {
                throw new AuthenticationError("You must be signed in in order to update your password")
            }

            user.count = +user.count + 1
            user.setPassword(args.newPassword)

            try {
                const updatedUser = await user.save({ validateBeforeSave: true })
                let refreshToken = RefreshToken.createToken(updatedUser),
                    accessToken = AccessToken.createToken(updatedUser)

                if (accessToken !== false && refreshToken !== false) {
                    setCookie(response, "AccessToken", accessToken, { maxAge: AccessToken.expiresInMS })
                    setCookie(response, "RefreshToken", refreshToken, { maxAge: RefreshToken.expiresInMS })
                }

                return { user: updatedUser }
            } catch (error) {
                throw new ApolloError("There was an issue updating your password.")
            }
        },
    },
}
