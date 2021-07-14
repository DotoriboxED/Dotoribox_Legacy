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
    public isDeleted?: boolean = false;

    constructor(stockDtoParameter: IStockDtoParameter) {
        this.taxiId = parseInt(stockDtoParameter.taxiId as unknown as string);
        this.sample = stockDtoParameter.sample;
        this.sampleId = parseInt(stockDtoParameter.sampleId as unknown as string);
        this.stock = parseInt(stockDtoParameter.stock as unknown as string);
        this.isDeleted = stockDtoParameter.isDeleted;
    }

    getObject = () => {
        const result: Record<string, unknown> = {}

        Object.keys(this).map(key => {
            let elem = this[key as keyof createStockDto];
            if (elem !== undefined && typeof elem !== 'function' && !isNaN(<number>elem))
                result[key] = elem;
        });

        return result;
    }
}