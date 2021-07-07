interface ICustomerDtoParam {
    taxiId?: number,
    sampleCode?: number,
    isMale?: boolean,
    age?: number,
    score?: number,
    review?: string
}

export class CustomerDTO {
    public taxiId?: number;
    public sampleCode?: number;
    public isMale?: boolean;
    public age?: number;
    public score?: number;
    public review?: string;

    constructor(customerDtoParam: ICustomerDtoParam) {
        this.taxiId = customerDtoParam.taxiId;
        this.sampleCode = customerDtoParam.sampleCode;
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