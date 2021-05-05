import { Router, Request, Response } from 'express';
import multer from 'multer';
import db from '../../models';
import path from 'path';
import uuid from 'uuid';

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
        req.newFilename = uuid.v4();
        next();
    },
    upload.single('attachment'), 
    async (req: Request, res: Response) => {
        const { sampleName } = req.body;

        try {
            const ext = path.extname(req.file.originalname);
            const fileName = req.newFilename + ext;

            await db.Sample.create({
                sampleName,
                image: './uploads/' + fileName
            });

            res.sendStatus(201);
        } catch (err) {
            sendErrorResponse(res, 500, 'unknown_error', err);
        }
    }
)

router.get('/', async (req: Request, res: Response) => {
    try {
        const result = await db.Sample.find({
            isDeleted: false
        });

        res.json(result);
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

        if (result) res.download(result.image);
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
})
