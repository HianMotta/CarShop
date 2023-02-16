import Car from '../Domains/Car';
import CarODM from '../Models/CarODM';
import ICar from '../Interfaces/ICar';
import ApiError from '../error/ApiError';

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
    if (!newCar) throw new ApiError(400, 'Bad Request');
    return this.createCarDomain(newCar);
  }
}

export default CarService;