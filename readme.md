# SAP product browser lib 

[![Build Status](https://travis-ci.org/amplience/sap-product-browser.svg?branch=master)](https://travis-ci.org/amplience/sap-product-browser)

This project is a small client library for communicating with SAP commerce cloud(C4Hana) Hybris. 

## Building

Build locally:
```
$ npm install
$ npm run-script build
```

## Usage
This lib contains a client ``product-service`` with the following functions to retrieve products from hybris:
* ``search``: this requires a ``catalogue`` and a ``query`` to retrieve a paginated list of products.
* ``getByCode``: this uses a ``catalogue`` and a product ``code`` to retrieve a single product.
Both functions use the  ``defaultImageOptions`` to find a default image url and attach to the product this will be defaulted to ``defaultNotFoundImage`` if none are found.
 
### Constructor params
* ``host``: URL of deployed Hybris instance.
* ``basPath``: path to Hybris API.
* ``defaultNotFoundImage``: URL to default image if no image available from product.
* ``authTokenSupplier``: Function to return auth token (can be null if no auth needed).
* ``defaultImageOptions``:
  * ``format``: defaulted to 'thumbnail'.
  * ``type``: defaulted to 'PRIMARY'.
  
