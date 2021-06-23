import mongoose, { Document, Model } from 'mongoose';

export default function (autoIncrement: any) {
    interface ISampleDocument extends Document {
    }

    interface ISampleModel extends Model<ISampleDocument> {
    }

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
        },
        info: new mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            sampleType: {
                type: String,
                required: true
            },
            manufacture: {
                type: String,
                required: true
            },
            sale: {
                type: String,
                required: true
            },
            consulting: {
                type: String,
                required: true
            },
            question: {
                type: String,
                required: true
            }
        })
    }, {
        timestamps: true
    });

    sampleSchema.plugin(autoIncrement.plugin, {
        model: 'Sample',
        field: 'id',
        startAt: 1,
        increment: 1
    });

    const Sample = mongoose.model('Sample', sampleSchema);

    return {
        Sample
    }
}