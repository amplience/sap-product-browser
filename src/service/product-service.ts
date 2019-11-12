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
      private readonly defaultImageFormat: string = 'thumbnail',
      private readonly defaultImageType: string = 'PRIMARY'
  ) {
    this.url = `${ sanitise(host) }/${ sanitise(basPath) }`
  }

  public search(
      catalogue: string,
      query: string,
      currency: string,
      page: number,
      onSuccess: (response: ProductResult) => void,
      onFail?: (code: number, message: any) => void
  ) {
    fetch(
        `${ this.url }/${ catalogue }/products/search?${ PRODUCT_FIELDS },pagination(DEFAULT),sorts(DEFAULT),freeTextSearch&query=${ query }&pageSize=${ PAGE_SIZE }&lang=en&curr=${ currency }`,
        this.buildRequestOptions()
    ).then(async response => {
          if (!response.ok) {
            if (onFail) {
              onFail(response.status, response.statusText);
            } else {
              throw new Error(`unable to retrieve results from SAP: ${ response.statusText }`)
            }
          }
          onSuccess(this.setDefaultImagesForProducts(await response.json()))

        }
    );
  }

  public getByCode(
      catalogue: string,
      code: string,
      currency: string,
      onSuccess: (response: ProductResult) => void,
      onFail?: (code: number, message: any) => void
  ) {
    fetch(`${ this.host }${ this.basPath }/${ catalogue }/products/${ code }?fields=code,name,summary,price(FULL),images(DEFAULT),stock(FULL),averageRating&lang=en&curr=${ currency }`,
        this.buildRequestOptions()
    ).then(async response => {
          if (!response.ok) {
            if (onFail) {
              onFail(response.status, response.statusText);
            } else {
              throw new Error(`unable to retrieve product by code from SAP: ${ response.statusText }`)
            }
          }
          onSuccess(await response.json())
        }
    );
  }

  public getFirstImageOfFormat(
      images: ImageContext[],
      imageFormat: string,
      imageType: string
  ): ImageContext | undefined {
    return (images) ? images.find(x => x.format === imageFormat && x.imageType === imageType) : undefined;
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
      x.defaultImageUrl = this.getImageSrc(
          this.getFirstImageOfFormat(x.images, this.defaultImageFormat, this.defaultImageType)
      );

    });
    return result;
  }

}
