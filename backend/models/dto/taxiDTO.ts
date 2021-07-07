interface TaxiDtoParam {
    phoneNumber?: string
    accountNumber?: string
    licensePlate?: string
    group?: string
    driver: object
    name?: string
    taxiNumber?: number
}

interface TaxiDriver {
    accountNumber?: string
    licensePlate?: string
    group?: string
    name?: string,

    [key: string]: any
}

export class TaxiDto {
    phoneNumber?: string
    accountNumber?: string
    licensePlate?: string
    group?: string
    driver: TaxiDriver
    name?: string
    taxiNumber?: number

    constructor(
        obj: TaxiDtoParam
    ) {
        this.driver = {
            accountNumber: obj.accountNumber,
            licensePlate: obj.licensePlate,
            group: obj.group,
            name: obj.name,
            phoneNumber: obj.phoneNumber,
        }

        Object.keys(this.driver).map(key => {
            if (this.driver[key] === undefined)
                delete this.driver[key];
        });

        if (obj.taxiNumber === undefined)
            delete this.taxiNumber;
        else
            this.taxiNumber = obj.taxiNumber;

        console.log(this);
    }

    getObject() {
        const result = {
            taxiNumber: this.taxiNumber,
            driver: this.driver
        }

        if (this.taxiNumber === undefined)
            delete result.taxiNumber;

        return result
    }

    getUpdateObject() {
        const driver: Record<string, any> = {}
        Object.keys(this.driver).map(key => {
            driver['driver.' + key] = this.driver[key]
        })

        const result = {
            taxiNumber: this.taxiNumber,
            $set: driver
        }

        if (this.taxiNumber === undefined)
            delete result.taxiNumber;

        return result;
    }
}