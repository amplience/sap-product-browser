import { ProductResult } from '../model/product-result';
import { ImageContext } from '../model/image-context';
import { Product } from '../model/product';
import { selectorFirstImageOfFormat } from '../utils/selectorFirstImageOfFormat.js';

const DEFAULT_CURRENCY = 'USD';
const DEFAULT_PAGE_SIZE = 20;
const DEFAULT_PAGE = 0;
const PRODUCT_FIELDS = 'fields=products(code,name,summary,price(FULL),images(DEFAULT),stock(FULL),averageRating)';

function sanitise(value: string): string {
  const partial = (value.startsWith('/')) ? value.substring(1, value.length) : value;
  return (partial.endsWith('/')) ? partial.substring(0, partial.length - 1) : partial;
}

export class ProductService {
  private readonly url: string;
  private readonly imageSelector = selectorFirstImageOfFormat;

  constructor(
      private readonly host: string,
      basPath: string,
      private readonly defaultNotFoundImage: string,
      private readonly authTokenSupplier?: () => string,
      private readonly defaultImageOptions: ImageOptions = {
        format: 'thumbnail',
        type: 'PRIMARY'
      }
  ) {
    this.url = `${ sanitise(host) }/${ sanitise(basPath) }`;
  }

  public async search(
      catalogue: string,
      query: string,
      currency: string = DEFAULT_CURRENCY,
      page: number = DEFAULT_PAGE,
      pageSize: number = DEFAULT_PAGE_SIZE,
      defaultImageOptions: ImageOptions = this.defaultImageOptions
  ): Promise<ProductResult> {
    return fetch(
        `${ this.url }/${ catalogue }/products/search?${ PRODUCT_FIELDS },pagination(DEFAULT),sorts(DEFAULT),freeTextSearch&query=${ query }&pageSize=${ pageSize }&currentPage=${ page }&lang=en&curr=${ currency }`,
        this.buildRequestOptions()
    ).then(async response => {
          if (!response.ok) {
            return Promise.reject(`unable to retrieve results from SAP: ${ response.statusText }`);
          }
          return this.setDefaultImagesForProducts(await response.json(), defaultImageOptions);
        }
    );
  }

  public async getByCode(
      catalogue: string,
      code: string,
      currency: string = DEFAULT_CURRENCY,
      defaultImageOptions: ImageOptions = this.defaultImageOptions
  ): Promise<Product> {
    return fetch(`${ this.url }/${ catalogue }/products/${ code }?fields=code,name,summary,price(FULL),images(DEFAULT),stock(FULL),averageRating&lang=en&curr=${ currency }`,
        this.buildRequestOptions()
    ).then(async response => {
          if (!response.ok) {
            return Promise.reject(`unable to retrieve product by code from SAP: ${ response.statusText }`);
          }
          const product: Product = await response.json();
          product.defaultImageUrl = this.getImageSrc(
              this.imageSelector(product.images, defaultImageOptions.format, defaultImageOptions.type)
          );
          return product;
        }
    );
  }

  private getImageSrc(image?: ImageContext): string {
    return (image) ? `${ this.host }/${ image.url }` : this.defaultNotFoundImage;
  }

  private buildRequestOptions(): any {
    return (this.authTokenSupplier) ? {
      headers: {
        Authorization: this.authTokenSupplier()
      }
    } : {};
  }

  private setDefaultImagesForProducts(result: ProductResult, defaultImageOptions: ImageOptions): ProductResult {
    result.products.forEach(x => {
      x.defaultImageUrl = this.getImageSrc(
          this.imageSelector(x.images, defaultImageOptions.format, defaultImageOptions.type)
      );
    });
    return result;
  }
}

interface ImageOptions {
  format: string;
  type: string;
}
