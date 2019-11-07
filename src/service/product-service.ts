import request, { Response } from 'request';
import { ProductResult } from '../model/product-result';
import { ImageContext } from '../model/image-context.js';

const PAGE_SIZE = 25;

export class ProductService {


  constructor(
      private readonly host: string,
      private readonly basPath: string,
      private readonly catalogue: string,
      private readonly currency: string
  ) {

  }

  public search(query: string, page: number, onSuccess: (response: ProductResult) => void, onFail?: (error: any) => void) {
    request.get(`${ this.host }${ this.basPath }/${ this.catalogue }/products/search?fields=products(code,name,summary,price(FULL),images(DEFAULT),stock(FULL),averageRating),pagination(DEFAULT),sorts(DEFAULT),
    freeTextSearch&query=${ query }&pageSize=${ PAGE_SIZE }&lang=en&curr=${ this.currency }`, {
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

  public getByCode(code: string, onSuccess: (response: ProductResult) => void, onFail?: (error: any) => void) {
    request.get(`${ this.host }${ this.basPath }/${ this.catalogue }/products/${ code }?fields=code,name,summary,price(FULL),images(DEFAULT),stock(FULL),averageRating&lang=en&curr=${ this.currency }`, {
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
    return (image) ? `${ this.host }/${ image.url }` : 'N/A';
  }

}
