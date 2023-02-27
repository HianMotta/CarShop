import IMotorcycle from '../Interfaces/IMotorcycle';
import Vehicle from './Vehicle';

class Motorcycle extends Vehicle {
  private category: string;
  private engineCapacity: number;

  constructor(mc: IMotorcycle) {
    super(mc);
    this.category = mc.category;
    this.engineCapacity = mc.engineCapacity;
  }
}

export default Motorcycle;