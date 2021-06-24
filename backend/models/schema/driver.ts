import mongoose, { Document } from 'mongoose';

export default function (autoIncrement: any) {
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

    interface ITaxiDocument extends ITaxi, Document {
    }

    interface ITaxiModel extends mongoose.Model<ITaxiDocument> {
        updateByTaxiId: (taxiId: number, update: any) => Promise<boolean>,
        createStock: (taxiId: number, stock: any) => Promise<unknown>,
        useSample: (taxiId: number, sampleId: number) => Promise<unknown>,
        updateStock: (taxiId: number, sampleId: number, stock: number) => Promise<unknown>,
        deleteSample: (taxiId: number, sampleId: number) => Promise<unknown>
    }

    const stockSchema = new mongoose.Schema({
        id: {
            type: Number
        },
        sample: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Sample'
        },
        sampleId: {
            type: Number,
            required: true
        },
        taxiId: {
            type: Number,
            required: true
        },
        stock: { 
            type: Number,
            default: 0,
            min: [0, 'out of stock']
        },
        sales: {
            type: Number,
            default: 0
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    });

    const taxiSchema = new mongoose.Schema<ITaxiDocument>({
        id: {
            type: Number
        },
        taxiNumber: {
            type: Number,
            required: true,
            unique: true
        },
        passenger: {
            type: Number,
            default: 0
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        driver: new mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            phoneNumber: {
                type: String,
                required: true
            },
            accountNumber: {
                type: String,
                required: true
            },
            licensePlate: {
                type: String,
                required: true
            },
            group: {
                type: String,
                required: true
            }
        }),
        samples: [{
            stockId: {
                type: Number
            }
        }]
    });

    taxiSchema.plugin(autoIncrement.plugin, {
        model: 'Taxi',
        field: 'id',
        startAt: 1,
        increment: 1
    });

    stockSchema.plugin(autoIncrement.plugin, {
        model: 'Stock',
        field: 'id',
        startAt: 1,
        increment: 1
    });

    taxiSchema.statics.updateByTaxiId = async function (taxiId, update) {
        try {
            const check = await this.findOne({
                id: taxiId,
                isDeleted: false
            });
    
            if (!check) return false;
    
            await this.updateOne({
                id: taxiId,
                isDeleted: false
            }, update);
    
            return true;
        } catch (err) {
            return err;
        }
    };

    taxiSchema.statics.createStock = async function (taxiId, sampleObj) {
        try {
            const check = await this.findOne({
                id: taxiId,
                isDeleted: false
            });

            if (!check) return false;

            await this.updateOne({
                id: taxiId,
                isDeleted: false
            }, {
                "$push": {
                    samples: sampleObj
                }
            });

            return true;
        } catch (err) { 
            return err;
        }
    }

    taxiSchema.statics.useSample = async function (taxiId, SampleId) {
        try {
            const result = await this.findOneAndUpdate({
                id: taxiId,
                'samples.sampleId': SampleId,
                isDeleted: false
            }, {
                $inc: {
                    'samples.$.stock': -1
                }
            }, {
                new: true
            });

            return result;
        } catch (err) {
            return err;
        }
    }

    taxiSchema.statics.updateStock = async function (taxiId, SampleId, stock) {
        try {
            const result = await this.findOneAndUpdate({
                id: taxiId,
                'samples.sampleId': SampleId,
                isDeleted: false
            }, {
                $set: {
                    'samples.$.stock': stock
                }
            }, {
                new: true
            });

            return result;
        } catch (err) {
            return err;
        }
    }

    taxiSchema.statics.deleteSample = async function (taxiId, sampleId) {
        try {
            const result = await this.findOneAndUpdate({
                id: taxiId,
                'samples.sampleId': sampleId,
                isDeleted: false
            }, {
                'samples.$.isDeleted': true
            });

            return result;
        } catch (err) {
            return err;
        }
    }

    const Taxi = mongoose.model<ITaxiDocument, ITaxiModel>('Taxi', taxiSchema);
    const Stock = mongoose.model('Stock', stockSchema);

    return {
        Taxi,
        Stock
    }
}