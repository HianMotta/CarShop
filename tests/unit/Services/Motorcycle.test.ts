import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import { 
  motorcycleInput,
  motorcycleOutput,
  update,
  updatedMotorcycle } from '../../mocks/motorcycleMock';

const id = '6348513f34c397abcad040b2';

describe('Testes da camada service de motos', function () {
  beforeEach(sinon.restore);

  const service = new MotorcycleService();

  it('Deve criar uma moto com sucesso', async function () {
    sinon.stub(Model, 'create').resolves(motorcycleOutput);

    const result = await service.create(motorcycleInput);

    expect(result).to.be.deep.equal(motorcycleOutput);
  });

  it('Deve listar todas motos', async function () {
    sinon.stub(Model, 'find').resolves([motorcycleOutput]);

    const result = await service.getMotorcycles();

    expect(result).to.be.deep.equal([motorcycleOutput]);
  });

  it('Deve lançar erro ao busmotorcycle moto inexistente', async function () {
    sinon.stub(Model, 'findById').resolves(null);

    const result = await service
      .getMotorcycleById(id)
      .catch((err) => err);

    expect(result.status).to.equal(404);
    expect(result.message).to.equal('Motorcycle not found');
  });

  it('Deve lançar erro ao busmotorcycle moto com id inválido', async function () {
    sinon.stub(Model, 'findById').resolves(null);

    const result = await service
      .getMotorcycleById('invalid')
      .catch((err) => err);

    expect(result.status).to.equal(422);
    expect(result.message).to.equal('Invalid mongo id');
  });

  it('Deve atualizar um moto com sucesso', async function () {
    sinon.stub(Model, 'findById').resolves(motorcycleOutput);
    sinon.stub(Model, 'findOneAndUpdate').resolves(updatedMotorcycle);

    const result = await service.updateMotorcycle(id, update);

    expect(result).to.be.deep.equal(updatedMotorcycle);
  });
});