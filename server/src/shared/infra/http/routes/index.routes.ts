import { Router } from 'express';

const routes = Router();

routes.get('/', (_, res) => res.json({ message: 'ok' }));

export default routes;
