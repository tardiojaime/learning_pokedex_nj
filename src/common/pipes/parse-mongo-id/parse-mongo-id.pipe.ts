import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  // con implements - la clase que implementa tiene que
  // complir con los metodo de la clase que se ba a implementar
  transform(value: any, metadata: ArgumentMetadata) {
    //console.log({ value, metadata });
    if (!isValidObjectId(value)) {
      throw new BadRequestException(`${value} is not a valid MongoId`);
    }
    return value;
  }
}
