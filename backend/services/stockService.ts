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
        const duplicate = await db.Stock.findOne({
            taxiId: stockDto.taxiId,
            sampleId: stockDto.sampleId
        });

        if (duplicate)
            throw new SampleAlreadyExistError();

        const result = await db.Stock.create(stockDto.getObject());

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

        const user = await db.Taxi.findOneAndUpdate({
            id: stockDto.taxiId,
            isDeleted: false
        }, {
            $inc: {
                passenger: 1
            }
        });

        if (!user) throw new TaxiNotFoundError();

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
        const result = await db.Stock.findOneAndUpdate(
            stockDto.getObject(), {
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

    async getStockAll (taxiId: number, query: Record<string, any>) {
        const sort: Record<string, unknown> = {};
        const sortType: {[index: string]:any} = { 'asc': 1, 'desc': -1 };

        Object.keys(query).map(elem => {
            if (query[elem] === 'asc' || query[elem] === 'desc')
                sort[elem] = sortType[query[elem]]
        });

        sort.createdAt = -1;

        console.log(sort);

        return db.Stock.aggregate([{
            $match: {
                taxiId,
                isDeleted: false
            }
        }, {
            $lookup: {
                from: 'samples',
                localField: 'sampleId',
                foreignField: 'id',
                as: 'sample'
            }
        }]).sort(sort);
    },

    async getStock (stockDto: createStockDto) {
        return db.Stock.findOne(
            stockDto.getObject()
        );
    }
}