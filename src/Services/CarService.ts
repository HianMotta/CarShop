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
    return this.createCarDomain(newCar);
  }

  public async getCars() {
    const cars = await this.CarModel.getAll();
    return cars as ICar[];
  }

  public async getCarById(id: string) {
    const car = await this.CarModel.getById(id);
    if (!car) throw new ApiError(404, 'Car not found');
    return car;
  }
}

export default CarService;