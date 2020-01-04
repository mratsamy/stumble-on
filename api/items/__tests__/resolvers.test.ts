import * as dbHandler from "~lib/test/test_db_handler"
import ItemModel, { IItemsModel } from "~api/items/items"
import { IItem } from "~api/interfaces/item"
import { graphqlTestCall } from "~lib/test/graphql_test_server"

/**
 * @jest-environment node
 */
describe("Item Resolver Suite", () => {
    const createItems = (count: number): Promise<IItemsModel[]> => {
        if (count < 0) return

        return Promise.all(
            Array.from("x".repeat(count)).map((_, index) => {
                let item: IItem = {
                    name: `item-#-${index + 1}`,
                    count: 1,
                    amount: 5,
                    almostEmpty: false,
                }

                return ItemModel.create(item)
            })
        )
    }

    beforeAll(async () => await dbHandler.connect())

    afterEach(async () => await dbHandler.clearDatabase())

    afterAll(async () => await dbHandler.closeDatabase())

    it("should retrieve an item", async () => {
        const items: Array<IItemsModel> = await createItems(1)
        const itemInstance = items.shift()

        const GetItemQuery = `
            query getItem($id: ID!) {
                getItem(id: $id) {
                    item {
                        _id
                        name
                        count
                        amount
                    }
                }
            }
        `

        const response = await graphqlTestCall(GetItemQuery, { id: itemInstance._id.toString() })
        const {
            data: {
                getItem: { item },
            },
        } = response

        expect(itemInstance._id.toString()).toBe(item._id)
        expect(itemInstance.name).toBe(item.name)
        expect(itemInstance.count).toEqual(item.count)
        expect(itemInstance.amount).toEqual(item.amount)
    })

    xit("should be completed", () => {
        expect(true).toBeFalsy()
    })
})
