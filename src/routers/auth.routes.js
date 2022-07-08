import express from 'express';
import { registerDefinition } from 'swaggiffy';
const authRoute = express.Router();

import { getUserLoggedIn, login } from '../controllers/user.controller.js'
import { authorize, protect } from '../middlewares/auth.middleware.js';

authRoute.post('/', login);
// router.post("/", ,createUser);
authRoute.get('/me', [protect, authorize('Standard')], getUserLoggedIn);


registerDefinition(authRoute, {tags: 'Auth', basePath: '/api/v1/auth', mappedSchema: 'Auth'});

export default authRoute;
