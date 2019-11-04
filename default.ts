import { init, SDK } from 'dc-extensions-sdk';
import { ProductSearchService } from './src/service/product-search-service.js';

async function onInit() {
  const SDK: SDK = await init();
  SDK.frame.setHeight(900);
  SDK.frame.startAutoResizer();
  const value = await SDK.field.getValue();
  const schema = SDK.field.schema;

  console.log(JSON.stringify(SDK.params));
  console.log(JSON.stringify(schema[ 'ui:extension' ]));
  const service = new ProductSearchService('', '');


  const searchButton = document.getElementById('searchButton');

  if (searchButton) {
    searchButton.addEventListener('click', async () => {
      service.search((document.getElementById('searchText') as HTMLInputElement).value, response => {
        const resultTable = document.getElementById('resultTable') as HTMLDivElement;
        resultTable.innerHTML = '';
        response.forEach(x => {
          const column = document.createElement('div');
          column.className = 'column';
          const card = document.createElement('div');
          card.className = 'card';
          column.append(card);

          let image = document.createElement('img');
          image.src = x.ProductImageURL;
          card.appendChild(inRow(asHeader(3, document.createTextNode(x.Brand))));
          card.append(inRow(image));
          card.appendChild(inRow(asParagraph(document.createTextNode(x.ProductUUID))));

          resultTable.append(column)
        })
      });
      document.getElementById('searchText');
      console.log('cthis value ', (document.getElementById('searchText') as HTMLInputElement).value);
    });
  }
}

function inRow(content: any) {
  const row = document.createElement('tr');
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


onInit();
