import { assert, expect } from "chai";
import User from "../service/sso.user.service";
import Fn from "../service/global.service";

const fn = new Fn();
const user = new User(fn);

describe("User", function() {
    xit("Save User", async function() {
        await user.saveClient({
            'email': 'worrakarn.pal@gmail.com',
            'firstname': 'worrakarn',
            'lastname': 'palawat',
            'password': '123456',
            'username': 'worralarn.pal'
        });
    });
});
