import logger from './winston';
import _ from 'lodash';
import rsCode from '../public/result-code.json';
import Global from '../service/global.service';

export default function (err, req, res, next) {
    const global = new Global();
    let resultReturn = {
        'resultCode': '500',
        'resultMessage': rsCode.ERROR['500'],
        'resultData': []
    }
    
    if(err.length > 1) {
        resultReturn = global.resultMessage(err[1], resultReturn)
    }

    let msgErr = (err.message) ? err.message.toString().replace(/"/g, "") : err.length? err[0]: err;
    
    if (!_.isEmpty(_.filter(msgErr, { 'error': [] }))) {
        resultReturn.resultData = msgErr;
        res.status(400).send(resultReturn);
    }
    else {
        logger.error(msgErr);
        resultReturn.resultData = msgErr;
        res.status(500).send(resultReturn);
    }
}