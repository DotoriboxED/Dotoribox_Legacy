import { Router } from 'express';
import reviewAPI from './review';
import sampleAPI from './sample';
import taxiAPI from './taxi';

const router = Router();

router.use('/review', reviewAPI);
router.use('/sample', sampleAPI);
router.use('/taxi', taxiAPI);

export default router;