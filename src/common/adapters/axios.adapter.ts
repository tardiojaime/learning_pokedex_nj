import {Injectable} from '@nestjs/common';
import {HttpAdapter} from '../interfaces/http-adapter.interface';
import axios, {AxiosInstance} from 'axios';
// para que sea un proveeder necesitamos el decorador Injectable
@Injectable()
export class AxiosAdapter implements HttpAdapter {
  private axios: AxiosInstance = axios;
  async get<T>(url: string): Promise<T> {
    try {
      const {data} = await this.axios.get<T>(url);
      return data;
    } catch (error) {
      throw new Error('this is an error - check logs');
    }
  }
}
// luego definimos en modulo, como provider, y exportamos
// para que sea accesible
