import cookie from "cookie"

import { UserModel } from "~api/users/users"

export const UserMutation = {
    Mutation: {
        async signIn(object, args, context, info) {
            const { email, password } = args
            const user = await UserModel.signIn(email, password)

            if (user) {
                context.res.setHeader(
                    "Set-Cookie",
                    cookie.serialize("Token", JSON.stringify(user.toAuthJSON()), {
                        httpOnly: true,
                        path: "/",
                        maxAge: 1000 * 60 * 60 * 24 * 60 /* 60 days */,
                        secure: process.env.NODE_ENV === "production",
                    })
                )
                // todo set the cookie
                //
            }

            // todo, what to do when it's not that person
        },
        signOut(object, args, context, info) {},
    },
}
