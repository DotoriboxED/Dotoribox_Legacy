import { Router, Request, Response } from 'express';
import multer from 'multer';
import db from '../../models';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { unlink } from 'fs/promises';
import { InvalidFormError, NotDeletedError, SampleNotFoundError } from '../../tool/errorException';
import {SampleDTO} from "../../models/dto/sampleDTO";
import sampleService from "../../services/sampleService";

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
    const sampleDto: SampleDTO = new SampleDTO(req.body);

    try {
        const result = await sampleService.createSample(sampleDto);
        res.json(result);
    } catch (err) {
        next(err);
    }
}
)

router.get('/', async (req: Request, res: Response, next: Function) => {
    const { isDeleted } = req.query;

    try {
        const result = await sampleService.getSampleAll(isDeleted as unknown as boolean);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

router.get('/:sampleId/image', async (req: Request, res: Response, next: Function) => {
    const { sampleId } = req.params;

    try {
        const result = await sampleService.getSampleImage(+sampleId);
        res.download('./uploads/' + result);
    } catch (err) {
        next(err);
    }
});

router.get('/:sampleId', async (req: Request, res: Response, next: Function) => {
    const { sampleId } = req.params;

    try {
        const result = await sampleService.findSample(+sampleId);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

router.put('/:sampleId', async (req: Request, res: Response, next: Function) => {
    const { sampleId } = req.params;
    const sampleDto: SampleDTO = new SampleDTO(req.body);

    try {
        const result = sampleService.updateSample(sampleDto, +sampleId);
        res.json(result);
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
            const result = await sampleService.createSampleImage(+sampleId, fileName);
            res.json(result);
        } catch (err) {
            next(err);
        }
    }
);

router.put('/:sampleId/recover', async (req: Request, res: Response, next: Function) => {
    const { sampleId } = req.params;

    try {
        const result = await sampleService.recoverSample(+sampleId);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

router.delete('/:sampleId', async (req: Request, res: Response, next: Function) => {
    const { permanent } = req.query;
    const { sampleId } = req.params;

    try {
        const result = await sampleService.deleteSample(+sampleId, permanent as unknown as boolean);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

export default router;