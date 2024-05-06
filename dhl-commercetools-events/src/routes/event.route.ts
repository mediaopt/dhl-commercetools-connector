import { Router } from 'express';

import { handleOrderMessage } from '../controllers/order.controller';

const eventRouter: Router = Router();

eventRouter.post('/', handleOrderMessage);

export default eventRouter;
