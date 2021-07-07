import mongoose, { Schema } from 'mongoose';
import { TaxiSampleNotFoundError, SampleNotFoundError, TaxiNotFoundError } from '../../../tool/errorException';
import {IStockDocument} from "./stockInterfaces";

export default function (stockSchema: Schema<IStockDocument>) {
    stockSchema.statics.createStock = async function (taxiId: number, sampleObj: object) {
        const stock = await this.create(sampleObj);

        const check = await mongoose.model('Taxi').findOneAndUpdate({
            id: taxiId,
            isDeleted: false
        }, {
            '$push': {
                samples: {
                    stockId: stock.id
                }
            }
        });

        if (!check) throw new TaxiNotFoundError();

        return stock;
    }

    stockSchema.statics.useSample = async function (taxiId: number, SampleId: number) {
        const result = await this.findOneAndUpdate({
            taxiId,
            SampleId,
            isDeleted: false
        }, {
            $inc: {
                stock: -1,
                sales: 1
            }
        }, {
            new: true
        });

        if (!result)
            throw new TaxiSampleNotFoundError();

        const update = await mongoose.model('Sample').findOneAndUpdate({
            id: SampleId,
            isDeleted: false
        }, {
            $inc: {
                'stock.amount': -1,
                'stock.sales': 1
            }
        });

        if (!update)
            throw new SampleNotFoundError();

        return result;
    }

    stockSchema.statics.updateStock = async function (taxiId: number, sampleId: number, stock: object) {
        const result = await this.findOneAndUpdate({
            taxiId,
            sampleId,
            isDeleted: false
        }, stock, {
            new: true
        });

        if (!result)
            throw new SampleNotFoundError();

        return result;
    }

    stockSchema.statics.deleteSample = async function (taxiId: number, sampleId: number) {
        const result = await this.findOneAndUpdate({
            taxiId,
            sampleId,
            isDeleted: false
        }, {
            isDeleted: true
        }, {
            new: true
        });

        if (!result)
            throw new SampleNotFoundError();

        return result;
    }

    return stockSchema;
}