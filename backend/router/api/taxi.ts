import { Router, Request, Response } from 'express';
import db from '../../models';
import sendErrorResponse from '../tool/error';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    const { 
        taxiNumber, 
        driverName, 
        phoneNumber, 
        accountNumber, 
        licensePlate, 
        group } = req.body;

    try {
        const check = await db.Taxi.findOne({
            taxiNumber
        });

        if (check)
            return sendErrorResponse(res, 403, 'taxi_already_exists');

        await db.Taxi.create({
            taxiNumber,
            driver: {
                name: driverName,
                phoneNumber,
                accountNumber,
                licensePlate,
                group
            }
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

router.get('/:taxiNumber', async (req: Request, res: Response) => {
    const { taxiNumber } = req.params;

    try {
        const result: any = await db.Taxi.findOne({
            taxiNumber: +taxiNumber,
            isDeleted: false
        });

        if (!result || result.isDeleted)
            return sendErrorResponse(res, 404, 'taxi_not_exists');

        res.json(result);
    } catch (err) {
        sendErrorResponse(res, 500, 'unknown_error', err);
    }
});

router.put('/:taxiNumber', async (req: Request, res: Response) => {
    const { taxiNumber } = req.params;
    const keys = ['driverName', 'phoneNumber', 'taxiNumber', 'accountNumber', 'licensePlate', 'group'];
    const update: Record<string, unknown> = {}

    Object.keys(req.body).forEach(key => key in keys ? update[key] = req.body[key] : null);

    await db.Taxi.updateOne({
        taxiNumber: +taxiNumber,
        isDeleted: false
    }, update);

    const result = await db.Taxi.updateByTaxiNumber(+taxiNumber, update);

    if (!result)
        return sendErrorResponse(res, 404, 'taxi_not_exists');
    
    res.sendStatus(200);

});

router.put('/:taxiNumber/recover', async (req: Request, res: Response) => {
    const { taxiNumber } = req.params;

    try {
        const result: any = await db.Taxi.findOne({
            taxiNumber: +taxiNumber,
            isDeleted: true
        });

        if (!result || !result.isDeleted)
            return sendErrorResponse(res, 404, 'taxi_not_exists');

        await db.Taxi.updateOne({
            taxiNumber: +taxiNumber,
            isDeleted: true
        }, {
            isDeleted: false
        });

        res.sendStatus(200);
    } catch (err) {
        sendErrorResponse(res, 500, 'unknown_error', err);
    }
})

router.delete('/:taxiNumber', async (req: Request, res: Response) => {
    const { taxiNumber } = req.params;

    try {
        const result: any = await db.Taxi.findOne({
            taxiNumber: +taxiNumber,
            isDeleted: false
        });

        if (!result || result.isDeleted)
            return sendErrorResponse(res, 404, 'taxi_not_exists');

        await db.Taxi.updateOne({
            taxiNumber: +taxiNumber,
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