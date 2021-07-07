import db from "../models";
import {NotDeletedError, SampleNotFoundError} from "../tool/errorException";
import {SampleDTO} from "../models/dto/sampleDTO";
import {unlink} from "fs/promises";


export default {
    async updateSample (sampleDto: SampleDTO, sampleId: number) {
        const result = await db.Sample.findOneAndUpdate({
            id: sampleId,
            isDeleted: false
        }, sampleDto.getUpdateObject(), { returnOriginal: false });

        if (!result)
            throw new SampleNotFoundError();

        return result;
    },

    async findSample (sampleId: number) {
        const result = await db.Sample.findOne({
            id: sampleId,
            isDeleted: false
        });

        if (result)
            return result;
        else
            throw new SampleNotFoundError();
    },

    async createSample (sampleDto: SampleDTO) {
        return await db.Sample.create(sampleDto.getObject());
    },

    async getSample (isDeleted: boolean) {
        if (!isDeleted)
            isDeleted = false;

        return db.Sample.find({isDeleted});
    },

    async getSampleImage (sampleId: number) {
        const result: any = await db.Sample.findOne({
            id: sampleId,
            isDeleted: false
        });

        if (result) return result.image;
        else throw new SampleNotFoundError();
    },

    async createSampleImage (sampleId: number, fileName: string) {
        const result: any = await db.Sample.findOneAndUpdate({
            id: sampleId,
            isDeleted: false
        }, {
            image: fileName
        }, {
            new: false
        });

        if (!result)
            throw new SampleNotFoundError();
        if (result.image !== undefined)
            await unlink('./uploads/' + result.image);

        return result;
    },

    async recoverSample (sampleId: number) {
        const result = await db.Sample.findOneAndUpdate({
            id: sampleId,
            isDeleted: true
        }, {
            isDeleted: false
        }, {
            new: true
        });

        if (!result)
            throw new SampleNotFoundError();
        return result;
    },

    async deleteSample (sampleId: number, permanent: boolean) {
        const isExist: any = await db.Sample.findOne({
            id: sampleId
        });

        if (!isExist)
            throw new SampleNotFoundError();

        if (permanent) {
            if (isExist.isDeleted === false)
                throw new NotDeletedError();

            await unlink('./uploads/' + isExist.image);

            await db.Sample.deleteOne({
                id: sampleId
            });
        } else {
            if (isExist.isDeleted === true)
                throw new SampleNotFoundError();

            await db.Sample.updateOne({
                id: sampleId
            }, {
                isDeleted: true
            });

            await db.Stock.updateMany({
                sampleId
            }, {
                isDeleted: true
            });
        }
    }
}