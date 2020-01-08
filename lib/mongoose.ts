import mongoose from "mongoose"
import { NextApiRequest, NextApiResponse } from "next"

const connectDb = (handler) => async (request: NextApiRequest, response: NextApiResponse) => {
    if (mongoose.connections[0].readyState !== 1) {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    }

    return handler(request, response)
}

const db = mongoose.connection
db.once("open", () => {
    console.log("connected to mongo")
})

export default connectDb
