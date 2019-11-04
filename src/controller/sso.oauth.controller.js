import _ from "lodash";
import rsCode from "../public/result-code.json";

export async function obtainToken(req, res, next) {
    try {
        let resultReturn = {
            resultCode: "210",
            resultMessage: rsCode.POST["210"],
            resultData: []
        };

        const container = req.app.get("context");
        const auth = container.get("sso.oauth");
        const Fn = container.get("global");

        const ReqAndRes = Fn.RequestAndResponse(req, res);
        const request = ReqAndRes.request;
        const response = ReqAndRes.response;

        return auth
            .token(request, response)
            .then(function(token) {
                resultReturn.resultData = token;
                res.json(resultReturn);
            })
            .catch(function(err) {
                const error = Fn.errorHandler(err, resultReturn);
                if (error.resultCode == 401 || error.resultCode == 400)
                    res.status(error.resultCode).send(resultReturn);
                else next(error);
            });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export async function authenticateRequest(req, res, next) {
    try {
        let resultReturn = {
            resultCode: "100",
            resultMessage: rsCode.GET["100"],
            resultData: []
        };

        const container = req.app.get("context");
        const auth = container.get("sso.oauth");
        const Fn = container.get("global");

        const ReqAndRes = Fn.RequestAndResponse(req, res);
        const request = ReqAndRes.request;
        const response = ReqAndRes.response;

        return auth
            .authenticate(request, response)
            .then(function(token) {
                res.send(resultReturn);
            })
            .catch(function(err) {
                const error = Fn.errorHandler(err, resultReturn);
                if (error.resultCode == 401 || error.resultCode == 400)
                    res.status(error.resultCode).send(resultReturn);
                else next(error);
            });
    } catch (error) {
        next(error);
    }
}
