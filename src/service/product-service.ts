import request, { Response } from 'request';
import { ProductResult } from '../model/product-result.js';

export class ProductSearchService {
  constructor(
      private readonly host: string,
      private readonly catalogue: string,
      private readonly token: string
  ) {

  }

  public search(query: string, onSuccess: (response: ProductResult) => void, onFail?: (error: any) => void) {
    request.get(`${ this.host }/${ this.catalogue }/products/search?fields=products(code,name,summary,price(FULL),images(DEFAULT),stock(FULL),averageRating),pagination(DEFAULT),sorts(DEFAULT),freeTextSearch&query=${ query }&pageSize=5&lang=en&curr=USD`, {
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
            onSuccess(body.d.results)
          }
        }
    );
    //
    // onSuccess([
    //   {
    //     'ProductUUID': '01234567-89ab-cdef-0123-456789abcdef',
    //     'ProductOrigin': 'string',
    //     'ProductID': 'string',
    //     'ProductImageURL': 'http://www.fve.org/cms/wp-content/uploads/kitten-680-680x906.png',
    //     'WebsiteURL': 'string',
    //     'Brand': 'string',
    //     'IsBaseProduct': false,
    //     'BaseProductID': 'string',
    //     'BaseProductOrigin': 'string',
    //     'ProductValidEndDate': '/Date(1492098664000)/',
    //     'ProductNames': {
    //       'results': [
    //         {
    //           'ProductDescription': 'string',
    //           'ProductUUID': '01234567-89ab-cdef-0123-456789abcdef',
    //           'Language': 'string',
    //           'Name': 'string'
    //         }
    //       ]
    //     },
    //     'ProductCategoryAssignments': {
    //       'results': [
    //         {
    //           'ProductOrigin': 'string',
    //           'ProductID': 'string',
    //           'ProductCategoryHierarchyID': 'string',
    //           'ProductCategoryID': 'string'
    //         }
    //       ]
    //     },
    //     'ProductOriginDataSet': {
    //       'results': []
    //     }
    //   }
    // ])
  }
}
