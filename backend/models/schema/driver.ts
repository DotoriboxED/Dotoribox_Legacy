import mongoose, { Document } from 'mongoose';
import stockFunctions from '../repository/stock/stockFunctions';
import taxiFunctions from '../repository/taxi/taxiFunctions';
import {IStockDocument, IStockModel} from "../repository/stock/stockInterfaces";
import {ITaxi, ITaxiDocument, ITaxiModel} from "../repository/taxi/taxiInterfaces";

export default function (autoIncrement: any) {
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

    stockFunctions(stockSchema);
    taxiFunctions(taxiSchema);

    const Taxi = mongoose.model<ITaxi>('Taxi', taxiSchema);
    const Stock = mongoose.model('Stock', stockSchema);

    return {
        Taxi,
        Stock
    }
}