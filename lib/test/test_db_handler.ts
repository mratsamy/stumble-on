import mongoose from "mongoose"
import { MongoMemoryServer } from "mongodb-memory-server"

const mongod = new MongoMemoryServer()

/**
 * Connect to the in-memory db.
 */
export const connect = async () => {
    const uri = await mongod.getConnectionString()

    const mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }

    await mongoose.connect(uri, mongooseOptions)
}

/**
 * Drop database, close the connection and stop mongod.
 */
export const closeDatabase = async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongod.stop()
}

/**
 * Remove all the data for all db collections.
 */
export const clearDatabase = async () => {
    const collections = mongoose.connection.collections

    for (let key in collections) {
        const collection = collections[key]
        await collection.deleteMany({})
    }
}
