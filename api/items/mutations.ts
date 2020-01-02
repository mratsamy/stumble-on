import ItemModel from "~api/items/items"
import LocationModel from "~api/locations/locations"
import { UserInputError } from "apollo-server-micro"

export const ItemMutations = {
    Mutation: {
        async addItem(object, { item }, context, info) {
            const defaults = {
                count: 0,
                amount: 0,
            }

            try {
                const newItem = await ItemModel.create({
                    ...Object.assign({}, defaults, item),
                })

                return { item: newItem }
            } catch (e) {
                console.log(e)
                throw new UserInputError("AddItem arguments are invalid")
            }
        },
        updateItem(object, { item }, context, info) {
            try {
                const { _id, ...newOptions } = item
                return ItemModel.findByIdAndUpdate(_id, { ...newOptions }, { runValidators: true, new: true })
                    .exec()
                    .then((itemInstance) => ({ item: itemInstance }))
            } catch (e) {
                console.log(e)
                throw new UserInputError("Unable to find and update item")
            }
        },
        removeItem(object, { id }, context, info) {
            try {
                return ItemModel.findByIdAndDelete(id)
                    .exec()
                    .then((itemInstance) => {
                        const response = { item: itemInstance }
                        if (itemInstance.locationID) {
                            response["getLocation"] = itemInstance.locationID
                        }

                        return response
                    })
            } catch (e) {
                console.log(e)
                throw new UserInputError("Unable to find and delete item")
            }
        },
        async moveItems(object, args, context, info) {
            const updatedItems = [],
                errorItems = []

            const { items: { ids = [], newLocationID = undefined } = {} } = args

            let locationInstance
            await LocationModel.findById(newLocationID)
                .exec()
                .then((value) => (locationInstance = value))
                .catch((error) => {
                    throw new UserInputError("Invalid location id.")
                })

            console.log(locationInstance)

            await Promise.all(
                ids.map((id) => {
                    return ItemModel.findByIdAndUpdate(id, { locationID: newLocationID })
                        .exec()
                        .then((value) => {
                            updatedItems.push(id)
                        })
                        .catch((e) => errorItems.push(id))
                })
            )

            return { updatedItems, errorItems }

            try {
            } catch (e) {}
        },
    },
}
