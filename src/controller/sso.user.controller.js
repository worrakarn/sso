import _ from "lodash";
import rsCode from "../public/result-code.json";

export async function saveUserController(req, res, next) {
    try {
        let resultReturn = {
            resultCode: "210",
            resultMessage: rsCode.POST["210"],
            resultData: []
        };
        const container = req.app.get("context");
        const User = container.get("sso.user");

        const ReqAndRes = User.Fn.RequestAndResponse(req, res);
        const request = ReqAndRes.request;
        const response = ReqAndRes.response;

        return User.auth
            .authenticate(request, response)
            .then(async function(token) {
                if (token.refreshToken) {
                    throw {
                        code: 401,
                        name: "invalid_token"
                    };
                } else {
                    let dataReq = User.Fn.trimObj(req.body);
                    const alert = await User.validateSaveUser(dataReq);
                    if (!_.isEmpty(alert)) throw [alert, 3];

                    const result = await User.saveUser(dataReq);
                    resultReturn.resultData = result;

                    res.status(200).send(resultReturn);
                }
            })
            .catch(function(err) {
                const error = User.Fn.errorHandler(err, resultReturn);
                if (error.resultCode == 401 || error.resultCode == 400)
                    res.status(error.resultCode).send(resultReturn);
                else next(error);
            });
    } catch (error) {
        next(error);
    }
}

export async function viewUserController(req, res, next) {
    try {
        let resultReturn = {
            resultCode: "100",
            resultMessage: rsCode.GET["100"],
            resultData: []
        };
        const container = req.app.get("context");
        const User = container.get("sso.user");

        const ReqAndRes = User.Fn.RequestAndResponse(req, res);
        const request = ReqAndRes.request;
        const response = ReqAndRes.response;

        return User.auth
            .authenticate(request, response)
            .then(async function (token) {
                if (token.refreshToken) {
                    throw {
                        code: 401,
                        name: "invalid_token"
                    };
                } else {
                    const result = await User.viewUser();
                    if (_.isEmpty(result))
                        User.Fn.resultMessage(2, resultReturn);
                    resultReturn.resultData = result;
                    res.status(200).send(resultReturn);
                }
            })
            .catch(function (err) {
                const error = User.Fn.errorHandler(err, resultReturn);
                if (error.resultCode == 401 || error.resultCode == 400)
                    res.status(error.resultCode).send(resultReturn);
                else next(error);
            });
    } catch (error) {
        next(error);
    }
}
