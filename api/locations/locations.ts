import { Schema, Document, Model, model, models } from "mongoose"
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

export default models.Locations || model<ILocationModel>("Locations", LocationsSchema)
