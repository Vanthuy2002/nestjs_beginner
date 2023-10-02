import { ClassConstructor, plainToInstance } from 'class-transformer';
import * as argon2 from 'argon2';

const logger = (params?: any): void => {
  if (params) {
    console.log(params.toString());
  }
};

const compareDataBefore = <T>(data: ClassConstructor<any>, body: T): T => {
  const finalData = plainToInstance(data, body, {
    excludeExtraneousValues: true,
  });
  return finalData;
};

const hassPassword = async (password: string): Promise<string> => {
  const hash = await argon2.hash(password);
  return hash;
};

export { logger, compareDataBefore, hassPassword };
