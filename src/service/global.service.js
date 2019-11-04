import Joi from "@hapi/joi";
import _ from "lodash";
import rsCode from "../public/result-code.json";
import OAuth2Server from "oauth2-server";
const Request = OAuth2Server.Request;
const Response = OAuth2Server.Response;

export default class Global {
    trimObj(obj) {
        if (!Array.isArray(obj) && typeof obj != "object") return obj;

        return Object.keys(obj).reduce(
            function(acc, key) {
                acc[key.trim()] =
                    typeof obj[key] == "string"
                        ? obj[key].trim()
                        : this.trimObj(obj[key]);
                return acc;
            }.bind(this),
            Array.isArray(obj) ? [] : {}
        );
    }

    validate(value, schema, options) {
        let joiOptions = { convert: true, abortEarly: false };
        if (options) joiOptions = options;
        const result = schema.validate(value, joiOptions);
        if (result.error) {
            let arrEx = [];
            for (let err of result.error.details) {
                let positionMap = {
                    position: typeof err.path[0] == "number" ? err.path[0] : 0
                };
                let checkNumRow = _.findIndex(arrEx, positionMap);
                let countErrorPath = err.path.length;
                if (checkNumRow == -1) {
                    if (err.message.length > 1) {
                        arrEx.push({
                            position: positionMap.position,
                            error: [
                                {
                                    [this.validateIndex(
                                        countErrorPath,
                                        err
                                    )]: err.message.replace(/"/g, "")
                                }
                            ]
                        });
                    }
                } else {
                    if (err.message.length > 1) {
                        arrEx[checkNumRow].error[0][
                            this.validateIndex(countErrorPath, err)
                        ] = err.message.replace(/"/g, "");
                    }
                }
            }
            return arrEx;
        } else {
            return null;
        }
    }

    validateIndex(countErrorPath, err) {
        switch (countErrorPath) {
            case 1:
                return isNaN(parseInt(err.path[0]))
                    ? `${err.context.label}`
                    : err.context.path
                    ? `${err.path[0]}_${err.context.label}_${err.context.path}`
                    : `${err.path[0]}_${err.context.label}`;
            case 2:
                return `${err.path[0]}_${err.path[1]}`;
            case 3:
                return `${err.path[0]}_${err.path[1]}_${err.path[2]}`;
            case 4:
                return `${err.path[0]}_${err.path[1]}_${err.path[2]}_${
                    err.path[3]
                }`;
            case 5:
                return `${err.path[0]}_${err.path[1]}_${err.path[2]}_${
                    err.path[3]
                }_${err.path[4]}`;
            default:
                return err.context.key
                    ? `${err.context.key}`
                    : `${err.context.label}`;
        }
    }

    reverseDateTimeJoin(dateTime, Join) {
        const splitDate = value => value.split(" ");
        const reverseDate = value =>
            value
                .split(/\/|-/g)
                .reverse()
                .join(`${Join}`);
        const pipe = ops =>
            `${reverseDate(ops[0])} ${ops[1] ? ops[1] : ""}`.trim();
        return pipe(splitDate(dateTime));
    }

    NotAllow() {
        let resultReturn = {
            resultCode: "500",
            resultMessage: rsCode.ERROR["500"],
            resultData: []
        };

        resultReturn.resultData = "Invalid Token";
        return resultReturn;
    }

    padZero(number) {
        return number < 10 ? `0${number}` : number;
    }

    resultMessage(key, resultReturn) {
        switch (key) {
            case 1:
                resultReturn.resultCode = "100";
                resultReturn.resultMessage = rsCode.GET["100"];
                break;
            case 2:
                resultReturn.resultCode = "101";
                resultReturn.resultMessage = rsCode.GET["101"];
                break;
            case 3:
                resultReturn.resultCode = "102";
                resultReturn.resultMessage = rsCode.GET["102"];
                break;
            case 4:
                resultReturn.resultCode = "200";
                resultReturn.resultMessage = rsCode.POST["200"];
                break;
            case 5:
                resultReturn.resultCode = "201";
                resultReturn.resultMessage = rsCode.POST["201"];
                break;
            case 6:
                resultReturn.resultCode = "211";
                resultReturn.resultMessage = rsCode.POST["211"];
                break;
            case 7:
                resultReturn.resultCode = "212";
                resultReturn.resultMessage = rsCode.POST["212"];
                break;
            case 8:
                resultReturn.resultCode = "220";
                resultReturn.resultMessage = rsCode.POST["220"];
                break;
            case 9:
                resultReturn.resultCode = "300";
                resultReturn.resultMessage = rsCode.PUT["300"];
                break;
            case 10:
                resultReturn.resultCode = "301";
                resultReturn.resultMessage = rsCode.PUT["301"];
                break;
            case 11:
                resultReturn.resultCode = "302";
                resultReturn.resultMessage = rsCode.PUT["302"];
                break;
            case 12:
                resultReturn.resultCode = "303";
                resultReturn.resultMessage = rsCode.PUT["303"];
                break;
            case 13:
                resultReturn.resultCode = "400";
                break;
            case 14:
                resultReturn.resultCode = "401";
                break;
            case 15:
                resultReturn.resultCode = "600";
                resultReturn.resultMessage = rsCode.DELETE["600"];
                break;
            case 16:
                resultReturn.resultCode = "601";
                resultReturn.resultMessage = rsCode.DELETE["601"];
                break;
            default:
                resultReturn.resultCode = "500";
                resultReturn.resultMessage = rsCode.ERROR["500"];
                break;
        }
        return resultReturn;
    }

    RequestAndResponse(req, res) {
        let request = new Request(req);
        let response = new Response(res);

        return {
            request: request,
            response: response
        };
    }

    errorHandler(err, resultReturn) {
        if (err.code == 401 || err.code == 400) {
            let code = 13;
            err.code == 400 ? (code = 13) : (code = 14);
            this.resultMessage(code, resultReturn);
            resultReturn.resultMessage = err.name;
            return resultReturn;
        } else {
            return err;
        }
    }
}
