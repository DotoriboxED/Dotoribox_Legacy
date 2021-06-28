import { Router, Request, Response } from 'express';
import db from '../../models';
import sendErrorResponse from '../../tool/error';
import { TaxiNotFoundError, SampleNotFoundError } from '../../tool/errorException';

const router = Router();

router.post('/', async (req: Request, res: Response, next: Function) => {
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
            throw new TaxiNotFoundError();

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
        next(err);
    }
});

router.post('/:taxiId/sample', async (req: Request, res: Response, next: Function) => {
    const { taxiId } = req.params;
    const { sampleId, stock } = req.body;

    try {
        const checkTaxi = await db.Taxi.findOne({
            id: +taxiId,
            isDeleted: false
        });

        if (!checkTaxi)
            throw new TaxiNotFoundError();
        
        const checkSample = await db.Sample.findOne({
            id: sampleId,
            isDeleted: false
        });

        if (!checkSample)
            throw new SampleNotFoundError();

        const checkDuplicated = await db.Taxi.findOne({
            id: +taxiId,
            isDeleted: false,
            'samples._id': checkSample._id
        });

        if (checkDuplicated?.samples)
            return sendErrorResponse(res, 404, 'sample_already_exists');

        await db.Stock.createStock(+taxiId, {
            sample: checkSample._id,
            sampleId: checkSample.id,
            taxiId: checkTaxi.id,
            stock
        });

        res.sendStatus(201);
    } catch (err) {
        next(err);
    }
});

router.get('/', async (req: Request, res: Response, next: Function) => {
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
        next(err);
    }
});

router.get('/:taxiId', async (req: Request, res: Response, next: Function) => {
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
                throw new TaxiNotFoundError();
        } else {
            result = await db.Taxi.findOne({
                id: +taxiId,
                isDeleted: false,
            }).populate('samples.sample');

            if (!result || result.isDeleted)
                throw new TaxiNotFoundError();
        }

        res.json(result);
    } catch (err) {
        next(err);
    }
});

router.get('/:taxiId/stock', async (req: Request, res: Response, next: Function) => {
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
        next(err);
    }
});

router.put('/:taxiId', async (req: Request, res: Response, next: Function) => {
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

    try {
        await db.Taxi.updateByTaxiId(+taxiId, update);

        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
});

router.put('/:taxiId/recover', async (req: Request, res: Response, next: Function) => {
    const { taxiId } = req.params;

    try {
        const result: any = await db.Taxi.findOneAndUpdate({
            id: +taxiId,
            isDeleted: true
        },{
            isDeleted: false
        }, {
            new: false
        });

        if (!result || !result.isDeleted)
            throw new TaxiNotFoundError();

        res.json(result);
    } catch (err) {
        next(err);
    }
})

router.delete('/:taxiId', async (req: Request, res: Response, next: Function) => {
    const { taxiId } = req.params;

    try {
        const result: any = await db.Taxi.findOneAndUpdate({
            id: taxiId,
            isDeleted: false
        }, {
            isDeleted: true
        }, {
            new: false
        });

        if (!result || result.isDeleted)
            return sendErrorResponse(res, 404, 'taxi_not_exists');

        res.json(result);
    } catch (err) {
        next(err);
    }
});

router.delete('/:taxiId/sample/:sampleId', async (req: Request, res: Response, next: Function) => {
    const { taxiId, sampleId } = req.params;

    try {
        const result = await db.Taxi.findOne({
            id: +taxiId,
            isDeleted: false,
            'samples.isDeleted': false,
            'samples.sampleId': sampleId
        });

        if (!result)
            throw new TaxiNotFoundError();

        await db.Stock.deleteSample(+taxiId, +sampleId);

        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
})

export default router;