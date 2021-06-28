import { Router, Request, Response } from 'express';
import db from '../../models';
import sendErrorResponse from '../../tool/error';
import { ReviewNotFoundError, UnknownError } from '../../tool/errorException';

const router = Router();

router.get('/', async (req: Request, res: Response, next: Function) => {
    const { taxiNumber, taxiId, sampleCode, isMale, age, time, score } = req.query;

    const options: Record<string, unknown> = {}
    const sort: Record<string, unknown> = {}

    if (isMale) options.isMale = isMale;
    if (age) options.age    = age;
    if (sampleCode) options.sampleCode = sampleCode
    if (taxiNumber) options.taxiNumber = taxiNumber
    if (taxiId) options.id = taxiId;

    if (time == 'asc' || time == 'desc') sort.time = time;
    if (score == 'asc' || score == 'desc') sort.score = score;

    try {
        const result = await db.Customer.find(options).sort(sort);

        res.json(result);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req: Request, res: Response, next: Function) => {
    const { taxiNumber, sampleCode, isMale, age } = req.body;

    if (!taxiNumber || !sampleCode || isMale === undefined || !age)
        return sendErrorResponse(res, 400, 'invalid_form')

    try {
        await db.Stock.useSample(+taxiNumber, +sampleCode);

        // taxiNumber를 TaxiID로 수정하기
        const item = await db.Customer.create({
            taxiId: taxiNumber,
            sampleCode,
            isMale,
            age
        });

        res.json(item);
    } catch (err) {
        next(err);
    }
});

router.post('/:customerId/evaluate', async (req: Request, res: Response, next: Function) => {
    const { customerId } = req.params;
    const { score, review } = req.body;
    const data: Record<string, unknown> = {};

    if (score) data.score = score;
    if (review) data.review = review;

    try {
        const result = db.Customer.findOneAndUpdate({
            id: customerId
        }, data, {
            new: true
        });

        if (!result)
            throw new ReviewNotFoundError();

        res.json(result);
    } catch (err) {
        next(err);
    }
});

export default router;