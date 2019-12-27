import { Error } from "mongoose"

import * as dbHandler from "~lib/test_db_handler"
import LocationModel from "~graphql/locations/locations"

describe("Location Model Suite - Mongoose ", () => {
    const { ValidationError } = Error

    const locationData = {
        name: "Fake Location",
        description: "Master Bedroom",
        parent: null,
    }

    beforeAll(async () => await dbHandler.connect())

    afterEach(async () => await dbHandler.clearDatabase())

    afterAll(async () => await dbHandler.closeDatabase())

    it("should create & save a location successfully", async () => {
        const validLocation = new LocationModel(locationData)
        const savedLocation = await validLocation.save()

        expect(savedLocation._id).toBeDefined()
        expect(savedLocation.name).toBe(locationData.name)
        expect(savedLocation.description).toBe(locationData.description)
        expect(savedLocation.parent).toBe(locationData.parent)
        expect(savedLocation.createdAt).toBeDefined()
        expect(savedLocation.updatedAt).toBeDefined()
    })

    it("should allow a valid parent id", async () => {
        const validParentLocation = new LocationModel(locationData)
        const parentLocation = await validParentLocation.save()

        const childLocation = await new LocationModel({ ...locationData, parent: parentLocation._id }).save()

        expect(childLocation.parent).toBe(parentLocation._id)
        expect(childLocation.parent).toBeDefined()
    })

    it("should require a name", async () => {
        let locationInstance = { ...locationData }
        delete locationInstance["name"]

        expect(LocationModel.create(locationInstance)).rejects.toThrowError(ValidationError)
    })

    it("should require a description", async () => {
        let locationInstance = { ...locationData }
        delete locationInstance["description"]

        expect(LocationModel.create(locationInstance)).rejects.toThrowError(ValidationError)
    })
})
