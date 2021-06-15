import { Router, Request, Response } from 'express';
import multer from 'multer';
import db from '../../models';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { unlink } from 'fs/promises';

import sendErrorResponse from '../tool/error';

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

router.post('/',
    function (req: Request, file: object, next: Function) {
        req.newFilename = uuid();
        next();
    },
    upload.single('attachment'),
    async (req: Request, res: Response) => {
        const { sampleName, price, explain } = req.body;

        try {
            const ext = path.extname(req.file.originalname);
            const fileName = req.newFilename + ext;

            await db.Sample.create({
                sampleName,
                image: fileName,
                price,
                explain
            });

            res.sendStatus(201);
        } catch (err) {
            sendErrorResponse(res, 500, 'unknown_error', err);
        }
    }
)

router.get('/', async (req: Request, res: Response) => {
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
        sendErrorResponse(res, 500, 'unknown_error', err);
    }
});

router.get('/:sampleId/image', async (req: Request, res: Response) => {
    const { sampleId } = req.params;

    try {
        const result: any = await db.Sample.findOne({
            id: sampleId,
            isDeleted: false
        });

        if (result) res.download('./uploads/' + result.image);
        else sendErrorResponse(res, 404, 'sample_not_exists');
    } catch (err) {
        sendErrorResponse(res, 500, 'unknown_error', err);
    }
});

router.get('/:sampleId', async (req: Request, res: Response) => {
    const { sampleId } = req.params;

    try {
        const result = await db.Sample.findOne({
            id: sampleId,
            isDeleted: false
        });

        if (result) res.json(result);
        else sendErrorResponse(res, 404, 'sample_not_exists');
    } catch (err) {
        sendErrorResponse(res, 500, 'unknown_error', err);
    }
});

router.put('/:sampleId', async (req: Request, res: Response) => {
    const { sampleId } = req.params;
    const { sampleName, price, explain } = req.body;
    const data: Record<string, unknown> = {}

    if (!sampleName && !price && !explain)
        return sendErrorResponse(res, 400, 'invalid_form');

    if (sampleName) data.sampleName = sampleName;
    if (price) data.price = price;
    if (explain) data.explain = explain;

    try {
        const isExist = await db.Sample.findOne({
            id: sampleId,
            isDeleted: false
        });
        console.log(isExist);

        if (!isExist)
            return sendErrorResponse(res, 403, 'sample_not_exists');

        await db.Sample.updateOne({
            id: sampleId
        }, data);

        res.sendStatus(200);
    } catch (err) {
        sendErrorResponse(res, 500, 'unknown_error', err)
    }
});

router.put('/:sampleId/image',
    function (req: Request, file: object, next: Function) {
        req.newFilename = uuid();
        next();
    },
    upload.single('attachment'),
    async (req: Request, res: Response) => {
        const { sampleId } = req.params;

        const ext = path.extname(req.file.originalname);
        const fileName = req.newFilename + ext;

        try {
            const isExist: any = await db.Sample.findOne({
                id: sampleId,
                isDeleted: false
            });

            if (!isExist)
                return sendErrorResponse(res, 404, 'sample_not_exists');

            unlink('./uploads/' + isExist.image);

            await db.Sample.updateOne({
                id: sampleId
            }, {
                image: fileName
            });

            res.sendStatus(200);
        } catch (err) {
            sendErrorResponse(res, 500, 'unknown_error', err);
        }
    }
);

router.put('/:sampleId/recover', async (req: Request, res: Response) => {
    const { sampleId } = req.params;

    try {
        const isExist: any = await db.Sample.findOne({
            id: sampleId,
            isDeleted: true
        });

        if (!isExist)
            return sendErrorResponse(res, 404, 'sample_not_exists');
        
        await db.Sample.updateOne({
            id: sampleId
        }, {
            isDeleted: false
        });

        res.sendStatus(200);
    } catch (err) {
        sendErrorResponse(res, 500, 'unknown_error', err);
    }
});

router.delete('/:sampleId', async (req: Request, res: Response) => {
    const { permanent } = req.query;
    const { sampleId } = req.params;

    try {
        const isExist: any = await db.Sample.findOne({
            id: sampleId
        });

        if (!isExist)
            return sendErrorResponse(res, 404, 'sample_not_exists');

        if (permanent) {
            if (isExist.isDeleted === false)
                return sendErrorResponse(res, 403, 'permanent_needs_delete');
            
            unlink('./uploads/' + isExist.image);

            await db.Sample.deleteOne({
                id: sampleId
            });
        } else {
            if (isExist.isDeleted === true)
                return sendErrorResponse(res, 404, 'sample_not_exists');
            
            await db.Sample.updateOne({
                id: sampleId
            }, {
                isDeleted: true
            });
        }

        res.sendStatus(200);
    } catch (err) {
        sendErrorResponse(res, 500, 'unknown_error', err);
    }
});

export default router;