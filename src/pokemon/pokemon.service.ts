import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {Model, isValidObjectId} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';

import {CreatePokemonDto} from './dto/create-pokemon.dto';
import {UpdatePokemonDto} from './dto/update-pokemon.dto';
import {Pokemon} from './entities/pokemon.entity';
import {PaginationDTO} from 'src/common/dto/pagination.dto';

@Injectable()
export class PokemonService {
  // injectamos nuestro modele
  private defaultLimit: number;
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemoModel: Model<Pokemon>,
    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = configService.get<number>('defaultLimint');
  }
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    try {
      const pokemon = await this.pokemoModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      console.log(error);
      this.handleExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDTO) {
    const {limit = 10, offset = 0} = paginationDto;
    return await this.pokemoModel
      .find()
      .limit(limit)
      .skip(offset)
      .sort({
        no: 1,
      })
      .select('-__v');
  }

  async findOne(id: string) {
    let pokemon: Pokemon;
    // inNaN -> no es numero - si es numero retornara false
    // solo retorn true cuando recibe cualquier dato diferente a numero
    if (!isNaN(+id)) {
      pokemon = await this.pokemoModel.findOne({no: id});
    }
    // busqueda por el id, para verificar que id es un id utilizamos isValidObjectId
    // que verifica que sea un id que mongo agrega automaticamente
    if (isValidObjectId(id)) {
      pokemon = await this.pokemoModel.findById(id);
    }
    //busqueda por name - el findOne solo funcion con campos unique e index
    if (!pokemon) {
      pokemon = await this.pokemoModel.findOne({
        name: id.toLocaleLowerCase().trim(),
      });
    }
    if (!pokemon) {
      throw new NotFoundException(`No existe el pokemo con no: ${id}`);
    }
    return pokemon;
  }
  async update(id: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(id);
    try {
      if (updatePokemonDto.name) {
        updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
      }
      await pokemon.updateOne(updatePokemonDto);
      //pokemon es una instancia de mongo, toJSON(), combierte a un objeto
      return {...pokemon.toJSON(), ...updatePokemonDto};
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    // esta instruccion realiza dos consultas a mongo
    //const pokemon = await this.findOne(id);
    //await pokemon.deleteOne();
    //const result = await this.pokemoModel.findByIdAndDelete(id);
    const {deletedCount} = await this.pokemoModel.deleteOne({_id: id});
    if (deletedCount === 0) {
      throw new BadRequestException(`Pokemon with id ${id} not found`);
    }
    return;
  }
  //excepcions no controladas
  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new NotFoundException(
        `No se puede actualizar por que: ${JSON.stringify(error.keyValue)} ya existe`,
      );
    }
    throw new InternalServerErrorException(`Can't create Pokemoon - Check server logs`);
  }
}
