interface ICustomerDtoParam {
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
        this.taxiId = customerDtoParam.taxiId;
        this.sampleId = customerDtoParam.sampleId;
        this.isMale = customerDtoParam.isMale;
        this.age = customerDtoParam.age;
        this.score = customerDtoParam.score;
        this.review = customerDtoParam.review;
    }

    getObject = () => {
        const result: Record<string, unknown> = {}

        Object.keys(this).map(key => {
            if (this[key as keyof CustomerDTO] !== undefined)
                result[key] = this[key as keyof CustomerDTO];
        })

        return result;
    }
}