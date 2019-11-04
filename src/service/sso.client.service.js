import _ from "lodash";
import { ClientModel, joiCreateClient } from "../model/sso.client.model";
import md5 from "md5";

export default class Client {
    constructor(Fn, auth) {
        this.Fn = Fn;
        this.auth = auth;
    }

    async validateSaveClient(dataReq) {
        const schema = joiCreateClient;
        let vali = this.Fn.validate(dataReq, schema);
        return vali;
    }

    async saveClient(dataReq) {
        dataReq.clientName = dataReq.clientId;
        dataReq.id = md5(dataReq.clientId);
        dataReq.clientId = md5(dataReq.clientId);
        dataReq.clientSecret = md5(dataReq.clientSecret);

        const client = new ClientModel(dataReq);

        return await client.save();
    }

    async viewClient() {
        const cliens = await ClientModel.find()
            .select("-_id clientId grants redirectUris")
            .exec();
        return cliens;
    }
}
