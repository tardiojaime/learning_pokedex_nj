import {Injectable} from '@nestjs/common';
import {PokeResponse} from './interfaces/poke-response.interface';
import {InjectModel} from '@nestjs/mongoose';
import {Pokemon} from 'src/pokemon/entities/pokemon.entity';
import {Model} from 'mongoose';
import {AxiosAdapter} from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}
  async executed() {
    await this.pokemonModel.deleteMany({});
    const pokemones: {name: string; no: number}[] = [];
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=1500');
    data.results.forEach(({name, url}) => {
      const segmento = url.split('/');
      const no = +segmento[segmento.length - 2];
      pokemones.push({name, no});
    });
    //especifica si la operación debe abortarse por completo si se encuentra algún error
    await this.pokemonModel.insertMany(pokemones);
    return {sms: 'Datos cargados', datos: pokemones.length};
  }
}
