import ItemModel from "~api/items/items"

export const ItemResolvers = {
    Query: {
        getItem(object, args, context, info) {
            const { id } = args

            return { item: ItemModel.findById(id).exec() }
        },
        getItems(object, args, context, info) {
            const {} = args
        },
    },
}
