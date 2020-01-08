import * as dbHandler from "~lib/test/test_db_handler"
import { graphqlTestCall } from "~lib/test/graphql_test_server"
import LocationModel, { ILocationModel } from "~api/locations/locations"

/**
 * @jest-environment node
 */
describe("Location Mutation Suite", () => {
    beforeAll(async () => await dbHandler.connect())

    afterEach(async () => await dbHandler.clearDatabase())

    afterAll(async () => await dbHandler.closeDatabase())

    describe("addLocation", () => {
        const addLocationMutation = `
            mutation addLocationMutation($input: LocationInput!) {
                addLocation(location: $input) {
                    location {
                        _id
                        name
                        description
                        parent
                        createdAt
                        updatedAt
                    }
                }
            }
        `

        it("should add a new location", async () => {
            const input = {
                name: "Input 1",
                subLocationDepth: 0,
                description: "I am a parent",
            }

            const response = await graphqlTestCall(addLocationMutation, {
                input,
            })

            const { data: { addLocation: { location = {} } = {} } = {} } = response
            expect(location._id).toBeDefined()
            expect(location.name).toBe(input.name)
            expect(location.description).toBe(input.description)
            expect(location.createdAt).toBeDefined()
            expect(location.updatedAt).toBeDefined()
        })

        it("should NOT create a new location without the required fields", async () => {
            const response = await graphqlTestCall(addLocationMutation, {
                input: {
                    description: "i don't have a name",
                },
            })

            expect(response.data).toBeUndefined()
            expect(response.errors.length).toBeGreaterThan(0)
        })
    })

    describe("updateLocation", () => {
        const updateLocationMutation = `
            mutation updateLocation($location: UpdateLocationInput!) {
                updateLocation(location: $location) {
                    location {
                        _id
                        name
                        description
                        parent
                        createdAt
                        updatedAt
                    }
                }
            }
        `

        let locationInstance: ILocationModel
        beforeEach(async () => {
            locationInstance = await LocationModel.create({
                name: "Im a location",
                description: "I am a really important description",
            })
        })

        afterEach(async () => {
            await dbHandler.clearDatabase()
        })

        it("should update the existing location", async () => {
            const location = {
                _id: locationInstance.id.toString(),
                name: "I am a new name",
                description: "I am the new description",
            }

            const oldUpdatedAt = JSON.parse(JSON.stringify(locationInstance.updatedAt))
            const response = await graphqlTestCall(updateLocationMutation, {
                location,
            })

            const { data: { updateLocation: { location: updatedLocation = {} } = {} } = {} } = response

            expect(updatedLocation._id).toEqual(locationInstance.id.toString())
            expect(updatedLocation.name).toBe(location.name)
            expect(updatedLocation.description).toBe(location.description)
            expect(updatedLocation.createdAt).toBe(new Date(locationInstance.createdAt).getTime())
            expect(updatedLocation.updatedAt).not.toBe(new Date(oldUpdatedAt).getTime())
        })

        it("should allow the location to become a super parent", async () => {
            const location = {
                _id: locationInstance.id.toString(),
                name: "I am a new name",
                parent: null,
                description: "I am the new description",
            }

            const response = await graphqlTestCall(updateLocationMutation, { location })
            const { data: { updateLocation: { location: { _id = null, parent = false } = {} } = {} } = {} } = response

            expect(_id.toString()).toBe(location._id)
            expect(parent).toBe(null)
        })

        it("should handle a missing id", async () => {
            const location = {
                name: "I am a new name",
                parent: null,
                description: "I am the new description",
            }

            const response = await graphqlTestCall(updateLocationMutation, { location })

            expect(response.errors.length).toBeGreaterThan(0)
        })
    })

    describe("removeLocation", () => {
        const removeLocationMutation = `
            mutation removeLocation($id: ID!) {
                removeLocation(id: $id) {
                    location {
                        _id
                        name
                        description
                        createdAt
                        updatedAt
                    }
                }
            }
        `

        let locationInstance: ILocationModel
        beforeEach(async () => {
            locationInstance = await LocationModel.create({
                name: "Im a location",
                description: "I am a really important description",
            })
        })

        afterEach(async () => {
            await dbHandler.clearDatabase()
        })

        it("should delete a location", async () => {
            const response = await graphqlTestCall(removeLocationMutation, { id: locationInstance.id.toString() })
            const {
                data: {
                    removeLocation: {
                        location: { name = "", description = "", createdAt = "", updatedAt = "" } = {},
                    } = {},
                } = {},
            } = response

            expect(name).toBe(locationInstance.name)
            expect(description).toBe(locationInstance.description)
            expect(createdAt).toBe(new Date(locationInstance.createdAt).getTime())
            expect(updatedAt).toBe(new Date(locationInstance.updatedAt).getTime())
        })

        it("should handle a call missing an id", async () => {
            const response = await graphqlTestCall(removeLocationMutation, {})

            expect(response.errors.length).toBeGreaterThan(0)
        })
    })

    describe("updateLocations", () => {
        const updateLocationsMutation = `
            mutation updateLocations($locations: UpdateLocationsInput!) {
                updateLocations(locations: $locations) {
                    locations {
                        _id
                        name
                        description
                        parent
                    }
                }
            }
        `

        let locationInstance: ILocationModel, secondLocation: ILocationModel
        beforeEach(async () => {
            locationInstance = await LocationModel.create({
                name: "Im a location",
                description: "I am a really important description",
            })

            secondLocation = await LocationModel.create({
                name: "Im a location",
                description: "I am a really important description",
            })
        })

        afterEach(async () => {
            await dbHandler.clearDatabase()
        })

        it("should set the parent id of the location to the new location id", async () => {
            expect(locationInstance.parent).toBe(null)

            const response = await graphqlTestCall(updateLocationsMutation, {
                locations: {
                    locations: [locationInstance.id.toString()],
                    parent: secondLocation.id.toString(),
                },
            })

            const { data: { updateLocations: { locations = [] } = {} } = {} } = response

            expect(locations.length).toBeGreaterThan(0)
            locations.forEach((location) => {
                expect(location.parent.toString()).toBe(secondLocation.id.toString())
            })
        })
    })
})
