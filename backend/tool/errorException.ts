export class UnknownError extends Error {
    message = '알 수 없는 오류가 발생했습니다.';
    status = 500;
}

export class TaxiSampleNotFoundError extends Error {
    message = '택시 내 샘플이 존재하지 않습니다.';
    status = 404;
}

export class TaxiNotFoundError extends Error {
    message = '택시가 존재하지 않습니다.';
    status = 404;
}

export class SampleNotFoundError extends Error {
    message = '샘플이 존재하지 않습니다.';
    status = 404;
}

export class SampleAlreadyExistError extends Error {
    message = '샘플이 이미 존재합니다.';
    status = 409;
}

export class InvalidFormError extends Error {
    message = '입력한 형식이 올바르지 않습니다.';
    status = 400;
}

export class ReviewNotFoundError extends Error {
    message = '리뷰가 존재하지 않습니다.';
    status = 404;
}

export class NotDeletedError extends Error {
    message = '먼저 일반 삭제가 되어 있어야 합니다.';
    status = 409;
}