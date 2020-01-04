export const LocationMutations = {
    Mutation: {
        addLocation(parent, args, context, info) {
            const { location } = args
            console.log(location)
        },
    },
}
