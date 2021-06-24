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

router.post('/:taxiId/sample', async (req: Request, res: Response) => {
    const { taxiId } = req.params;
    const { sampleId, stock } = req.body;

    console.log(sampleId);

    try {
        const checkTaxi = await db.Taxi.findOne({
            id: +taxiId,
            isDeleted: false
        });

        if (!checkTaxi)
            return sendErrorResponse(res, 404, 'taxi_not_exists');
        
        const checkSample = await db.Sample.findOne({
            id: sampleId,
            isDeleted: false
        });

        if (!checkSample)
            return sendErrorResponse(res, 404, 'sample_not_exists');

        const checkDuplicated = await db.Taxi.findOne({
            id: +taxiId,
            isDeleted: false,
            'samples._id': checkSample._id
        });

        if (checkDuplicated?.samples)
            return sendErrorResponse(res, 404, 'sample_already_exists');

        const item = await db.Stock.create({
            sample: checkSample._id,
            sampleId: checkSample.id,
            taxiId: checkTaxi.id,
            stock
        });

        await db.Taxi.createStock(+taxiId, {
            stockId: item.id
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
    const { isTaxiCode } = req.query;

    try {
        let result: any;

        if (isTaxiCode) {
            result = await db.Taxi.findOne({
                taxiNumber: +taxiId,
                isDeleted: false,
            });
    
            if (!result || result.isDeleted)
                return sendErrorResponse(res, 404, 'taxi_not_exists');
        } else {
            result = await db.Taxi.findOne({
                id: +taxiId,
                isDeleted: false,
            }).populate('samples.sample');

            if (!result || result.isDeleted)
                return sendErrorResponse(res, 404, 'taxi_not_exists');
        }

        res.json(result);
    } catch (err) {
        sendErrorResponse(res, 500, 'unknown_error', err);
    }
});

router.get('/:taxiId/stock', async (req: Request, res: Response) => {
    const { taxiId } = req.params;

    try {
        const result = await db.Taxi.aggregate([
            {
                $match: {
                    id: +taxiId,
                    isDeleted: false
                }
            },  
            {
                $lookup: {
                    from: 'stocks',
                    localField: 'samples.stockId',
                    foreignField: 'id',
                    as: 'stocks'
                }
            
            }, {
                $unwind: {
                    path: '$stocks',
                    preserveNullAndEmptyArrays: true
                }
            }, {
                $lookup: {
                    from: 'samples',
                    localField: 'stocks.sampleId',
                    foreignField: 'id',
                    as: 'stocks.info'
                }
            }, {
                $unwind: {
                    path: '$stocks.info',
                }
            }, {
                $group: {
                    _id: 0,
                    stocks: { $push: '$stocks' }
                }
            }
        ]);

        res.json(result)
    } catch (err) {
        sendErrorResponse(res, 500, 'unknown_error', err);
    }
});

router.put('/:taxiId', async (req: Request, res: Response) => {
    const { taxiId } = req.params;
    const { driverName, phoneNumber, taxiNumber, accountNumber, licensePlate, group } = req.body;
    const update: any = {};
    const driver: Record<string, unknown> = {};

    if (driverName) driver['driver.name'] = driverName;
    if (phoneNumber) driver['driver.phoneNumber'] = phoneNumber;
    if (taxiNumber) update.taxiNumber = taxiNumber;
    if (accountNumber) driver['driver.accountNumber'] = accountNumber;
    if (licensePlate) driver['driver.licensePlate'] = licensePlate;
    if (group) driver['driver.group'] = group;

    if (Object.keys(driver).length != 0) update["$set"] = driver;

    const result = await db.Taxi.updateByTaxiId(+taxiId, update);

    if (typeof(result) !== 'boolean')
        return sendErrorResponse(res, 500, 'unknown_error', result);

    if (!result)
        return sendErrorResponse(res, 404, 'taxi_not_exists');
    
    res.sendStatus(200);

});

router.put('/:taxiId/recover', async (req: Request, res: Response) => {
    const { taxiId } = req.params;

    try {
        const result: any = await db.Taxi.findOne({
            id: +taxiId,
            isDeleted: true
        });

        if (!result || !result.isDeleted)
            return sendErrorResponse(res, 404, 'taxi_not_exists');

        await db.Taxi.updateOne({
            id: +taxiId,
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

router.delete('/:taxiId/sample/:sampleId', async (req: Request, res: Response) => {
    const { taxiId, sampleId } = req.params;

    try {
        const result = await db.Taxi.findOne({
            id: +taxiId,
            isDeleted: false,
            'samples.isDeleted': false,
            'samples.sampleId': sampleId
        });

        if (!result)
            return sendErrorResponse(res, 404, 'sample_not_exists');

        await db.Taxi.deleteSample(+taxiId, +sampleId);

        res.sendStatus(200);
    } catch (err) {
        sendErrorResponse(res, 500, 'unknown_error', err);
    }
})

export default router;