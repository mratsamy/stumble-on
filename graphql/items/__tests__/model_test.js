import mongoose from "mongoose"
import ItemModel from "~graphql/items/resolvers"

describe("Item Model Test", () => {
    const itemData = {
        name: "Fake Item",
        description: "I am a fake item",
        expirationDate: new Date(),
        amount: 16,
        measurementType: "oz",
        almostEmpty: false,
    }

    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err)
                process.exit(1)
            }
        })
    })

    it("create & save user successfully", async () => {
        const validItem = new ItemModel(itemData)
        const savedItem = await validItem.save()
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedItem._id).toBeDefined()
        expect(savedUser.name).toBe(itemData.name)
        expect(savedUser.gender).toBe(itemData.gender)
        expect(savedUser.dob).toBe(itemData.dob)
        expect(savedUser.loginUsing).toBe(itemData.loginUsing)
    })
})
