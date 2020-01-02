import * as dbHandler from "~lib/test/test_db_handler"
import ItemModel from "~api/items/items"

/**
 * @jest-environment node
 */
describe("Item Resolver Suite", () => {
    beforeAll(async () => await dbHandler.connect())

    afterEach(async () => await dbHandler.clearDatabase())

    afterAll(async () => await dbHandler.closeDatabase())

    it("WIP", () => {
        expect(false).toBeFalsy()
    })
})
