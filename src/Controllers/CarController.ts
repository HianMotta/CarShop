import { Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

class CarController {
  private req: Request;
  private res: Response;
  private service: CarService;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
    this.service = new CarService();
  }

  public async create() {
    const car: ICar = this.req.body;
    const newCar = await this.service.create(car);
    return this.res.status(201).json(newCar);
  }
}

export default CarController;