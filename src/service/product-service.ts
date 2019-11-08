import request, { Response } from 'request';
import { ProductResult } from '../model/product-result';
import { ImageContext } from '../model/image-context.js';

const PAGE_SIZE = 25;

export class ProductService {


  constructor(
      private readonly host: string,
      private readonly basPath: string
  ) {

  }

  public search(
      catalogue: string,
      query: string,
      currency: string,
      page: number,
      onSuccess: (response: ProductResult) => void,
      onFail?: (error: any) => void
  ) {
    request.get(`${ this.host }${ this.basPath }/${ catalogue }/products/search?fields=products(code,name,summary,price(FULL),images(DEFAULT),stock(FULL),averageRating),pagination(DEFAULT),sorts(DEFAULT),
    freeTextSearch&query=${ query }&pageSize=${ PAGE_SIZE }&lang=en&curr=${currency }`, {
          headers: {
            'Origin': null
          }
        },
        (error: any, response: Response, body: any) => {
          if (error) {
            if (onFail) {
              onFail(error);
              throw new Error('unable to retrieve results from SAP.')
            }
          }
          onSuccess(JSON.parse(body))

        }
    );
  }

  public getByCode(
      catalogue: string,
      code: string,
      onSuccess: (response: ProductResult) => void,
      onFail?: (error: any) => void
  ) {
    request.get(`${ this.host }${ this.basPath }/${ catalogue }/products/${ code }?fields=code,name,summary,price(FULL),images(DEFAULT),stock(FULL),averageRating&lang=en&curr=${ this.currency }`, {
          headers: {
            'Origin': null
          }
        },
        (error: any, response: Response, body: any) => {
          if (error) {
            if (onFail) {
              onFail(error);
              throw new Error('unable to retrieve product by code from SAP.')
            }
            onSuccess(body.d.results)
          }
        }
    );
  }

  public getImageSrc(image?: ImageContext): string {
    return (image) ? `${ this.host }/${ image.url }` : 'https://apps.dev-artifacts.adis.ws/cms-icons/master/latest/256/ca-types-carousel.png';
  }

}
