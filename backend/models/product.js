class Product {
  constructor(
    productId,
    productBrand,
    productName,
    productPrice,
    productDescription,
    productComments = [],
    productColor,
    productStock,
    categoryId,
    categoryName
  ) {
    this.productId = productId;
    this.productBrand = productBrand;
    this.productName = productName;
    this.productPrice = productPrice;
    this.productDescription = productDescription;
    this.productComments = productComments;
    this.productColor = productColor;
    this.productStock = productStock;
    this.categoryId = categoryId;
    this.categoryName = categoryName;
  }
}
