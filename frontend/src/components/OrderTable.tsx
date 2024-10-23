import React, { useEffect, useState } from "react";
import { Order } from "../types/Order.ts";
import { getOrders } from "../services/api.ts";

const OrderTable = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const fetchOrders = async () => {
    const orders = await getOrders();
    setOrders(orders);
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Orders</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border-b-2">User ID</th>
              <th className="px-4 py-2 border-b-2">Order ID</th>
              <th className="px-4 py-2 border-b-2">Order Status</th>
              <th className="px-4 py-2 border-b-2">Total Amount</th>
              <th className="px-4 py-2 border-b-2">Order Date</th>
              <th className="px-4 py-2 border-b-2">Products</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order.order.orderUid}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="px-4 py-2 border-b">
                  {order.order.orderUser.userUid}
                </td>
                <td className="px-4 py-2 border-b">{order.order.orderUid}</td>
                <td className="px-4 py-2 border-b">
                  {order.order.orderStatus}
                </td>
                <td className="px-4 py-2 border-b">{order.order.orderTotal}</td>
                <td className="px-4 py-2 border-b">{order.order.orderDate}</td>
                <td className="px-4 py-2 border-b">
                  {order.order.orderItems.map((product) => (
                    <p key={product.id}>
                      {product.name} - {product.quantity}
                    </p>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
