import Motorcycle from '../Domains/Motorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import IMotorcycle from '../Interfaces/IMotorcycle';

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
}

export default MotorcycleService;