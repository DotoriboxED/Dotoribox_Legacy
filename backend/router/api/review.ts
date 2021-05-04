import { Router, Request, Response } from 'express';
import db from '../../models';

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
        console.log(err)
        res.sendStatus(500);
    }
});

router.post('/', async (req: Request, res: Response) => {
    const { taxiNumber, sampleCode, isMale, age, score, review } = req.body;
    const data: Record<string, unknown> = {taxiNumber, sampleCode, isMale, age};

    if (score)
        data.score = score;
    if (review)
        data.review = review;

    try {
        await db.Customer.create(data);

        res.sendStatus(201);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

export default router;