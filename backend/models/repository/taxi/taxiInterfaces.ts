import mongoose, {Document} from "mongoose";

export interface ITaxi extends Document{
    taxiNumber: number,
    passenger: number,
    isDeleted: boolean,
    // driver: {
    //     name: string,
    //     phoneNumber: string,
    //     accountNumber: string,
    //     licensePlate: string,
    //     group: string
    // },
    driver: object,
    samples: object[]
}

export interface ITaxiDocument extends ITaxi, Document {
}

export interface ITaxiModel extends mongoose.Model<ITaxiDocument> {
    updateByTaxiId: (taxiId: number, update: any) => Promise<boolean>
}