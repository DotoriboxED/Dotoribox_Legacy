import mongoose from 'mongoose';

interface IStockDtoParameter {
    taxiId?: number,
    sample?: mongoose.Schema.Types.ObjectId,
    sampleId?: number,
    stock?: number,
    isDeleted?: boolean
}

export class createStockDto {
    public taxiId?: number;
    public sample?: mongoose.Schema.Types.ObjectId;
    public sampleId?: number;
    public stock?: number;
    public isDeleted?: boolean;

    constructor(stockDtoParameter: IStockDtoParameter) {
        this.taxiId = stockDtoParameter.taxiId;
        this.sample = stockDtoParameter.sample;
        this.sampleId = stockDtoParameter.sampleId;
        this.stock = stockDtoParameter.stock;
        this.isDeleted = stockDtoParameter.isDeleted
    }

    getObject = () => {
        const result: Record<string, unknown> = {}
        Object.keys(this).map(key => {
            if (this[key as keyof createStockDto] !== undefined)
                result[key] = this[key as keyof createStockDto];
        });

        return result;
    }
}