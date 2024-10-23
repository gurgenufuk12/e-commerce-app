class Order {
  constructor(
    orderUser,
    orderUid,
    orderItems = [],
    orderTotal,
    orderDate,
    orderStatus,
    orderAddress
  ) {
    this.orderUser = orderUser;
    this.orderUid = orderUid;
    this.orderItems = orderItems;
    this.orderTotal = orderTotal;
    this.orderDate = orderDate;
    this.orderStatus = orderStatus;
    this.orderAddress = orderAddress;
  }
}
