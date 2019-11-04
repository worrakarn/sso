import Joi from "@hapi/joi";
import mongoose from "../config/db";
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        email: { type: String, default: "" },
        firstname: { type: String },
        lastname: { type: String },
        password: { type: String },
        username: { type: String },
        createdAt: {
            type: Date,
            default: Date.now
        },
        createdAtId: { type: Number },
        updatedAt: {
            type: Date,
            default: Date.now
        },
        updatedAtId: { type: Number }
    },
    { versionKey: false }
);
export const UserModel = mongoose.model("users", UserSchema);

export const joiCreateUser = Joi.object({
    email: Joi.string()
        .label("clientId"),
    firstname: Joi.string()
        .required()
        .label("clientSecret"),
    lastname: Joi.string()
        .required()
        .label("clientSecret"),
    password: Joi.string()
        .required()
        .label("clientSecret"),
    username: Joi.string()
        .required()
        .label("clientSecret"),
});
