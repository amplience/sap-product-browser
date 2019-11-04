import request, { Response } from 'request';

export class ProductSearchService {
  constructor(
      private readonly host: string,
      private readonly token: string,
  ) {

  }

  public search(query: string, onSuccess: (response: ProductResult[]) => void, onFail?: (error: any) => void) {
    // request(`${ this.host }/Products`, {
    //       headers: {
    //         'apikey': this.token
    //       }, method: 'GET'
    //     },
    //     (error: any, response: Response, body: any) => {
    //       if (error) {
    //         if (onFail) {
    //           onFail(error);
    //           throw new Error('unable to retrieve results from SAP.')
    //         }
    //         onSuccess(response.body.d.results)
    //       }
    //     }
    // );

    onSuccess([
      {
        'ProductUUID': '01234567-89ab-cdef-0123-456789abcdef',
        'ProductOrigin': 'string',
        'ProductID': 'string',
        'ProductImageURL': 'http://www.fve.org/cms/wp-content/uploads/kitten-680-680x906.png',
        'WebsiteURL': 'string',
        'Brand': 'string',
        'IsBaseProduct': false,
        'BaseProductID': 'string',
        'BaseProductOrigin': 'string',
        'ProductValidEndDate': '/Date(1492098664000)/',
        'ProductNames': {
          'results': [
            {
              'ProductDescription': 'string',
              'ProductUUID': '01234567-89ab-cdef-0123-456789abcdef',
              'Language': 'string',
              'Name': 'string'
            }
          ]
        },
        'ProductCategoryAssignments': {
          'results': [
            {
              'ProductOrigin': 'string',
              'ProductID': 'string',
              'ProductCategoryHierarchyID': 'string',
              'ProductCategoryID': 'string'
            }
          ]
        },
        'ProductOriginDataSet': {
          'results': []
        }
      }
    ])
  }
}
