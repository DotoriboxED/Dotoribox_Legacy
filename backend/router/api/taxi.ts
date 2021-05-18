import { Router, Request, Response } from 'express';
import db from '../../models';
import sendErrorResponse from '../tool/error';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    const { taxiNumber } = req.body;

    try {
        const check = await db.Taxi.findOne({
            taxiNumber
        });

        if (check)
            return sendErrorResponse(res, 403, 'taxi_already_exists');

        await db.Taxi.create({
            taxiNumber
        });

        res.sendStatus(201);
    } catch (err) {
        sendErrorResponse(res, 500, 'unknown_error', err);
    }
});

router.get('/', async (req: Request, res: Response) => {
    const { isDeleted } = req.query;

    try {
        let result;
        if (!isDeleted) {
            result = await db.Taxi.find({
                isDeleted: false
            });
        } else {
            result = await db.Taxi.find({
                isDeleted: true
            });
        }

        res.json(result);
    } catch (err) {
        sendErrorResponse(res, 500, 'unknown_error', err);
    }
});

router.get('/:taxiId', async (req: Request, res: Response) => {
    const { taxiId } = req.params;

    try {
        const result: any = await db.Taxi.findOne({
            id: taxiId,
            isDeleted: false
        });

        if (!result || !result.isDeleted)
            return sendErrorResponse(res, 404, 'taxi_not_exists');

        res.json(result);
    } catch (err) {
        sendErrorResponse(res, 500, 'unknown_error', err);
    }
});

router.put('/:taxiId/recover', async (req: Request, res: Response) => {
    const { taxiId } = req.params;

    try {
        const result: any = await db.Taxi.findOne({
            id: taxiId,
            isDeleted: true
        });

        if (!result || !result.isDeleted)
            return sendErrorResponse(res, 404, 'taxi_not_exists');

        await db.Taxi.updateOne({
            id: taxiId,
            isDeleted: true
        }, {
            isDeleted: false
        });

        res.sendStatus(200);
    } catch (err) {
        sendErrorResponse(res, 500, 'unknown_error', err);
    }
})

router.delete('/:taxiId', async (req: Request, res: Response) => {
    const { taxiId } = req.params;

    try {
        const result: any = await db.Taxi.findOne({
            id: taxiId,
            isDeleted: false
        });

        if (!result || result.isDeleted)
            return sendErrorResponse(res, 404, 'taxi_not_exists');

        await db.Taxi.updateOne({
            id: taxiId,
            isDeleted: false
        }, {
            isDeleted: true
        });

        res.sendStatus(200);
    } catch (err) {
        sendErrorResponse(res, 500, 'unknown_error', err);
    }
});

export default router;