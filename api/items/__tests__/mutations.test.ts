import * as dbHandler from "~lib/test/test_db_handler"
import { graphqlTestCall } from "~lib/test/graphql_test_server"
import ItemModel, { IItemsModel } from "~api/items/items"
import LocationModel from "~api/locations/locations"

/**
 * @jest-environment node
 */
describe("Item Mutation Suite", () => {
    beforeAll(async () => await dbHandler.connect())

    afterEach(async () => await dbHandler.clearDatabase())

    afterAll(async () => await dbHandler.closeDatabase())

    describe("addItem", () => {
        const addItemMutation = `
            mutation addItemMutation($itemInput: ItemInput!) {
                addItem(item: $itemInput) {
                    item {
                    _id
                    name
                    count 
                    description
                    expirationDate
                    amount 
                    measurementType 
                    almostEmpty
                    createdAt
                    updatedAt
                    }
                }
            }
            `

        it("should return a new item", async () => {
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

            const response = await graphqlTestCall(addItemMutation, testItem)
            const { data: { addItem: { item = {} } = {} } = {} } = response

            expect(item._id).toBeDefined()
            expect(item.createdAt).toBeDefined()
            expect(item.updatedAt).toBeDefined()
            expect(item.name).toBe(testItem.itemInput.name)
            expect(item.description).toBe(testItem.itemInput.description)
            expect(item.expirationDate).toBe(new Date(testItem.itemInput.expirationDate).getTime())
            expect(item.amount).toBe(testItem.itemInput.amount)
            expect(item.almostEmpty).toBe(testItem.itemInput.almostEmpty)
            expect(item.measurementType).toBe(testItem.itemInput.measurementType)
        })

        it("should return an error when the request is invalid", async () => {
            const testItem = {
                itemInput: {
                    expirationDate: new Date(),
                    amount: -1,
                    measurementType: "OZ",
                    almostEmpty: false,
                },
            }

            const response = await graphqlTestCall(addItemMutation, testItem)
            expect(response.errors.length).toBeGreaterThan(0)
        })
    })

    describe("updateItem", () => {
        const updateItem = `
        mutation updateItemMutation($updateItem: UpdateItemInput!) {
            updateItem(item: $updateItem) {
                item {
                    _id
                    name
                    count 
                    description
                    expirationDate
                    amount 
                    measurementType 
                    almostEmpty
                    createdAt
                    updatedAt
                }
            }
        }
        `

        let modelInstance: IItemsModel

        beforeEach(async () => {
            modelInstance = await ItemModel.create({
                name: "Item #1",
                description: "Im an item",
                count: 1,
                amount: 16,
                measurementType: "OZ",
                almostEmpty: false,
            })
        })

        afterEach(async () => {
            await dbHandler.clearDatabase()
        })

        it("should update the item", async () => {
            const updatedData = {
                updateItem: {
                    _id: modelInstance._id.toString(),
                    name: "New name",
                    description: "new description",
                    count: 2,
                    amount: 15,
                    measurementType: "FL_OZ",
                },
            }

            const response = await graphqlTestCall(updateItem, updatedData)
            const { data: { updateItem: { item = {} } = {} } = {} } = response

            expect(item._id.toString()).toBe(modelInstance._id.toString())
            expect(item.name).toBe(updatedData.updateItem.name)
            expect(item.description).toBe(updatedData.updateItem.description)
            expect(item.count).toBe(updatedData.updateItem.count)
            expect(item.amount).toBe(updatedData.updateItem.amount)
            expect(item.measurementType).toBe(updatedData.updateItem.measurementType)
            expect(item.updatedAt).not.toBe(modelInstance.updatedAt)
        })

        it("should fail to update the errored item data", async () => {
            const updatedData = {
                updateItem: {
                    _id: modelInstance._id.toString(),
                    name: "",
                    description: "new description",
                    count: -1,
                    amount: -2,
                    measurementType: "FL_OZ",
                },
            }

            const response = await graphqlTestCall(updateItem, updatedData)
            expect(response.errors.length).toBeGreaterThan(0)
        })
    })

    describe("removeItem", () => {
        const removeItem = `
        mutation removeItemMutation($id: ID!) {
            removeItem(id: $id) {
                item {
                    _id
                    name
                    count 
                    description
                    expirationDate
                    amount 
                    measurementType 
                    almostEmpty
                    createdAt
                    updatedAt
                }
            }
        }
        `

        let modelInstance: IItemsModel

        beforeEach(async () => {
            modelInstance = await ItemModel.create({
                name: "Item #1",
                description: "Im an item",
                count: 1,
                amount: 16,
                measurementType: "OZ",
                almostEmpty: false,
            })
        })

        afterEach(async () => {
            await dbHandler.clearDatabase()
        })

        it("should remove the item and return the deleted item", async () => {
            const response = await graphqlTestCall(removeItem, { id: modelInstance._id.toString() })
            expect(response?.errors?.length).toBeUndefined()
            expect(modelInstance._id.toString()).toBe(response?.data?.removeItem?.item?._id)
        })

        it("should NOT remove the item and return the deleted item", async () => {
            const response = await graphqlTestCall(removeItem, { id: "fake id" })
            expect(response?.errors?.length).toBeGreaterThan(0)
        })
    })

    describe("moveItems", () => {
        const moveItemsMutation = `
            mutation moveItemsMutation($items: MoveItemsInput!) {
                moveItems(items: $items) {
                    updatedItems
                    errorItems
                }
            }
        `

        const modelInstances = []
        let secondLocation

        beforeAll(async () => {
            secondLocation = await LocationModel.create({
                name: "Second location",
                description: "I'm a second location",
            }).catch((error) => console.log(error))
        })

        beforeEach(async () => {
            await Promise.all(
                "12345".split("").map((itemId) => {
                    return ItemModel.create({
                        name: `Item #${itemId}`,
                        description: "Im an item",
                        count: 1,
                        locationId: "location-id-1",
                        amount: 16,
                        measurementType: "OZ",
                        almostEmpty: false,
                    })
                })
            )
                .then((values) => {
                    values.forEach((item) => modelInstances.push(item))
                })
                .catch((error) => console.log(error))
        })

        afterEach(async () => {
            modelInstances.splice(0, modelInstances.length)
            await dbHandler.clearDatabase().catch((error) => console.log(error))
        })

        it("should successfully update the items' ids to the new location", async () => {
            const response = await graphqlTestCall(moveItemsMutation, {
                items: {
                    ids: modelInstances.map((item) => item._id.toString()),
                    newLocationID: secondLocation._id.toString(),
                },
            })

            const {
                data: { moveItems: { updatedItems = undefined, errorItems = undefined } = {} },
            } = response

            expect(updatedItems).toHaveLength(modelInstances.length)
            expect(errorItems).toBeDefined()
            expect(errorItems).toHaveLength(0)
        })
    })
})
