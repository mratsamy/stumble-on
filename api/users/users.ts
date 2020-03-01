import { Schema, Document, Model, model, models } from "mongoose"
import uniqueValidator from "mongoose-unique-validator"
import crypto from "crypto"

import { IUserDocument } from "~api/interfaces/user"
import { NextApiRequest } from "next"

export interface IUser extends Document, IUserDocument, timestamps {
    setPassword(password: string): void
    validPassword(password: string): boolean
}

export interface IUserModel extends Model<IUser> {
    signIn(email: string, password: string): Promise<IUser | false>
}

const UsersSchema = new Schema(
    {
        email: {
            type: String,
            lowercase: true,
            unique: true,
            index: true,
            match: [/\S+@\S+\.\S+/, "is invalid"],
            required: [true, "Can't be blank"],
        },
        password: {
            type: String,
            required: [true, "Can't be bland"],
        },
        count: {
            type: Number,
            required: true,
            min: 0,
        },
        displayName: String,
        salt: String,
        hash: String,
    },
    { timestamps: true }
)

UsersSchema.plugin(uniqueValidator, { message: "is already taken." })

UsersSchema.methods.setPassword = function(password: string): void {
    this.salt = crypto.randomBytes(16).toString("hex")
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex")
}

UsersSchema.methods.validPassword = function(password: string): boolean {
    return this.hash === crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex")
}

UsersSchema.statics.signIn = async function(email: string, password: string): Promise<IUser | false> {
    const user = await this.model.findOne({ email }).exec()

    if (user && user.validPassword(password)) {
        return user
    }

    return false
}

export const UserModel: IUserModel = model<IUser, IUserModel>("Users", UsersSchema)
