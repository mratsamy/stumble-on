import ItemModel from "~graphql/items/items"

export const ItemMutations = {
    Mutation: {
        async addItem(object, args, context, info) {
            const { item } = args
            try {
                const newItem = await ItemModel.create({
                    ...item,
                })

                return newItem
            } catch (e) {
                console.log(e)
            }
        },
    },
}
