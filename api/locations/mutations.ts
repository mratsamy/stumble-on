import LocationModel from "~api/locations/locations"

export const LocationMutations = {
    Mutation: {
        addLocation(parent, args, context, info) {
            const { location } = args
            return {
                location: LocationModel.create({ ...location }),
            }
        },
        async updateLocation(parent, args, context, info) {
            const {
                location: { _id, subLocationDepth, ...newArgs },
            } = args

            let newDetails
            try {
                await LocationModel.findByIdAndUpdate(_id, { ...newArgs }, { runValidators: true, new: true })
                    .exec()
                    .then((value) => (newDetails = value))
            } catch (e) {
                console.log(e)
            }

            return { location: newDetails }
        },
        removeLocation(parent, { id }, context, info) {
            try {
                return LocationModel.findByIdAndDelete(id)
                    .exec()
                    .then((location) => {
                        return { location }
                    })
            } catch (e) {
                console.log(e)
            }
        },
        async updateLocations(parent, args, context, info) {
            const {
                locations: { parent: parentID, locations },
            } = args

            try {
                return {
                    locations: locations.map((id) =>
                        LocationModel.findByIdAndUpdate(id, { parent: parentID }, { new: true })
                    ),
                }
            } catch (e) {
                console.log(e)
            }
        },
    },
}
