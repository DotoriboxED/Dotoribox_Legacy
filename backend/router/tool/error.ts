import { Response } from 'express';

const errTexts: any = {
    'unknown_error': '알 수 없는 오류가 발생했습니다.',

    'invalid_form': '필수항목이 입력되지 않았습니다.',
    'sample_not_exists': 'Sample이 존재하지 않습니다.',
    'review_not_exists': 'Review가 존재하지 않습니다.',
    'permanent_needs_delete': '완전삭제를 하려면 먼저 삭제를 해야 합니다.',

    'taxi_not_exists': '해당 TaxiNumber를 가진 Taxi가 존재하지 않습니다.',
    'taxi_already_exists': '해당 TaxiNumber를 가진 Taxi가 이미 존재합니다.',

    'sample_already_exists': '이미 추가하려는 Sample이 있습니다.',

}

function sendErrorResponse(res: Response, statusCode: number, errText: string, err?: Error) {
    console.log("ERROR handled by sendErrorResponse");
    console.log("ERROR PARAM: statusCode" + statusCode + ", errText " + errText);
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