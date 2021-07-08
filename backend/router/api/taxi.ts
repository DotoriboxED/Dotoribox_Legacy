import {Router, Request, Response} from 'express';
import {createStockDto} from "../../models/dto/stockDTO";
import {TaxiDto} from "../../models/dto/taxiDTO";
import TaxiService from '../../services/taxiService'
import StockService from "../../services/stockService";
import taxiService from "../../services/taxiService";

const router = Router();

router.post('/', async (req: Request, res: Response, next: Function) => {
    const taxiDto: TaxiDto = new TaxiDto(req.body);

    try {
        const result = await TaxiService.createTaxi(taxiDto);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

router.post('/:taxiId/sample', async (req: Request, res: Response, next: Function) => {
    const {taxiId} = req.params;
    const {sampleId, stock} = req.body;

    try {
        const {Taxi, Sample} = await StockService.checkStock(+sampleId, +taxiId);

        const stockDto: createStockDto = new createStockDto({
            taxiId: Taxi.id,
            sample: Sample._id,
            sampleId: Sample.id,
            stock
        });

        const result = await StockService.createStock(stockDto);

        res.json(result);
    } catch (err) {
        next(err);
    }
});

router.get('/', async (req: Request, res: Response, next: Function) => {
    const {isDeleted} = req.query;

    try {
        const result = await TaxiService.getTaxiAll(isDeleted as unknown as boolean);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

router.get('/:taxiNumber', async (req: Request, res: Response, next: Function) => {
    const {taxiNumber} = req.params;
    const {isTaxiCode} = req.query;

    try {
        let result;

        if (isTaxiCode)
            result = await TaxiService.getTaxiByNumber(+taxiNumber);
        else
            result = await TaxiService.getTaxi(+taxiNumber);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

router.get('/:taxiId/stock', async (req: Request, res: Response, next: Function) => {
    const {taxiId} = req.params;

    try {
        const result = await StockService.getStockAll(+taxiId);
        res.json(result)
    } catch (err) {
        next(err);
    }
});

router.get('/:taxiId/sample/:sampleId', async (req: Request, res: Response, next: Function) => {
    const stockDto: createStockDto = new createStockDto({...req.body, ...req.params});

    try {
        const result = await StockService.getStock(stockDto);
        res.json(result);
    } catch (err) {
        next(err);
    }
})

router.put('/:taxiId', async (req: Request, res: Response, next: Function) => {
    const {taxiId} = req.params;
    const taxiDto = new TaxiDto(req.body);

    try {
        const result = await TaxiService.updateByTaxiId(taxiDto, +taxiId);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

router.put('/:taxiId/recover', async (req: Request, res: Response, next: Function) => {
    const {taxiId} = req.params;

    try {
        const result = TaxiService.recoverDeletedTaxi(+taxiId);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

router.put('/:taxiId/sample/:sampleId', async (req: Request, res: Response, next: Function) => {
    const stockDto: createStockDto = new createStockDto({...req.body, ...req.params});

    try {
        const result = await StockService.updateSample(stockDto);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

router.delete('/:taxiId', async (req: Request, res: Response, next: Function) => {
    const {taxiId} = req.params;

    try {
        const result = await taxiService.deleteTaxi(+taxiId);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

router.delete('/:taxiId/sample/:sampleId', async (req: Request, res: Response, next: Function) => {
    const stockDto: createStockDto = req.params as unknown as createStockDto;

    try {
        await taxiService.checkTaxi(+req.params.taxiId);
        await StockService.deleteStock(stockDto);

        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
})

export default router;