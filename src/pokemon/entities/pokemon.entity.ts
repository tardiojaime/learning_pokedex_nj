import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class Pokemon extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  name: string;
  @Prop({
    unique: true,
    index: true,
  })
  no: number;
}
// en Mongo Schema se refiere a una estructura o definicion de como se
// organiza los datos en una coleccion.
export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
