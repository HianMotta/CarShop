import { Router } from 'express';
import CarController from '../Controllers/CarController';

const route = Router();

route.post('/', (req, res, next) => new CarController(req, res, next).create());
route.get('/', (req, res, next) => new CarController(req, res, next).getCars());
route.get('/:id', (req, res, next) => new CarController(req, res, next).getCar());
route.put('/:id', (req, res, next) => new CarController(req, res, next).updateCar());

export default route;
