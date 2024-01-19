import { PartialType } from '@nestjs/mapped-types';
import { CreatePokemonDto } from './create-pokemon.dto';
// Extendiendo de PartialType tendremos las mismas propiedades que
// CreatePokemonDTO, con la diferencia que esta pueden ser opcionales
export class UpdatePokemonDto extends PartialType(CreatePokemonDto) {}
