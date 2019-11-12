import { ImageContext } from './image-context';
import { PriceContext } from './price-context.js';

export interface Product {
  code: string,
  images: ImageContext[],
  defaultImageUrl: string,
  name: string,
  price: PriceContext,
  stock: { stockLevelStatus: string }
  summary: string;
}
