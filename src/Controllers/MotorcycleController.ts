import { Request, Response, NextFunction } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async create() {
    try {
      const motorcycle: IMotorcycle = this.req.body;
      const newMotorcycle = await this.service.create(motorcycle);
      return this.res.status(201).json(newMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async getMotorcycles() {
    try {
      const motorcycles = await this.service.getMotorcycles();
      return this.res.status(200).json(motorcycles);
    } catch (error) {
      this.next(error);
    }
  }

  public async getMotorcycle() {
    try {
      const { id } = this.req.params;
      const motorcycle = await this.service.getMotorcycleById(id);
      return this.res.status(200).json(motorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async updateMotorcycle() {
    try {
      const { id } = this.req.params;
      const motorcycle = this.req.body;
      const updatedMotorcycle = await this.service.updateMotorcycle(id, motorcycle);
      return this.res.status(200).json(updatedMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }
}

export default MotorcycleController;