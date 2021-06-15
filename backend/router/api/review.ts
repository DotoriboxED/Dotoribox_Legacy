import { Router, Request, Response } from 'express';
import db from '../../models';
import sendErrorResponse from '../tool/error';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const { taxiNumber, sampleCode, isMale, age, time, score } = req.query;

    const options: Record<string, unknown> = {}
    const sort: Record<string, unknown> = {}

    if (isMale) options.isMale = isMale;
    if (age) options.age    = age;
    if (sampleCode) options.sampleCode = sampleCode
    if (taxiNumber) options.taxiNumber = taxiNumber

    if (time == 'asc' || time == 'desc') sort.time = time;
    if (score == 'asc' || score == 'desc') sort.score = score;

    try {
        console.log(options.taxiNumber);
        const result = await db.Customer.find(options).sort(sort);

        res.json(result);
    } catch (err) {
        sendErrorResponse(res, 500, 'unknown_error', err);
    }
});

router.post('/', async (req: Request, res: Response) => {
    const { taxiNumber, sampleCode, isMale, age } = req.body;

    if (!taxiNumber || !sampleCode || isMale === undefined || !age)
        return sendErrorResponse(res, 400, 'invalid_form')

    try {
        const item = await db.Customer.create({
            taxiNumber,
            sampleCode,
            isMale,
            age
        });

        console.log(item);

        res.json({ id: item.id });
    } catch (err) {
        sendErrorResponse(res, 500, 'unknown_error', err);
    }
});

router.post('/:customerId/evaluate', async (req: Request, res: Response) => {
    const { customerId } = req.params;
    const { score, review } = req.body;
    const data: Record<string, unknown> = {};

    if (score) data.score = score;
    if (review) data.review = review;

    try {
        const isExist = await db.Customer.findOne({
            id: customerId
        });

        if (!isExist)
            return sendErrorResponse(res, 404, 'review_not_exists');

        await db.Customer.updateOne({
            id: customerId
        }, data);

        res.sendStatus(201);
    } catch (err) {
        sendErrorResponse(res, 500, 'unknown_error', err);
    }
});

export default router;