import mongoose, { Schema } from 'mongoose';
import { TaxiNotFoundError } from '../../../tool/errorException'
import { ITaxiDocument, ITaxiModel } from './drivers';

export default function (taxiSchema: Schema<ITaxiDocument>) {
    taxiSchema.statics.updateByTaxiId = async function (taxiId: number, update: object) {
        const result = await this.findOneAndUpdate({
            id: taxiId,
            isDeleted: false
        }, update, {
            new: true
        });

        if (!result)
            throw new TaxiNotFoundError();

        return result;
    };
}

