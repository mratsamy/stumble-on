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
        it("should update the existing location", async () => {})

        it("should allow the location to become a super parent", async () => {})

        it("should handle a missing id", async () => {})
    })

    describe("removeLocation", () => {
        it("should delete a location", async () => {})

        it("should handle a call missing an id", async () => {})
    })

    describe("updateLocations", () => {})
})
