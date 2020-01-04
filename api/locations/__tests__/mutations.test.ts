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
                    _id: ID!
                    name: String!
                    description: String!
                    parent: String
                    subLocations: [Location]!
                    createdAt: Date
                    updatedAt: Date
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
                input: {
                    ...input,
                },
            })

            const { data: { addLocation: { item = {} } = {} } = {} } = response
            console.log(response)
            expect(item._id).toBeDefined()
            expect(item.name).toBe(input.name)
            expect(item.description).toBe(input.description)
            expect(item.createdAt).toBeDefined()
            expect(item.updatedAt).toBeDefined()
        })

        it("should NOT create a new location without the required fields", async () => {})
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
