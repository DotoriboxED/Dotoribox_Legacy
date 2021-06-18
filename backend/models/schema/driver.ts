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
        samples: object
    };

    interface ITaxiDocument extends ITaxi, Document {
    }

    interface ITaxiModel extends mongoose.Model<ITaxiDocument> {
        updateByTaxiNumber: (taxiNumber: number, update: any) => Promise<boolean>
    }

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
        samples: [
        ]
    });

    const stockSchema = new mongoose.Schema({
        id: {
            type: Number
        },
        sampleNumber: {
            type: Number,
            required: true
        },
        stock: {
            type: Number,
            default: 0
        }
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

    taxiSchema.statics.updateByTaxiNumber = async function (taxiNumber, update) {
        try {
            const check = await this.findOne({
                taxiNumber,
                isDeleted: false
            });
    
            if (!check) return false;
    
            await this.updateOne({
                taxiNumber,
                isDeleted: false
            }, update);
    
            return true;
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