import { UserModel } from "~api/users/users"

export const UserResolvers = {
    Query: {
        getUser(object, args, context, info) {
            const { id } = args
            return { user: UserModel.findById(id).exec() }
        },
    },
}
