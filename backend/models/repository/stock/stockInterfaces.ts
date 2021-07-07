import mongoose, {Document} from "mongoose";

export interface IStockDocument extends Document {
}

export interface IStockModel extends mongoose.Model<IStockDocument> {
    createStock: (taxiId: number, stock: any) => Promise<unknown>,
    useSample: (taxiId: number, sampleId: number) => Promise<unknown>,
    updateStock: (taxiId: number, sampleId: number, stock: number) => Promise<unknown>,
    deleteSample: (taxiId: number, sampleId: number) => Promise<unknown>
}