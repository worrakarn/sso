import Container from "./container";
import OAuth2Server from "oauth2-server";
import Global from "../service/global.service";
import Client from "../service/sso.client.service";
import OAuth from "../service/sso.oauth.service";
import User from "../service/sso.user.service";

const oauth2 = new OAuth(new Global());

const oauth = new OAuth2Server({
    model: oauth2,
    accessTokenLifetime: 60 * 60,
    allowBearerTokensInQueryString: true
});

const container = new Container();
container.register("global", Global);
container.register("sso.oauth", oauth);
container.register("sso.client", Client, ["global", "sso.oauth"]);
container.register("sso.user", User, ["global", "sso.oauth"]);

export default container;
