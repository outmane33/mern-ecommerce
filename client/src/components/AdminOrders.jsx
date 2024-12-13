import { Badge, Button, Modal, Select, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function AdminOrders() {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [status, setStatus] = useState("pending");

  const getAllOrders = async () => {
    try {
      const res = await fetch("/api/v1/order", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.status === "success") {
        setOrders(data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllOrders();
  }, [location]);

  const handleOrderDetails = (order) => {
    setStatus(order.orderStatus);
    setShowModal(true);
    setSelectedOrder(order);
  };

  const handleUpdateOrderStatus = async (order) => {
    try {
      const res = await fetch(`/api/v1/order/${order._id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: status }),
      });
      const data = await res.json();
      if (data.status === "success") {
        setShowModal(false);
        getAllOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5">
      <div className="flex flex-col gap-4 p-3 shadow-md">
        <h2 className="text-2xl font-semibold">Order History</h2>
        <Table>
          <Table.Head>
            <Table.HeadCell>Order ID</Table.HeadCell>
            <Table.HeadCell>Order Date</Table.HeadCell>
            <Table.HeadCell>Order Status</Table.HeadCell>
            <Table.HeadCell>Order Price</Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>
          </Table.Head>
          {orders &&
            orders.map((order) => (
              <Table.Body key={order._id}>
                <Table.Row>
                  <Table.Cell>{order._id}</Table.Cell>
                  <Table.Cell>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    {order.orderStatus === "Pending" ? (
                      <Badge
                        color="gray"
                        size="sm"
                        className="rounded-lg flex justify-center items-center"
                      >
                        Pending
                      </Badge>
                    ) : order.orderStatus === "In Process" ? (
                      <Badge
                        color="info"
                        size="sm"
                        className="rounded-lg flex justify-center items-center"
                      >
                        In Process
                      </Badge>
                    ) : order.orderStatus === "In Shipping" ? (
                      <Badge
                        color="indigo"
                        size="sm"
                        className="rounded-lg flex justify-center items-center"
                      >
                        In Shipping
                      </Badge>
                    ) : order.orderStatus === "Delivered" ? (
                      <Badge
                        color="success"
                        size="sm"
                        className="rounded-lg flex justify-center items-center"
                      >
                        Delivered
                      </Badge>
                    ) : order.orderStatus === "Rejected" ? (
                      <Badge
                        color="failure"
                        size="sm"
                        className="rounded-lg flex justify-center items-center"
                      >
                        Rejected
                      </Badge>
                    ) : (
                      ""
                    )}
                  </Table.Cell>
                  <Table.Cell>{order.totalOrderPrice} MAD</Table.Cell>
                  <Table.Cell>
                    <button
                      className="bg-black text-white px-3 py-2 rounded-lg font-semibold"
                      onClick={() => {
                        handleOrderDetails(order);
                      }}
                    >
                      View Details
                    </button>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
        </Table>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header />
        <Modal.Body>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <p className="font-semibold text-base">Order ID</p>
              <p className="font-semibold">
                {selectedOrder && selectedOrder._id}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold text-base">Order Date</p>
              <p className="font-semibold">
                {selectedOrder &&
                  new Date(selectedOrder.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold text-base">Order Price</p>
              <p className="font-semibold">
                {selectedOrder && selectedOrder.totalOrderPrice} MAD
              </p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold text-base">Order Status</p>
              <p className="font-semibold">
                {selectedOrder && selectedOrder.orderStatus}
              </p>
            </div>
            <hr />
            <p className="font-semibold">Order Details</p>
            {selectedOrder &&
              selectedOrder.cartItems.map((item) => (
                <div className="flex justify-between" key={item._id}>
                  <p className="font-semibold text-base text-gray-500">
                    {item.product.title}
                  </p>
                  <p className="font-semibold">{item.price} MAD</p>
                </div>
              ))}
            <hr />
            <p className="font-semibold">Shipping Info</p>
            <p className="font-semibold text-base text-gray-500">
              {selectedOrder && selectedOrder.user.userName}
            </p>
            <p className="font-semibold text-base text-gray-500">
              {selectedOrder && selectedOrder.shippingAdress.details}
            </p>
            <p className="font-semibold text-base text-gray-500">
              {selectedOrder && selectedOrder.shippingAdress.phone}
            </p>
            <p className="font-semibold text-base text-gray-500">
              {selectedOrder && selectedOrder.shippingAdress.city}
            </p>
            <p className="font-semibold text-base text-gray-500">
              {selectedOrder && selectedOrder.shippingAdress.postalCode}
            </p>
            <p className="font-semibold">Order Status</p>
            {/* show options to top */}
            <Select
              defaultValue={selectedOrder && selectedOrder.orderStatus}
              size="sm"
              className="w-full font-semibold"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="In Process">In Process</option>
              <option value="In Shipping">In Shipping</option>
              <option value="Delivered">Delivered</option>
              <option value="Rejected">Rejected</option>
            </Select>
            <button
              className="bg-black text-white font-semibold text-base py-2 rounded-lg border hover:bg-white hover:text-black  hover:border-black"
              onClick={() => {
                handleUpdateOrderStatus(selectedOrder);
              }}
            >
              Update Order Status
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
