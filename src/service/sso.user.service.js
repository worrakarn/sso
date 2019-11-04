import _ from "lodash";
import { UserModel, joiCreateUser } from "../model/sso.user.model";
import md5 from "md5";

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
        dataReq.password = md5(dataReq.password);
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
