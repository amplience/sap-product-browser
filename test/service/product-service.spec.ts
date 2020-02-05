const globalAny: any = global;
globalAny.fetch = require('node-fetch');

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised');

const expect = chai.expect
chai.use(chaiAsPromised)
import nock from 'nock';
import { Product, ProductResult, ProductService } from '../../src/index';


const PRODUCT_FIELDS = 'fields=products(code,name,summary,price(FULL),images(DEFAULT),stock(FULL),averageRating)';

describe('test product search method', () => {
  it('search without query should return assets', async () => {
    setUpMockServers('Digital_shop', '' +
        '', 20, 0, 'USD', 60);
    const service = new ProductService(
        'https://somesfccsite.com',
        '/baseSite',
        'myDefaultImage');

    const result = await service.search('Digital_shop', '');
    expect(result.pagination.currentPage).to.eq(0);
    expect(result.pagination.totalPages).to.eq(3);
    expect(result.pagination.totalResults).to.eq(60);
    expect(result.products.length).to.eq(20);
    expect(result.products[ 0 ].code).to.eq('code-0');
  });

  it('search with query should return assets', async () => {
    setUpMockServers('Digital_shop', 'simple', 20, 0, 'USD');
    const service = new ProductService(
        'https://somesfccsite.com',
        '/baseSite',
        'myDefaultImage');

    const result = await service.search('Digital_shop', 'simple');
    expect(result.pagination.currentPage).to.eq(0);
    expect(result.pagination.totalPages).to.eq(1);
    expect(result.pagination.totalResults).to.eq(20);
    expect(result.products.length).to.eq(20);
    expect(result.products[ 0 ].code).to.eq('code-0');
  });

  it('search fails and should reject promise', async () => {
    setUpMockServers('Digital_shop', 'simple', 20, 0, 'USD', 0, 400);
    const service = new ProductService(
        'https://somesfccsite.com',
        '/baseSite',
        'myDefaultImage');

    expect(service.search('Digital_shop', 'simple')).to.eventually.throw();
  });
});

describe('test product get by code method', async () => {
  it('get by code should return', async () => {
    setUpMockGetByCodeServers('Digital_shop', 'simple-code', 'USD');
    var service = new ProductService(
        'https://somesfccsite.com',
        '/baseSite',
        'myDefaultImage');

    const result = await service.getByCode('Digital_shop', 'simple-code');
    expect(result.code).to.eq('simple-code');
  });

  it('get by code  product does not exist should throw', async () => {
    setUpMockGetByCodeServers('Digital_shop', 'simple-code', 'USD', 404);
    var service = new ProductService(
        'https://somesfccsite.com',
        '/baseSite',
        'myDefaultImage');
    expect(service.getByCode('Digital_shop', 'simple-code')).to.eventually.throw();
  });
  it('get by code fails should throw ', async () => {
    setUpMockGetByCodeServers('Digital_shop', 'simple-code', 'USD', 400);
    var service = new ProductService(
        'https://somesfccsite.com',
        '/baseSite',
        'myDefaultImage');

    expect(service.getByCode('Digital_shop', 'simple-code')).to.eventually.throw();
  });
});

function setUpMockServers(
    catalogue: string,
    query: string,
    pageSize: number,
    page: number,
    currency: string,
    productCount: number = 20,
    responseCode: number = 200) {
  const products = <Product[]>[];
  const totalToReturn = (pageSize < productCount) ? pageSize : productCount;
  for (var count = 0; count < totalToReturn; count++) {
    products.push({
      code: `code-${ count }`,
      averageRating: 12,
      images: [
        {
          format: 'thumbnail',
          imageType: 'PRIMARY',
          url: `https://image-${ count }`,
        }
      ],
      defaultImageUrl: 'NONE',
      name: `myProduct-${ count }`,
      price: {
        currencyIso: 'smert',
        formattedValue: 'doller',
        priceType: 'sale',
        value: count
      },
      stock: {stockLevelStatus: 'low'},
      summary: `simple product based on the number ${ count }.`
    });
  }

  const response: ProductResult = {
    products: products,
    pagination: {
      currentPage: page,
      pageSize: pageSize,
      sort: 'default',
      totalPages: productCount / pageSize,
      totalResults: productCount
    }
  };
  nock('https://somesfccsite.com')
      .get(`/baseSite/${ catalogue }/products/search?${ PRODUCT_FIELDS },pagination(DEFAULT),sorts(DEFAULT),freeTextSearch&query=${ query }&pageSize=${ pageSize }&currentPage=${ page }&lang=en&curr=${ currency }`)
      .reply(responseCode, response);
}


function setUpMockGetByCodeServers(
    catalogue: string,
    code: string,
    currency: string,
    responseCode: number = 200) {
  nock('https://somesfccsite.com')
      .get(`/baseSite/${ catalogue }/products/${ code }?fields=code,name,summary,price(FULL),images(DEFAULT),stock(FULL),averageRating&lang=en&curr=${ currency }`)
      .reply(responseCode, {
        code: code,
        averageRating: 12,
        images: [
          {
            format: 'thumbnail',
            imageType: 'PRIMARY',
            url: `https://image-${ code }`,
          }
        ],
        defaultImageUrl: 'NONE',
        name: `myProduct-${ code }`,
        price: {
          currencyIso: 'smert',
          formattedValue: 'doller',
          priceType: 'sale',
          value: 123
        },
        stock: {stockLevelStatus: 'low'},
        summary: `simple product based on the code ${ code }.`
      });
}
