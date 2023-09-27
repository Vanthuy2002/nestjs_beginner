import { plainToInstance, ClassConstructor } from 'class-transformer';

export function plainToClass<T>(params: ClassConstructor<any>, object: T): T {
  const result = plainToInstance(params, object, {
    excludeExtraneousValues: true,
  });
  return result;
}
