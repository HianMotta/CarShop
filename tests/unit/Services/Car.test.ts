import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import { carInput, carOutput } from '../../mocks/carMock';
import CarService from '../../../src/Services/CarService';

describe('Deve cadrastar um carro', function () {
  it('Deve criar um carro com sucesso', async function () {
    sinon.stub(Model, 'create').resolves(carOutput);

    const service = new CarService();
    const result = await service.create(carInput);

    expect(result).to.be.deep.equal(carOutput);
  });
});