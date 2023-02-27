import Motorcycle from '../Domains/Motorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import IMotorcycle from '../Interfaces/IMotorcycle';
import ApiError from '../error/ApiError';

class MotorcycleService {
  private createMotorcycleDomain(mc: IMotorcycle | null): Motorcycle | null {
    if (mc) {
      return new Motorcycle(mc);
    }
    return null;
  }

  public MotorcycleModel = new MotorcycleODM();

  public async create(mc: IMotorcycle) {
    const newMotorcycle = await this.MotorcycleModel.create(mc);
    return this.createMotorcycleDomain(newMotorcycle);
  }

  public async getMotorcycles() {
    const motorcycles = await this.MotorcycleModel.getAll();
    return motorcycles.map((mc) => this.createMotorcycleDomain(mc));
  }

  public async getMotorcycleById(id: string) {
    const motorcycle = await this.MotorcycleModel.getById(id);
    if (!motorcycle) throw new ApiError(404, 'Motorcycle not found');
    return this.createMotorcycleDomain(motorcycle);
  }
}

export default MotorcycleService;