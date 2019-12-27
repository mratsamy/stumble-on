import { mockServer } from "graphql-tools"

import * as dbHandler from "~lib/test_db_handler"
import { graphqlTestCall } from "~lib/graphql_test_server"
import ItemModel from "~graphql/items/items"

describe("Item Mutation Suite", () => {
    beforeAll(async () => await dbHandler.connect())

    afterEach(async () => await dbHandler.clearDatabase())

    afterAll(async () => await dbHandler.closeDatabase())

    describe("addItem", () => {
        it("should return a new item", async () => {
            const addItemMutation = `
            mutation addItem($itemInput: ItemInput!) {
                addItem(itemInput: $itemInput) {
                    item {
                        _id
                        name 
                        description 
                        expirationDate
                        amount 
                        location 
                        measurementType 
                        almostEmpty
                        createdAt
                        updatedAt
                    }
                }
            }
            `

            const testItem = {
                itemInput: {
                    name: "fake Item",
                    description: "Im a fake item",
                    expirationDate: new Date(),
                    amount: 12,
                    measurementType: "OZ",
                    almostEmpty: false,
                },
            }

            const {
                data: { item },
            } = await graphqlTestCall(addItemMutation, testItem)

            expect(item._id).toBeDefined()
            expect(item.createdAt).toBeDefined()
            expect(item.updatedAt).toBeDefined()
            expect(item.name).toBe(testItem.itemInput.name)
            expect(item.description).toBe(testItem.itemInput.description)
            expect(item.expirationDate).toBe(testItem.itemInput.expirationDate)
            expect(item.amount).toBe(testItem.itemInput.amount)
            expect(item.almostEmpty).toBe(testItem.itemInput.almostEmpty)
            expect(item.measurementType).toBe(testItem.itemInput.measurementType)
        })
    })
})
