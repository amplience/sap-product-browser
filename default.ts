import { init, SDK } from 'dc-extensions-sdk';
import { ProductService } from './src/service/product-service.js';
import { ImageContext } from './src/model/image-context.js';

function createElement(type: string, clazz?: string) {
  const element = document.createElement('div');
  if (clazz) {
    element.className = clazz;
  }
  return element;
}

async function onInit() {
  const SDK: SDK = await init();
  SDK.frame.startAutoResizer();
  const value = await SDK.field.getValue();
  const schema = SDK.field.schema;

  console.log(JSON.stringify(SDK.params));
  console.log(JSON.stringify(schema[ 'ui:extension' ]));
  console.log(`should be origin of ${ location.origin }`);
  const service = new ProductService(
      'https://api.cjp2keew1-amplience1-d1-public.model-t.cc.commerce.ondemand.com',
      '/rest/v2',
      'electronics-spa',
      'USD'
  );


  const searchButton = document.getElementById('searchButton');

  if (searchButton) {
    searchButton.addEventListener('click', async () => {
      service.search((document.getElementById('searchText') as HTMLInputElement).value, 0, response => {
        const resultTable = document.getElementById('resultTable') as HTMLDivElement;
        resultTable.innerHTML = '';
        response.products.forEach(x => {
          console.log('here is the product' + JSON.stringify(x, null, -2));
          const column = createElement('div', 'column');
          const card = createElement('div', 'card');
          column.append(card);

          let image = document.createElement('img');
          let imageSrc = service.getImageSrc(getFirstImageOfFormat('thumbnail', x.images));
          console.log(' my image url: ' + imageSrc);
          image.src = imageSrc;
          card.append(inDiv(asHeader(3, document.createTextNode(x.name)), 'productTitle'));
          card.append(inDiv(image, 'imageContainer'));
          card.append(inDiv(asParagraph(document.createTextNode(x.summary)), 'productSummary'));

          resultTable.append(column)
        })
      });
      document.getElementById('searchText');
    });
  }
}

function inDiv(content: any, clazz?: string) {
  const row = createElement('div', clazz);
  row.append(content);
  return row;
}

function asParagraph(content: any) {
  const paragraph = document.createElement('p');
  paragraph.appendChild(content);
  return paragraph;
}

function asHeader(guage: number, content: any) {
  const paragraph = document.createElement(`h${ guage }`);
  paragraph.appendChild(content);
  return paragraph;
}

function getFirstImageOfFormat(format: string, images: ImageContext[]): ImageContext | undefined {
  return (images) ? images.find(x => x.format === format) : undefined;
}

onInit();
