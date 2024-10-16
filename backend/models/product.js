class Product {
  constructor(
    productId,
    productName,
    productPrice,
    productDescription,
    productComments = [],
    productColor,
    categoryId,
    categoryName
  ) {
    this.productId = productId;
    this.productName = productName;
    this.productPrice = productPrice;
    this.productDescription = productDescription;
    this.productComments = productComments;
    this.productColor = productColor;
    this.categoryId = categoryId;
    this.categoryName = categoryName;
  }
}
