import {
  Badge,
  Button,
  Label,
  Modal,
  Table,
  Tabs,
  TextInput,
} from "flowbite-react";
import UserAdressCard from "./UserAdressCard";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function UserAcount() {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
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
    getAllOrders();
  }, [location]);

  return (
    <div>
      {/* banner */}
      <div className="w-full">
        <img
          src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
          alt=""
          className="w-full  h-[400px] object-cover"
        />
      </div>
      <div className=" m-10 p-7 shadow-md">
        <Tabs aria-label="Full width tabs">
          <Tabs.Item active title="Orders">
            <div className="flex flex-col gap-4">
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
                            onClick={() => setShowModal(true)}
                          >
                            View Details
                          </button>
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  ))}
              </Table>
            </div>
          </Tabs.Item>
          <Tabs.Item title="Adresses">
            <UserAdressCard />
          </Tabs.Item>
        </Tabs>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header />
        <Modal.Body>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <p className="font-semibold text-base">Order ID</p>
              <p className="font-semibold">1231654</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold text-base">Order Date</p>
              <p className="font-semibold">01/01/2001</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold text-base">Order Price</p>
              <p className="font-semibold">200 MAD</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold text-base">Order Status</p>
              <p className="font-semibold">In Process</p>
            </div>
            <hr />
            <p className="font-semibold">Order Details</p>
            <div className="flex justify-between">
              <p className="font-semibold text-base text-gray-500">
                Product One
              </p>
              <p className="font-semibold">100 MAD</p>
            </div>
            <p className="font-semibold">Shipping Info</p>
            <p className="font-semibold text-base text-gray-500">John Doe</p>
            <p className="font-semibold text-base text-gray-500">Adress</p>
            <p className="font-semibold text-base text-gray-500">Phone</p>
            <p className="font-semibold text-base text-gray-500">City</p>
            <p className="font-semibold text-base text-gray-500">PostalCode</p>
            <p className="font-semibold">Order Status</p>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
