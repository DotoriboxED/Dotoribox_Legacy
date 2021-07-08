import { Router, Request, Response } from 'express';
import stockService from "../../services/stockService";
import {createStockDto} from "../../models/dto/stockDTO";
import {CustomerDTO} from "../../models/dto/customerDTO";
import customerSerivce from "../../services/customerSerivce";

const router = Router();

router.get('/', async (req: Request, res: Response, next: Function) => {
    const { taxiId, sampleCode, isMale, age, time, score } = req.query;
    const customerDto: CustomerDTO = new CustomerDTO({
        taxiId: taxiId as unknown as number,
        sampleId: sampleCode as unknown as number,
        isMale: isMale as unknown as boolean,
        age: age as unknown as number
    });

    const sort: Record<string, unknown> = {}

    if (time == 'asc' || time == 'desc') sort.time = time;
    if (score == 'asc' || score == 'desc') sort.score = score;

    try {
        const result = await customerSerivce.getCustomer(customerDto, sort);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req: Request, res: Response, next: Function) => {
    const customerDto: CustomerDTO = new CustomerDTO(req.body);
    const stockDto: createStockDto = new createStockDto(req.body);

    try {
        await stockService.useStock(stockDto);
        const item = await customerSerivce.createCustomer(customerDto);

        res.json(item);
    } catch (err) {
        console.log(err);
        next(err);
    }
});

router.post('/:customerId/evaluate', async (req: Request, res: Response, next: Function) => {
    const { customerId } = req.params;
    const customerDto: CustomerDTO = new CustomerDTO(req.body);

    try {
        const result = await customerSerivce.evaluate(customerDto, +customerId);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

export default router;