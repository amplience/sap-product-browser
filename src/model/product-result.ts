interface ProductResult extends Product {
  ProductOriginDataSet: { results: Product[] }
}

interface Product {
  ProductUUID: string;
  ProductOrigin: string;
  ProductID: string;
  ProductImageURL: string;
  WebsiteURL: string;
  Brand: string;
  IsBaseProduct?: boolean;
  BaseProductID: string;
  BaseProductOrigin: string;
  ProductValidEndDate: string;
  ProductNames: { results: ProductName[] };
  ProductCategoryAssignments: { results: ProductCategoryAssignment[] }
  ProductOriginDataSet: { results: Product[] }
}

interface ProductName {
  ProductDescription: string;
  ProductUUID?: string;
  ProductOrigin?: string;
  Language: string;
  ProductID?: string;
  Name: string;
}

interface ProductCategoryAssignment {
  ProductOrigin: string;
  ProductID: string;
  ProductCategoryHierarchyID: string;
  ProductCategoryID: string;
}
