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
        expirationDate: Date,
        count: {
            type: Number,
            required: true,
            min: [0, "Can't have negative amounts"],
            validate: {
                validator(value) {
                    return Number.isInteger(value)
                },
            },
        },
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
                validator(value) {
                    return Object.keys(MeasurementType).includes(value.toUpperCase())
                },
            },
        },
        almostEmpty: Boolean,
    },
    { timestamps: true }
)

export default mongoose.models.items || mongoose.model("items", ItemsSchema)
