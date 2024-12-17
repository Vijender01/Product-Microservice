import { IProduct } from './product.interface';

export interface IProductCreateResponse {
  status: number;
  message: string;
  prouct: IProduct | null;
  errors: { [key: string]: any } | null;
}
