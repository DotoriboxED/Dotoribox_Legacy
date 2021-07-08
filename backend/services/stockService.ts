import db from '../models/index'
import {createStockDto} from '../models/dto/stockDTO'
import {
    SampleAlreadyExistError,
    SampleNotFoundError,
    TaxiNotFoundError,
    TaxiSampleNotFoundError
} from "../tool/errorException";

export default {
    async createStock (stockDto: createStockDto) {
        const result = await db.Stock.create(stockDto);

        const check = await db.Taxi.findOneAndUpdate({
            id: stockDto.taxiId,
            isDeleted: false
        }, {
            '$push': {
                samples: {
                    stockId: +result.id
                }
            }
        });

        if (!check) throw new TaxiNotFoundError();
        return check;
    },

    async useStock (stockDto: createStockDto) {
        const result = await db.Stock.findOneAndUpdate(stockDto.getObject(), {
            $inc: {
                stock: -1,
                sales: 1
            }
        });

        if (!result) throw new TaxiSampleNotFoundError();

        const update = await db.Sample.findOneAndUpdate({
            id: stockDto.sampleId,
            isDeleted: false
        }, {
            $inc: {
                'stock.amount': -1,
                'stock.sales': 1
            }
        });

        if (!update) throw new SampleNotFoundError();
        return update;
    },

    async updateSample (stockDto: createStockDto) {
        const result = await db.Stock.findOneAndUpdate({
            taxiId: stockDto.taxiId,
            sampleId: stockDto.sampleId,
            isDeleted: false
        }, stockDto.getObject());

        if (!result) throw new SampleNotFoundError();
        return result;
    },

    async deleteStock (stockDto: createStockDto) {
        const result = await db.Sample.findOneAndUpdate(
            stockDto, {
                isDeleted: true
            }, {
                new: true
            });

        if (!result) throw new SampleNotFoundError();
        return result;
    },

    async checkStock (sampleId: number, taxiId: number) {
        const Taxi = await db.Taxi.findOne({
            id: taxiId,
            isDeleted: false
        });

        if (!Taxi)
            throw new TaxiNotFoundError();

        const Sample = await db.Sample.findOne({
            id: sampleId,
            isDeleted: false
        });

        if (!Sample)
            throw new SampleNotFoundError();

        const Duplicated = await db.Taxi.findOne({
            id: taxiId,
            isDeleted: false,
            'samples._id': Sample._id
        });

        if (Duplicated)
            throw new SampleAlreadyExistError();

        return {Taxi, Sample};
    },

    async getStockAll (taxiId: number) {
        const result = await db.Taxi.aggregate([{
                $match: {
                    id: +taxiId,
                    isDeleted: false
                }
            }, {
                $lookup: {
                    from: 'stocks',
                    localField: 'samples.stockId',
                    foreignField: 'id',
                    as: 'stocks'
                }
            },
            // {
            //     $unwind: {
            //         path: '$stocks',
            //         preserveNullAndEmptyArrays: true
            //     }
            // },
            {
                $lookup: {
                    from: 'samples',
                    localField: 'stocks.sampleId',
                    foreignField: 'id',
                    as: 'stocks'
                }
            }, {
                $project: {
                    stocks: '$stocks'
                }
            }
            // {
            //     $unwind: {
            //         path: '$stocks.info',
            //     }
            // }, {
            //     $group: {
            //         _id: 0,
            //         stocks: {$push: '$stocks'}
            //     }
            // }
        ]);

        return result;
    },

    async getStock (stockDto: createStockDto) {
        console.log(stockDto.getObject());
        return db.Stock.findOne(
            stockDto.getObject()
        );
    }
}