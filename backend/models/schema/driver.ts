import mongoose from 'mongoose';

export default function (autoIncrement: any) {
    const taxiSchema = new mongoose.Schema({
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
    })

    const Taxi = mongoose.model('Taxi', taxiSchema);
    const Stock = mongoose.model('Stock', stockSchema);

    return {
        Taxi,
        Stock
    }
}