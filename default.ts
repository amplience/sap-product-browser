import { init, SDK } from 'dc-extensions-sdk';
import { ProductService } from './src/service/product-service';
import { UIManager } from './src/service/ui-manager';


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
      '/rest/v2'
  );

  const searchText = document.getElementById('searchText') as HTMLInputElement;
  const uiManager = new UIManager(service);
  const defaultCategory = 'electronics-spa';

    uiManager.setDefaultCategory(defaultCategory);
    service.search(defaultCategory, '', 'USD', 0, response => {
      uiManager.populateResultsTable(response);
    });


  if (searchText) {
    searchText.addEventListener('keyup', function (event) {
      if (event.key === 'Enter') {
        service.search(defaultCategory, searchText.value, 'USD', 0, response => {
          uiManager.populateResultsTable(response);
        });
      }
    });
  }
}

onInit();
