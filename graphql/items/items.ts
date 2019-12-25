import mongoose, { Schema } from "mongoose"

enum MeasurementType {
    OZ,
    FL_OZ,
    ML,
    G,
}

export const ItemsSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 2,
        },
        description: String,
        expirationDate: {},
        amount: {
            type: Number,
            required: true,
            min: [0, "Can't have negative amounts"],
        },
        location: {
            type: mongoose.Schema.Types.ObjectId,
            index: true,
        },
        measurementType: {
            type: String,
            required: false,
            uppercase: true,
            validate: {
                validator(value: string) {
                    return Object.keys(MeasurementType).includes(value.toUpperCase())
                },
            },
        },
        almostEmpty: Boolean,
    },
    {}
)

export default mongoose.models.items || mongoose.model("items", ItemsSchema)
