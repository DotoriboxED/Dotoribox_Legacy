import { Router } from 'express';
import reviewAPI from './review';

const router = Router();

router.use('/review', reviewAPI);

export default router;