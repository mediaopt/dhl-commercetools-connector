import { Router } from 'express';

import { post } from '../controllers/order.controller';

const eventRouter: Router = Router();

eventRouter.post('/', post);

export default eventRouter;
