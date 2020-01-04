import { Schema, Document, Model, model } from "mongoose"
import { IItem } from "~api/interfaces/item"

export enum MeasurementType {
    OZ,
    FL_OZ,
    NONE,
    ML,
    G,
}

export interface IItemsModel extends Document, IItem, timestamps {}

const ItemsSchema = new Schema(
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
        locationID: {
            type: Schema.Types.ObjectId,
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
        almostEmpty: {
            type: Boolean,
            required: true,
        },
    },
    { timestamps: true }
)

const Item: Model<IItemsModel> = model<IItemsModel>("Items", ItemsSchema)

export default Item
