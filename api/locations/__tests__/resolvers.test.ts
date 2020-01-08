import * as dbHandler from "~lib/test/test_db_handler"
import LocationModel, { ILocationModel } from "~api/locations/locations"
import { ILocation } from "~api/interfaces/location"
import { graphqlTestCall } from "~lib/test/graphql_test_server"

/**
 * @jest-environment node
 */
describe("Item Resolver Suite", () => {
    const createLocations = (count: number): Promise<ILocationModel[]> => {
        if (count < 0) return

        return Promise.all(
            Array.from("x".repeat(count)).map((_, index) => {
                let location: ILocation = {
                    name: `item-#-${index + 1}`,
                    description: "I am a description",
                }

                return LocationModel.create(location)
            })
        )
    }

    const GetItemQuery = `
            query getLocation($id: ID!) {
                getLocation(id: $id) {
                    location {
                        _id
                        name
                        description
                    }
                }
            }
        `

    beforeAll(async () => await dbHandler.connect())

    afterEach(async () => await dbHandler.clearDatabase())

    afterAll(async () => await dbHandler.closeDatabase())

    it("should retrieve an item", async () => {
        const locations: Array<ILocationModel> = await createLocations(1)
        const locationInstance = locations.shift()

        const response = await graphqlTestCall(GetItemQuery, { id: locationInstance._id.toString() })
        const {
            data: {
                getLocation: { location },
            },
        } = response

        expect(locationInstance._id.toString()).toBe(location._id)
        expect(locationInstance.name).toBe(location.name)
        expect(locationInstance.description).toEqual(location.description)
    })

    it("should handle not finding a value", async () => {
        const [location] = await createLocations(1)

        const fakeID = ("true" + location.id.toString()).substring(0, location.id.toString().length)
        const response = await graphqlTestCall(GetItemQuery, { id: fakeID })

        const { data: { getLocation: { location: foundLocation = null } = {} } = {} } = response
        expect(foundLocation).toBeFalsy()
    })

    xit("should be able to query multiple locations", () => {
        expect(true).toBeFalsy()
    })
})
