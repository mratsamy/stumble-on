import mongoose, { Schema } from "mongoose"

export interface ILocation {
    _id?: String
    name: String
    description: String
    parent?: String
    createdAt?: String
    updatedAt?: String
}

export type LocationType = {
    _id: String
    name: String
    description: String
    parent?: String
    createdAt: String
    updatedAt: String
}

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

export default mongoose.models.items || mongoose.model("locations", LocationsSchema)
