import Joi from "@hapi/joi";
import mongoose from "../config/db";
const Schema = mongoose.Schema;

const ClientSchema = new Schema(
    {
        id: { type: String },
        clientId: { type: String },
        clientSecret: { type: String },
        clientName: { type: String },
        grants: { type: Array },
        redirectUris: { type: Array },
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
export const ClientModel = mongoose.model("client", ClientSchema);

export const joiCreateClient = Joi.object({
    clientId: Joi.string()
        .required()
        .label("clientId"),
    clientSecret: Joi.string()
        .required()
        .label("clientSecret"),
    grants: Joi.array()
        .items(Joi.string())
        .required()
        .label("grants"),
    redirectUris: Joi.array()
        .items(Joi.string())
        .required()
        .label("redirectUris")
});
