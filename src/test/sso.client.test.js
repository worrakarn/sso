import { assert, expect } from "chai";
import Client from "../service/sso.client.service";
import Fn from "../service/global.service";

const fn = new Fn();
const client = new Client(fn);

describe("Client", function() {
    xit("Save Client", async function() {
        await client.saveClient();
    });

    it("View Client", async function () {
        await client.viewClient();
    });
});
