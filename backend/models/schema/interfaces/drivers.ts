import mongoose, { Document } from 'mongoose';

interface ITaxi {
    taxiNumber: number,
    passenger: number,
    isDeleted: boolean,
    driver: {
        name: string,
        phoneNumber: string,
        accountNumber: string,
        licensePlate: string,
        group: string
    },
    samples: [
    ]
};

export interface ITaxiDocument extends ITaxi, Document {
}

export interface ITaxiModel extends mongoose.Model<ITaxiDocument> {
    updateByTaxiId: (taxiId: number, update: any) => Promise<boolean>
}

export interface IStockDocument extends Document {
}

export interface IStockModel extends mongoose.Model<IStockDocument> {
    createStock: (taxiId: number, stock: any) => Promise<unknown>,
    useSample: (taxiId: number, sampleId: number) => Promise<unknown>,
    updateStock: (taxiId: number, sampleId: number, stock: number) => Promise<unknown>,
    deleteSample: (taxiId: number, sampleId: number) => Promise<unknown>
}