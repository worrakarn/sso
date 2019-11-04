import _ from "lodash";
import { UserModel, joiCreateUser } from "../model/sso.user.model";

export default class User {
    constructor(Fn, auth) {
        this.Fn = Fn;
        this.auth = auth;
    }

    async validateSaveUser(dataReq) {
        const schema = joiCreateUser;
        let vali = this.Fn.validate(dataReq, schema);
        return vali;
    }

    async saveUser(dataReq) {
        const user = new UserModel(dataReq);

        return await user.save();
    }

    async viewUser() {
        const users = await UserModel.find()
            .select("-_id email firstname lastname username")
            .exec();
        return users;
    }
}
