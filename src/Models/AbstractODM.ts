import {
  model,
  Model,
  Schema,
  models,
  UpdateQuery,
  isValidObjectId,
} from 'mongoose';
import ApiError from '../error/ApiError';

const invalidIdMessage = 'Invalid mongo id';

abstract class VehicleODM<T> {
  protected model: Model<T>;
  protected schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }

  public async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }

  public async getAll(): Promise<T[]> {
    return this.model.find({});
  }

  public async getById(id: string): Promise<T | null > {
    if (!isValidObjectId(id)) throw new ApiError(422, invalidIdMessage);
    return this.model.findById({ _id: id });
  }

  public async updateById(id: string, obj: T): Promise<T | null> {
    if (!isValidObjectId(id)) throw new ApiError(422, invalidIdMessage);
    return this.model.findByIdAndUpdate(
      { _id: id },
      { ...obj } as UpdateQuery<T>,
      { new: true },
    );
  }

  public async deleteById(id: string) {
    if (!isValidObjectId(id)) throw new ApiError(422, invalidIdMessage);
    return this.model.findByIdAndDelete({ _id: id });
  }
}

export default VehicleODM;