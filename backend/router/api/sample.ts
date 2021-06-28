import { Router, Request, Response } from 'express';
import multer from 'multer';
import db from '../../models';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { unlink } from 'fs/promises';

import sendErrorResponse from '../../tool/error';
import { InvalidFormError, NotDeletedError, SampleNotFoundError } from '../../tool/errorException';

const router = Router();

const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: Function) {
        cb(null, 'uploads/')
    },
    filename: function (req: Request, file: Express.Multer.File, cb: Function) {
        cb(null, req.newFilename + path.extname(file.originalname));
    }
});

function fileFilter(res: Request, file: Express.Multer.File, cb: Function) {
    const extension: string = file.mimetype.split('/')[0];

    if (extension === 'image') //Check && Upload...
        return cb(null, true);

    return cb(new Error('업로드를 지원하지 않는 형식의 파일입니다.'), false);
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

router.post('/', async (req: Request, res: Response, next: Function) => {
    const { sampleName,
        price,
        explain,
        name,
        sampleType,
        manufacture,
        sale,
        consulting,
        question,
        amount
    } = req.body;

    if (!sampleName && !price && !explain)
        throw new InvalidFormError();

    try {
        const result = await db.Sample.create({
            sampleName,
            price,
            explain,
            info: {
                name,
                sampleType,
                sale,
                consulting,
                question,
                manufacture
            },
            stock: {
                amount
            }
        });

        res.json(result);
    } catch (err) {
        next(err);
    }
}
)

router.get('/', async (req: Request, res: Response, next: Function) => {
    const { isDeleted } = req.query;

    try {
        if (isDeleted) {
            const result = await db.Sample.find({
                isDeleted
            });

            res.json(result);
        } else {
            const result = await db.Sample.find({
                isDeleted: false
            });

            res.json(result);
        }

    } catch (err) {
        next(err);
    }
});

router.get('/:sampleId/image', async (req: Request, res: Response, next: Function) => {
    const { sampleId } = req.params;

    try {
        const result: any = await db.Sample.findOne({
            id: sampleId,
            isDeleted: false
        });

        if (result) res.download('./uploads/' + result.image);
        else throw new SampleNotFoundError();
    } catch (err) {
        next(err);
    }
});

router.get('/:sampleId', async (req: Request, res: Response, next: Function) => {
    const { sampleId } = req.params;

    try {
        const result = await db.Sample.findOne({
            id: sampleId,
            isDeleted: false
        });

        if (result) res.json(result);
        else throw new SampleNotFoundError();
    } catch (err) {
        next(err);
    }
});

router.put('/:sampleId', async (req: Request, res: Response, next: Function) => {
    const { sampleId } = req.params;
    const { sampleName,
        price,
        explain,
        name,
        sampleType,
        manufacture,
        sale,
        consulting,
        question,
        amount
    } = req.body;

    const data: Record<string, unknown> = {};
    const subData: Record<string, unknown> = {};
    const stock: Record<string, unknown> = {};

    // if (!sampleName && !price && !explain)
    //     return sendErrorResponse(res, 400, 'invalid_form');

    if (sampleName) data.sampleName = sampleName;
    if (price) data.price = price;
    if (explain) data.explain = explain;

    if (name) subData.sampleName = name;
    if (sampleType) subData.sampleType = sampleType;
    if (manufacture) subData.sale = sale;
    if (consulting) subData.consulting = consulting;
    if (question) subData.question = question;
    if (sale) subData.sale = sale;

    if (amount) {
        stock.amount = amount;
        data.stock = stock;
    }

    if (Object.keys(subData).length > 0)
        data.info = subData;

    try {
        const result = await db.Sample.findOneAndUpdate({
            id: sampleId,
            isDeleted: false
        }, data, { returnOriginal: false });

        if (!result)
            throw new SampleNotFoundError();

        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
});

router.put('/:sampleId/image',
    function (req: Request, file: object, next: Function) {
        req.newFilename = uuid();
        next();
    },
    upload.single('attachment'),
    async (req: Request, res: Response, next: Function) => {
        const { sampleId } = req.params;

        const ext = path.extname(req.file.originalname);
        const fileName = req.newFilename + ext;

        try {
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
                unlink('./uploads/' + result.image);

            res.sendStatus(200);
        } catch (err) {
            next(err);
        }
    }
);

router.put('/:sampleId/recover', async (req: Request, res: Response, next: Function) => {
    const { sampleId } = req.params;

    try {
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

        res.json(result);
    } catch (err) {
        next(err);
    }
});

router.delete('/:sampleId', async (req: Request, res: Response, next: Function) => {
    const { permanent } = req.query;
    const { sampleId } = req.params;

    try {
        const isExist: any = await db.Sample.findOne({
            id: sampleId
        });

        if (!isExist)
            throw new SampleNotFoundError();

        if (permanent) {
            if (isExist.isDeleted === false)
                throw new NotDeletedError();

            unlink('./uploads/' + isExist.image);

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
        }

        res.json(isExist);
    } catch (err) {
        next(err);
    }
});

export default router;