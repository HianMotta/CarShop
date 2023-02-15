import Car from '../Domains/Car';
import CarODM from '../Models/CarODM';
import ICar from '../Interfaces/ICar';

class CarService {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public CarModel = new CarODM();

  public async create(car: ICar) {
    const newCar = await this.CarModel.create(car);
    return this.createCarDomain(newCar);
  }
}

export default CarService;