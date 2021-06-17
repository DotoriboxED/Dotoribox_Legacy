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

    customerSchema.plugin(autoIncrement.plugin, {
        model: 'Customer',
        field: 'id',
        startAt: 1,
        increment: 1
    });

    const Customer = mongoose.model('Customer', customerSchema);

    return {
        Customer
    }
}