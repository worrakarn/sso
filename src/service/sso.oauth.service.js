import _ from "lodash";
import { ClientModel } from "../model/sso.client.model";
import { UserModel } from "../model/sso.user.model";
import { TokenModel } from "../model/sso.oauth.model";
import { Session } from "inspector";
import md5 from "md5";

export default class Oauth2 {
    constructor(Fn) {
        this.Fn = Fn;
    }

    async getAccessToken(token) {
        const tokens = await TokenModel.findOne()
            .where({ accessToken: token })
            .exec();

        if (tokens.flagCredential && tokens) tokens.user = {};
        return tokens;
    }

    async getClient(clientId, clientSecret) {
        let clients = [];
        if (clientSecret) {
            clients = await ClientModel.findOne()
                .and([{ clientId: clientId }, { clientSecret: clientSecret }])
                .exec();
        } else {
            clients = await ClientModel.findOne()
                .where({ clientId: clientId })
                .exec();
        }

        return clients;
    }

    async saveToken(token, client, user) {
        token.client = {
            id: client.clientId
        };

        _.isObject(user)
            ? (token.user = { username: user.username })
            : (token.user = {});
        _.isObject(user)
            ? (token.flagCredential = false)
            : (token.flagCredential = true);

        const Token = new TokenModel(token);

        let condition = token.flagCredential
            ? [
                  { client: { id: client.clientId } },
                  { flagCredential: token.flagCredential }
              ]
            : [
                  { client: { id: client.clientId } },
                  { flagCredential: token.flagCredential },
                  { user: { username: user.username } }
              ];

        let session = null;

        await TokenModel.startSession()
            .then(async _session => {
                session = _session;
                session.startTransaction();

                await TokenModel.deleteMany().and(condition);
            })
            .then(async () => await Token.save())
            .then(() => session.commitTransaction())
            .catch(error => {
                session.abortTransaction();
                throw error;
            });

        return token;
    }

    async getUser(username, password) {
        password = md5(password);
        const users = await UserModel.findOne()
            .and([{ username: username }, { password: password }])
            .exec();
        return users;
    }

    async getUserFromClient(client) {
        let clients = await ClientModel.findOne()
            .and([
                { clientId: client.clientId },
                { clientSecret: client.clientSecret }
            ])
            .exec();

        return !!clients;
    }

    async getRefreshToken(refreshToken) {
        const tokens = await TokenModel.findOne()
            .where({ refreshToken: refreshToken })
            .exec();
        return tokens;
    }

    async revokeToken(token) {
        const tokens = await TokenModel.deleteOne()
            .where({ refreshToken: token.refreshToken })
            .exec();

        return !!tokens.n;
    }
}
