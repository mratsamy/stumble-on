import mongoose, { Schema, SchemaDefinition } from "mongoose"

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
