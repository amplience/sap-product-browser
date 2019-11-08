import { ProductResult } from '../model/product-result';
import { ProductService } from './product-service.js';
import { ImageContext } from '../model/image-context.js';
import { Pagination } from '../model/pagination.js';

export class UIManager {

  private readonly resultsInfo = document.getElementById('resultsInfo') as HTMLDivElement;
  private readonly previousPage = document.getElementById('resultsInfo');
  private readonly nextPage = document.getElementById('resultsInfo');

  constructor(private readonly productService: ProductService) {
  }

  public setDefaultCategory(defaultCategory: string) {
    const categoryText = document.getElementById('categoryText') as HTMLInputElement;
    categoryText.placeholder = defaultCategory;
  }

  public populateResultsTable(response: ProductResult) {
    const resultTable = document.getElementById('resultTable') as HTMLDivElement;
    resultTable.innerHTML = '';

    if (response.products.length > 0) {
      this.setPaginationInfo(response.pagination);
      response.products.map(x => {
        console.log('here is the product' + JSON.stringify(x, null, -2));
        const column = this.createElement('div', 'column');
        const card = this.createElement('div', 'card');
        column.append(card);

        let image = document.createElement('img');
        let imageSrc = this.productService.getImageSrc(this.getFirstImageOfFormat('thumbnail', x.images));
        console.log(' my image url: ' + imageSrc);
        image.src = imageSrc;
        card.append(this.inDiv(this.asHeader(3, document.createTextNode(x.name)), 'productTitle'));
        card.append(this.inDiv(image, 'imageContainer'));
        card.append(this.inDiv(this.asParagraph(document.createTextNode(x.summary)), 'productSummary'));

        resultTable.append(column)
      })
    } else {
      this.setNoResultsFound()
    }
  }

  public setPaginationInfo(pagination: Pagination) {
    this.resultsInfo.innerHTML = `Displaying ${ (this.totalShown(pagination)) } of ${ pagination.totalResults }`
  }

  private totalShown(pagination: Pagination) {
    return (pagination.pageSize < pagination.totalResults) ? pagination.pageSize : pagination.totalResults;
  }

  public setNoResultsFound() {
    const resultTable = document.getElementById('resultTable') as HTMLDivElement;
    this.resultsInfo.innerHTML = '';
    resultTable.innerHTML = '';
    resultTable.append(this.inDiv(this.asParagraph(`
          |\\      _,,,---,,_
ZZZzz /,\`.-'\`'    -.  ;-;;,_
     |,4-  ) )-,_. ,\\ (  \`'-'
    '---''(_/--'  \`-'\\_)  No results found.
    `), 'noResults'));

  }

  private inDiv(content: any, clazz?: string) {
    const div = this.createElement('div', clazz);
    div.append(content);
    return div;
  }

  private asParagraph(content: any) {
    const paragraph = document.createElement('p');
    paragraph.appendChild(content);
    return paragraph;
  }

  private asHeader(guage: number, content: any) {
    const paragraph = document.createElement(`h${ guage }`);
    paragraph.appendChild(content);
    return paragraph;
  }

  private getFirstImageOfFormat(format: string, images: ImageContext[]): ImageContext | undefined {
    return (images) ? images.find(x => x.format === format) : undefined;
  }


  private createElement(type: string, clazz?: string) {
    const element = document.createElement(type);
    if (clazz) {
      element.className = clazz;
    }
    return element;
  }


}
