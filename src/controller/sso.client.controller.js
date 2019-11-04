import _ from "lodash";
import rsCode from "../public/result-code.json";

export async function saveClientController(req, res, next) {
    try {
        let resultReturn = {
            resultCode: "210",
            resultMessage: rsCode.POST["210"],
            resultData: []
        };
        const container = req.app.get("context");
        const Client = container.get("sso.client");

        const ReqAndRes = Client.Fn.RequestAndResponse(req, res);
        const request = ReqAndRes.request;
        const response = ReqAndRes.response;

        return Client.auth
            .authenticate(request, response)
            .then(async function(token) {
                if (token.refreshToken) {
                    throw {
                        code: 401,
                        name: "invalid_token"
                    };
                } else {
                    let dataReq = Client.Fn.trimObj(req.body);
                    const alert = await Client.validateSaveClient(dataReq);
                    if (!_.isEmpty(alert)) throw [alert, 3];

                    const result = await Client.saveClient(dataReq);
                    resultReturn.resultData = result;
                    
                    res.status(200).send(resultReturn);
                }
            })
            .catch(function(err) {
                const error = Client.Fn.errorHandler(err, resultReturn);
                if (error.resultCode == 401 || error.resultCode == 400)
                    res.status(error.resultCode).send(resultReturn);
                else next(error);
            });
    } catch (error) {
        next(error);
    }
}

export async function viewClientController(req, res, next) {
    try {
        let resultReturn = {
            resultCode: "100",
            resultMessage: rsCode.GET["100"],
            resultData: []
        };
        const container = req.app.get("context");
        const Client = container.get("sso.client");

        const ReqAndRes = Client.Fn.RequestAndResponse(req, res);
        const request = ReqAndRes.request;
        const response = ReqAndRes.response;

        return Client.auth
            .authenticate(request, response)
            .then(async function(token) {
                if (token.refreshToken) {
                    throw {
                        code: 401,
                        name: "invalid_token"
                    };
                } else {
                    const result = await Client.viewClient();
                    if (_.isEmpty(result))
                        Client.Fn.resultMessage(2, resultReturn);
                    resultReturn.resultData = result;
                    res.status(200).send(resultReturn);
                }
            })
            .catch(function(err) {
                const error = Client.Fn.errorHandler(err, resultReturn);
                if (error.resultCode == 401 || error.resultCode == 400)
                    res.status(error.resultCode).send(resultReturn);
                else next(error);
            });
    } catch (error) {
        next(error);
    }
}
