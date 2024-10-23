class User {
  constructor(
    userUid,
    username,
    userEmail,
    userRole,
    addresses = [],
    phone,
    favourites = [],
    orders = []
  ) {
    this.userUid = userUid;
    this.username = username;
    this.userEmail = userEmail;
    this.userRole = userRole;
    this.userAddresses = addresses;
    this.userPhone = phone;
    this.userFavourites = favourites;
    this.userOrders = orders;
  }
}
