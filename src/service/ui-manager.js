"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UIManager = /** @class */ (function () {
    function UIManager(productService) {
        this.productService = productService;
        this.resultsInfo = document.getElementById('resultsInfo');
        this.previousPage = document.getElementById('resultsInfo');
        this.nextPage = document.getElementById('resultsInfo');
    }
    UIManager.prototype.setDefaultCategory = function (defaultCategory) {
        var categoryText = document.getElementById('categoryText');
        categoryText.placeholder = defaultCategory;
    };
    UIManager.prototype.populateResultsTable = function (response) {
        var _this = this;
        var resultTable = document.getElementById('resultTable');
        resultTable.innerHTML = '';
        if (response.products.length > 0) {
            this.setPaginationInfo(response.pagination);
            response.products.map(function (x) {
                console.log('here is the product' + JSON.stringify(x, null, -2));
                var column = _this.createElement('div', 'column');
                var card = _this.createElement('div', 'card');
                column.append(card);
                var image = document.createElement('img');
                var imageSrc = _this.productService.getImageSrc(_this.getFirstImageOfFormat('thumbnail', x.images));
                console.log(' my image url: ' + imageSrc);
                image.src = imageSrc;
                card.append(_this.inDiv(_this.asHeader(3, document.createTextNode(x.name)), 'productTitle'));
                card.append(_this.inDiv(image, 'imageContainer'));
                card.append(_this.inDiv(_this.asParagraph(document.createTextNode(x.summary)), 'productSummary'));
                resultTable.append(column);
            });
        }
        else {
            this.setNoResultsFound();
        }
    };
    UIManager.prototype.setPaginationInfo = function (pagination) {
        this.resultsInfo.innerHTML = "Displaying " + (this.totalShown(pagination)) + " of " + pagination.totalResults;
    };
    UIManager.prototype.totalShown = function (pagination) {
        return (pagination.pageSize < pagination.totalResults) ? pagination.pageSize : pagination.totalResults;
    };
    UIManager.prototype.setNoResultsFound = function () {
        var resultTable = document.getElementById('resultTable');
        this.resultsInfo.innerHTML = '';
        resultTable.innerHTML = '';
        resultTable.append(this.inDiv(this.asParagraph("\n          |\\      _,,,---,,_\nZZZzz /,`.-'`'    -.  ;-;;,_\n     |,4-  ) )-,_. ,\\ (  `'-'\n    '---''(_/--'  `-'\\_)  No results found.\n    "), 'noResults'));
    };
    UIManager.prototype.inDiv = function (content, clazz) {
        var div = this.createElement('div', clazz);
        div.append(content);
        return div;
    };
    UIManager.prototype.asParagraph = function (content) {
        var paragraph = document.createElement('p');
        paragraph.appendChild(content);
        return paragraph;
    };
    UIManager.prototype.asHeader = function (guage, content) {
        var paragraph = document.createElement("h" + guage);
        paragraph.appendChild(content);
        return paragraph;
    };
    UIManager.prototype.getFirstImageOfFormat = function (format, images) {
        return (images) ? images.find(function (x) { return x.format === format; }) : undefined;
    };
    UIManager.prototype.createElement = function (type, clazz) {
        var element = document.createElement(type);
        if (clazz) {
            element.className = clazz;
        }
        return element;
    };
    return UIManager;
}());
exports.UIManager = UIManager;
