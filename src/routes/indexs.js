import express from "express";
import * as Client from "../controller/sso.client.controller";
import * as User from "../controller/sso.user.controller";
import * as Oauth2 from "../controller/sso.oauth.controller";

const router = express.Router();

router.post("/sso/save_client", Client.saveClientController);

router.get("/sso/view_client", Client.viewClientController);

router.post("/sso/save_user", User.saveUserController);

router.get("/sso/view_user", User.viewUserController);

router.all("/sso/token", Oauth2.obtainToken);

router.get("/sso/authenticate", Oauth2.authenticateRequest);

export default router;
