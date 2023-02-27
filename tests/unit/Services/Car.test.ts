import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import { carInput, carOutput, update, updatedCar } from '../../mocks/carMock';
import CarService from '../../../src/Services/CarService';
// import Car from '../../../src/Domains/Car';

const id = '6348513f34c397abcad040b2';
 
describe('Testes da camada service dos carros', function () {
  beforeEach(sinon.restore);

  const service = new CarService();

  it('Deve criar um carro com sucesso', async function () {
    sinon.stub(Model, 'create').resolves(carOutput);

    const result = await service.create(carInput);

    expect(result).to.be.deep.equal(carOutput);
  });

  it('Deve listar todos carros', async function () {
    sinon.stub(Model, 'find').resolves([carOutput]);

    const result = await service.getCars();

    expect(result).to.be.deep.equal([carOutput]);
  });

  // it('Deve listar carro em específico com sucesso', async function () {
  //   const car = new Car(carOutput);
  //   sinon.stub(Model, 'findById').resolves(carOutput);

  //   const result = await service.getCarById(id);
  //   console.log(result);
  //   console.log(car);
  //   expect(result).to.be.equal(car);
  // });

  it('Deve lançar erro ao buscar carro inexistente', async function () {
    sinon.stub(Model, 'findById').resolves(null);

    const result = await service
      .getCarById(id)
      .catch((err) => err);

    expect(result.status).to.equal(404);
    expect(result.message).to.equal('Car not found');
  });

  it('Deve lançar erro ao buscar carro com id inválido', async function () {
    sinon.stub(Model, 'findById').resolves(null);

    const result = await service
      .getCarById('invalid')
      .catch((err) => err);

    expect(result.status).to.equal(422);
    expect(result.message).to.equal('Invalid mongo id');
  });

  it('Deve atualizar um carro com sucesso', async function () {
    sinon.stub(Model, 'findById').resolves(carOutput);
    sinon.stub(Model, 'findOneAndUpdate').resolves(updatedCar);

    const result = await service.updateCar(id, update);

    expect(result).to.be.deep.equal(updatedCar);
  });
});
