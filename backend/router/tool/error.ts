import { Response } from 'express';

const errTexts: any = {
    'unknown_error': '알 수 없는 오류가 발생했습니다.',

    'invalid_form': '필수항목이 입력되지 않았습니다.'
}

function sendErrorResponse(res: Response, statusCode: number, errText: string, err?: Error) {
    console.log("ERROR handled by sendErrorResponse");
    console.log("ERROR PARAM: statusCode" + statusCode + ", errText" + errText);
    console.log("ERROR: ");
    console.log(err);

    if (errText && errTexts[errText]) {
        res
            .status(statusCode)
            .json({
                'error': errTexts[errText]
            });
        return;
    }

    res.sendStatus(statusCode);
}

export default sendErrorResponse;