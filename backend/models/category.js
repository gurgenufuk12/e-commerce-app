class Category {
  constructor(
    categoryId,
    categoryName,
    categoryDescription,
    categoryBrands = []
  ) {
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.categoryDescription = categoryDescription;
    this.categoryBrands = categoryBrands;
  }
}
