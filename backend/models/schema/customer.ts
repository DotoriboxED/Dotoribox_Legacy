import mongoose from 'mongoose';

export default function (autoIncrement: any) {
    const customerSchema = new mongoose.Schema({
        id: {
            type: Number
        },
        taxiNumber: {
            type: Number,
            required: true
        },
        sampleCode: {
            type: Number,
            required: true
        },
        isMale: {
            type: Boolean,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        score: {
            type: Number
        },
        review: {
            type: String
        }
    }, {
        timestamps: true
    });

    const sampleSchema = new mongoose.Schema({
        id: {
            type: Number
        },
        sampleName: {
            type: String,
            required: true
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        image: {
            type: String
        },
        price: {
            type: Number,
            required: true
        },
        explain: {
            type: String,
            required: true
        }
    }, {
        timestamps: true
    });

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
        }
    });

    customerSchema.plugin(autoIncrement.plugin, {
        model: 'Customer',
        field: 'id',
        startAt: 1,
        increment: 1
    });

    sampleSchema.plugin(autoIncrement.plugin, {
        model: 'Sample',
        field: 'id',
        startAt: 1,
        increment: 1
    });

    taxiSchema.plugin(autoIncrement.plugin, {
        model: 'Taxi',
        field: 'id',
        startAt: 1,
        increment: 1
    });

    const Customer = mongoose.model('Customer', customerSchema);
    const Sample = mongoose.model('Sample', sampleSchema);
    const Taxi = mongoose.model('Taxi', taxiSchema);

    return {
        Customer,
        Sample,
        Taxi
    }
}