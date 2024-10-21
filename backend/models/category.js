class Category {
  constructor(
    categoryId,
    generalCategory,
    categoryName,
    categoryDescription,
    categoryBrands = []
  ) {
    this.categoryId = categoryId;
    this.generalCategory = generalCategory;
    this.categoryName = categoryName;
    this.categoryDescription = categoryDescription;
    this.categoryBrands = categoryBrands;
  }
}
