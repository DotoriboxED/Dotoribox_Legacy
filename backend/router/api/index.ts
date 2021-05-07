import { Router } from 'express';
import reviewAPI from './review';
import sampleAPI from './sample';

const router = Router();

router.use('/review', reviewAPI);
router.use('/sample', sampleAPI);

export default router;