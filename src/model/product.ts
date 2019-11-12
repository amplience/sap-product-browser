import { ImageContext } from './image-context';
import { PriceContext } from './price-context';

export interface Product {
  code: string,
  averageRating: number,
  images: ImageContext[],
  defaultImageUrl: string,
  name: string,
  price: PriceContext,
  stock: { stockLevelStatus: string }
  summary: string;
}
