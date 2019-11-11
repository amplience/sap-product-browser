import request, { Response } from 'request';
import { ProductResult } from '../model/product-result';
import { ImageContext } from '../model/image-context.js';

const PAGE_SIZE = 25;
const PRODUCT_FIELDS = 'fields=products(code,name,summary,price(FULL),images(DEFAULT),stock(FULL),averageRating)';


function sanitise(value: string): string {
  const partial = (value.startsWith('/')) ? value.substring(1, value.length) : value;
  return (partial.endsWith('/')) ? partial.substring(0, partial.length - 1) : partial
}

export class ProductService {
  private readonly url: string;

  constructor(
      private readonly host: string,
      private readonly basPath: string,
      private readonly defaultNotFoundImage: string,
      private readonly authTokenSupplier?: () => string,
      private readonly imageFormat: string = 'thumbnail'
  ) {
    this.url = `${ sanitise(host) }/${ sanitise(basPath) }`
  }

  public search(
      catalogue: string,
      query: string,
      currency: string,
      page: number,
      onSuccess: (response: ProductResult) => void,
      onFail?: (error: any) => void
  ) {
    request.get(
        `${ this.url }/${ catalogue }/products/search?${ PRODUCT_FIELDS },pagination(DEFAULT),sorts(DEFAULT),freeTextSearch&query=${ query }&pageSize=${ PAGE_SIZE }&lang=en&curr=${ currency }`,
        this.buildRequestOptions(),
        (error: any, response: Response, body: any) => {
          if (error) {
            if (onFail) {
              onFail(error);
              throw new Error('unable to retrieve results from SAP.')
            }
          }
          onSuccess(this.setDefaultImagesForProducts(JSON.parse(body)))

        }
    );
  }

  public getByCode(
      catalogue: string,
      code: string,
      currency: string,
      onSuccess: (response: ProductResult) => void,
      onFail?: (error: any) => void
  ) {
    request.get(`${ this.host }${ this.basPath }/${ catalogue }/products/${ code }?fields=code,name,summary,price(FULL),images(DEFAULT),stock(FULL),averageRating&lang=en&curr=${ currency }`,
        this.buildRequestOptions(),
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

  public getFirstImageOfFormat(images: ImageContext[], imageFormat: string): ImageContext | undefined {
    return (images) ? images.find(x => x.format === imageFormat) : undefined;
  }

  public getImageSrc(image?: ImageContext): string {
    return (image) ? `${ this.host }/${ image.url }` : this.defaultNotFoundImage;
  }

  private buildRequestOptions(): any {
    return (this.authTokenSupplier) ? {
      headers: {
        'Authorization': `Bearer ${ this.authTokenSupplier() }`
      }
    } : {}
  }

  private setDefaultImagesForProducts(result: ProductResult): ProductResult {
    result.products.forEach(x => {
      const defaultImage = this.getFirstImageOfFormat(x.images, this.imageFormat);
      if (defaultImage) {
        x.defaultImageUrl = this.getImageSrc(defaultImage);
      }
    });
    return result;
  }

}
