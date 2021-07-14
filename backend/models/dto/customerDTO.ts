export interface ICustomerDtoParam {
    taxiId?: number,
    sampleId?: number,
    isMale?: boolean,
    age?: number,
    score?: number,
    review?: string
}

export class CustomerDTO {
    public taxiId?: number;
    public sampleId?: number;
    public isMale?: boolean;
    public age?: number;
    public score?: number;
    public review?: string;

    constructor(customerDtoParam: ICustomerDtoParam) {
        this.taxiId = parseInt(customerDtoParam.taxiId as unknown as string);
        this.sampleId = parseInt(customerDtoParam.sampleId as unknown as string);
        this.isMale = Boolean(customerDtoParam.isMale);
        this.age = parseInt(customerDtoParam.age as unknown as string);
        this.score = parseInt(customerDtoParam.score as unknown as string);
        this.review = customerDtoParam.review;
    }

    getObject = () => {
        const result: Record<string, unknown> = {}

        Object.keys(this).map(key => {
            let elem = this[key as keyof CustomerDTO];
            if (elem !== undefined && !isNaN(<number>elem) && typeof elem !== 'function')
                result[key] = this[key as keyof CustomerDTO] as typeof elem;
        });

        return result;
    }
}