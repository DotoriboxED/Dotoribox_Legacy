import {TaxiDto} from "../models/dto/taxiDTO";
import db from "../models";
import {TaxiAlreadyExistError, TaxiNotFoundError} from "../tool/errorException";
import sendErrorResponse from "../tool/error";


export default {
    updateByTaxiId: async (taxiDto: TaxiDto, taxiId: number) => {
        const result = await db.Taxi.findOneAndUpdate({
            id: taxiId,
            isDeleted: false
        }, taxiDto.getUpdateObject(), {
            new: true
        });
        if (!result)
            throw new TaxiNotFoundError();

        return result
    },

    recoverDeletedTaxi: async (taxiId: number) => {
        const result = await db.Taxi.findOneAndUpdate({
            id: taxiId,
            isDeleted: true
        }, {
            isDeleted: false
        }, {
            new: false
        });

        if (!result)
            throw new TaxiNotFoundError();
        return result;
    },

    createTaxi: async (taxiDto: TaxiDto) => {
        const check = await db.Taxi.findOne({
            taxiNumber: taxiDto.taxiNumber
        });

        if (check)
            throw new TaxiAlreadyExistError();

        return await db.Taxi.create(taxiDto.getObject());
    },

    checkTaxi: async (taxiId: number) => {
        const result = await db.Taxi.findOne({
            id: taxiId,
            isDeleted: false
        });

        if (!result)
            throw new TaxiNotFoundError();
        return result;
    },

    deleteTaxi: async (taxiId: number) => {
        const result: any = await db.Taxi.findOneAndUpdate({
            id: taxiId,
            isDeleted: false
        }, {
            isDeleted: true
        }, {
            new: false
        });

        if (!result || result.isDeleted)
            throw new TaxiNotFoundError();
        return result;
    },

    getTaxiAll: async (isDeleted: boolean, query: Record<string, unknown>) => {
        if (!isDeleted)
            isDeleted = false;

        const result = await db.Taxi.find({
            isDeleted
        }).sort(query).lean();

        return result
    },

    getTaxi: async (taxiId: number) => {
        const result = await db.Taxi.findOne({
            id: +taxiId,
            isDeleted: false,
        }).populate('samples.sample');

        if (!result || result.isDeleted)
            throw new TaxiNotFoundError();
        return result;
    },

    getTaxiByNumber: async (taxiNumber: number) => {
        const result = await db.Taxi.findOne({
            taxiNumber: +taxiNumber,
            isDeleted: false,
        }).populate('samples.sample');

        if (!result || result.isDeleted)
            throw new TaxiNotFoundError();
        return result;
    },
}