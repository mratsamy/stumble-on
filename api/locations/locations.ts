import { Schema, Document, Model, model } from "mongoose"
import { ILocation } from "~api/interfaces/location"

export interface ILocationModel extends ILocation, Document, timestamps {}

export const LocationsSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        parent: {
            type: Schema.Types.ObjectId,
            default: null,
        },
    },
    { timestamps: true }
)

const Location: Model<ILocationModel> = model<ILocationModel>("Locations", LocationsSchema)

export default Location
