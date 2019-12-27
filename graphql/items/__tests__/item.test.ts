import { Error } from "mongoose"

import * as dbHandler from "~lib/test_db_handler"
import ItemModel from "~graphql/items/items"

describe("Item Model Suite - Mongoose", () => {
    const { ValidationError } = Error

    const itemData = {
        name: "Fake Item",
        description: "I am a fake item",
        expirationDate: new Date(),
        amount: 16,
        count: 2,
        measurementType: "oz",
        almostEmpty: false,
    }

    beforeAll(async () => await dbHandler.connect())

    afterEach(async () => await dbHandler.clearDatabase())

    afterAll(async () => await dbHandler.closeDatabase())

    it("should create & save an item successfully", async () => {
        const validItem = new ItemModel(itemData)
        const savedItem = await validItem.save()

        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedItem._id).toBeDefined()
        expect(savedItem.name).toBe(itemData.name)
        expect(savedItem.description).toBe(itemData.description)
        expect(savedItem.expirationDate).toBe(itemData.expirationDate)
        expect(savedItem.amount).toBe(itemData.amount)
        expect(savedItem.count).toBe(itemData.count)
        expect(savedItem.measurementType).toBe(savedItem.measurementType.toUpperCase())
        expect(savedItem.almostEmpty).toBe(itemData.almostEmpty)
        expect(savedItem.createdAt).toBeDefined()
        expect(savedItem.updatedAt).toBeDefined()
    })

    it("should require a valid name", () => {
        let testItem = { ...itemData }
        delete testItem["name"]

        expect(ItemModel.create(testItem)).rejects.toThrowError(ValidationError)
        expect(ItemModel.create({ ...testItem, name: "a" })).rejects.toThrowError(ValidationError)
    })

    it("should require a valid `amount`", () => {
        let testItem = { ...itemData }
        delete testItem["amount"]

        expect(ItemModel.create(testItem)).rejects.toThrowError(ValidationError)
        expect(ItemModel.create({ ...testItem, amount: "string" })).rejects.toThrowError(ValidationError)
        expect(ItemModel.create({ ...testItem, amount: -1 })).rejects.toThrowError(ValidationError)
    })

    it("should require a valid count", () => {
        let testItem = { ...itemData }
        delete testItem["count"]

        expect(ItemModel.create(testItem)).rejects.toThrowError(ValidationError)
        expect(ItemModel.create({ ...testItem, count: -1 })).rejects.toThrowError(ValidationError)
        expect(ItemModel.create({ ...testItem, count: "string" })).rejects.toThrowError(ValidationError)
        expect(ItemModel.create({ ...testItem, count: 1.5 })).rejects.toThrowError(ValidationError)
    })

    it("should only allow valid expirationDate values", async () => {
        let testItem = { ...itemData }
        delete testItem["expirationDate"]

        const itemInstance = new ItemModel(testItem)
        const savedItem = itemInstance.save()

        expect(savedItem.expirationDate).toBeUndefined()
    })

    it("should only allow valid location values", async () => {
        let testItem = { ...itemData }
        delete testItem["location"]

        const itemInstance = new ItemModel(testItem)
        const savedItem = itemInstance.save()

        expect(savedItem.location).toBeUndefined()
    })

    it("should only allow valid measurementType values", async () => {
        let testItem = { ...itemData }
        delete testItem["measurementType"]

        expect((await ItemModel.create(testItem)).location).toBeUndefined()
        expect(ItemModel.create({ ...testItem, measurementType: "blah" })).rejects.toThrowError(ValidationError)
        expect(ItemModel.create({ ...testItem, measurementType: "zo" })).rejects.toThrowError(ValidationError)
        expect(ItemModel.create({ ...testItem, measurementType: "fl" })).rejects.toThrowError(ValidationError)
        expect(ItemModel.create({ ...testItem, measurementType: "fl oz" })).rejects.toThrowError(ValidationError)
    })
})
