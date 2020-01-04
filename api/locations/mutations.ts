import LocationModel from "~api/locations/locations"

export const LocationMutations = {
    Mutation: {
        addLocation(parent, args, context, info) {
            const { location } = args
            return {
                location: LocationModel.create({ ...location }),
            }
        },
    },
}
