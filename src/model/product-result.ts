import { Pagination } from './pagination';
import { Product } from './product';

export interface ProductResult {
  products: Product[]
  pagination: Pagination;
}
