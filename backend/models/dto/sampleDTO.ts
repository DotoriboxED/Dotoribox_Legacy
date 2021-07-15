interface ISampleDtoParam {
    sampleName?: string,
    image?: string,
    price?: number,
    explain?: string,
    amount?: number,
    name?: string,
    sampleType?: string,
    manufacture?: string,
    sale?: string,
    consulting?: string,
    question?: string,
    isDeleted: boolean
}

interface StockInfo {
    name?: string,
    sampleType?: string,
    manufacture?: string,
    sale?: string,
    consulting?: string,
    question?: string

    [key: string]: any
}

interface StockOfStock {
    amount?: number,
    [key: string]: any
}

export class SampleDTO {
    public stock: StockOfStock;
    public info: StockInfo;

    public image?: string;
    public price?: number;
    public explain?: string;
    public isDeleted?: boolean;
    public sampleName?: string;

    constructor(sampleDtoParam: ISampleDtoParam) {
        this.stock = {
            amount: sampleDtoParam.amount
        }

        this.info = {
            name: sampleDtoParam.name,
            sampleType: sampleDtoParam.sampleType,
            manufacture: sampleDtoParam.manufacture,
            sale: sampleDtoParam.sale,
            consulting: sampleDtoParam.consulting,
            question: sampleDtoParam.question
        }

        this.image = sampleDtoParam.image;
        this.price = parseInt(sampleDtoParam.price as unknown as string);
        this.explain = sampleDtoParam.explain;
        this.sampleName = sampleDtoParam.sampleName;

        if (!sampleDtoParam.isDeleted)
            this.isDeleted = false;
        else
            this.isDeleted = sampleDtoParam.isDeleted;
    }

    getObject = () => {
        const result: Record<string, unknown> = {};
        const info: Record<string, unknown> = {};

        Object.keys(this).map(key => {
            let elem = this[key as keyof SampleDTO];
            if (typeof elem === 'number' && isNaN(elem)) {}
            else if (elem !== undefined)
                result[key] = this[key as keyof SampleDTO];
        });

        Object.keys(this.info).map(key => {
            let elem = this.info[key];
            if (typeof elem === 'number' && isNaN(elem)) {}
            else if (elem !== undefined)
                info[key] = this.info[key];
        });

        if (this.stock.amount)
            result.stock = { amount: this.stock.amount };

        result['info'] = info;

        return result
    }

    getUpdateObject = () => {
        const result: Record<string, unknown> = {};
        const info: Record<string, unknown> = {};
        const stock: Record<string, unknown> = {};

        Object.keys(this).map(key => {
            let value = this[key as keyof SampleDTO];

            if (typeof value === 'number' && isNaN(value)) {}
            else if (value !== undefined && typeof value !== 'object')
                result[key] = this[key as keyof SampleDTO];
        });

        Object.keys(this.info).map(key => {
            if (typeof this.info[key] === 'number' && isNaN(this.info[key])) {}
            else if (this.info[key] !== undefined)
                info['info.' + key] = this.info[key];
        });

        if (this.stock.amount)
            stock.stock = { 'stock.amount': this.stock.amount };

        return {
            ...result,
            $set: {
                ...info,
                ...stock
            }
        }
    }
}