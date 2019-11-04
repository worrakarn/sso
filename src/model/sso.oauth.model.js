import mongoose from "../config/db";
const Schema = mongoose.Schema;

const TokenSchema = new Schema(
    {
        accessToken: { type: String },
        accessTokenExpiresAt: { type: Date },
        client: { type: Object },
        clientId: { type: String },
        refreshToken: { type: String },
        refreshTokenExpiresAt: { type: Date },
        user: { type: Object },
        userId: { type: String },
        scope: { type: Array },
        flagCredential: { type: Boolean },
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
export const TokenModel = mongoose.model("tokens", TokenSchema);
