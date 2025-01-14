import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import {PokemonService} from './pokemon.service';
import {CreatePokemonDto} from './dto/create-pokemon.dto';
import {UpdatePokemonDto} from './dto/update-pokemon.dto';
import {ParseMongoIdPipe} from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import {PaginationDTO} from 'src/common/dto/pagination.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  //@HttpCode(HttpStatus.OK) //Podemos cambiar el retorno del codigo http
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll(@Query() paginationDTO: PaginationDTO) {
    return this.pokemonService.findAll(paginationDTO);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pokemonService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update(id, updatePokemonDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.pokemonService.remove(id);
  }
}
