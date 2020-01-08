import LocationModel from "~api/locations/locations"

export const LocationResolvers = {
    Query: {
        getLocation(object, args, context, info) {
            const { id } = args

            try {
                return { location: LocationModel.findById(id) }
            } catch (e) {
                console.log(e)
            }
        },
    },
}
