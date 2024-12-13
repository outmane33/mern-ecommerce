import { Badge, Button, Pagination, Table, TextInput } from "flowbite-react";
import { FiEye } from "react-icons/fi";
import { LuPencilLine } from "react-icons/lu";
import { FiTrash } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function AdminOders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

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

  const Modal = ({ isOpen, onClose, title, children }) => {
    const [updateForm, setUpdateForm] = useState({
      orderPayment: selectedOrder?.isPaid || false,
      orderStatus: selectedOrder?.orderStatus || "Pending",
    });
    const handleUpdateOrder = async () => {
      try {
        const res = await fetch(`/api/v1/order/${selectedOrder._id}/status`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateForm),
        });
        const data = await res.json();
        if (data.status === "success") {
          onClose();
          // getAllOrders();
          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order._id === selectedOrder._id ? data.order : order
            )
          );
          setUpdateForm({
            orderPayment: false,
            orderStatus: "Pending",
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (!isOpen) return null;
    return (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 ">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-[500px] relative ">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100 transition-colors z-10"
            >
              <FaTimes className="h-5 w-5" />
            </button>

            {/* Content */}
            <div className="">
              <div className="p-16 flex flex-col gap-6">
                {/* user */}
                <div className="flex gap-3 items-center">
                  <FaRegUserCircle className="text-lg" />
                  <p>{selectedOrder && selectedOrder.user.userName}</p>
                </div>
                {/* order id */}
                <div className="flex gap-3 justify-between items-center">
                  <p>Order ID:</p>
                  <p>{selectedOrder && selectedOrder._id}</p>
                </div>
                {/* order price */}
                <div className="flex gap-3 justify-between items-center">
                  <p>Order Price:</p>
                  <p>${selectedOrder && selectedOrder.totalOrderPrice}.00</p>
                </div>
                {/* order update */}
                <div className="flex gap-3 justify-between items-center">
                  <p>Update Date:</p>
                  <p>
                    {selectedOrder &&
                      new Date(selectedOrder.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                {/* order Payment	 */}
                <div className="flex gap-3 items-center justify-between">
                  <p>Order Payment:</p>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5"
                    onChange={(e) =>
                      setUpdateForm((prevForm) => ({
                        ...prevForm,
                        orderPayment: e.target.value === "Payed" ? true : false,
                      }))
                    }
                    defaultValue={
                      updateForm.orderPayment === true ? "Payed" : "Not Payed"
                    }
                  >
                    <option value="Payed">Payed</option>
                    <option value="Not Payed">Not Payed</option>
                  </select>
                </div>
                {/* Order Status */}
                <div className="flex gap-3 items-center justify-between">
                  <p>Order Status:</p>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5"
                    onChange={(e) =>
                      setUpdateForm((prevForm) => ({
                        ...prevForm,
                        orderStatus: e.target.value,
                      }))
                    }
                    defaultValue={updateForm.orderStatus}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Process">In Process</option>
                    <option value="In Shipping">In Shipping</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
                {/* update */}
                <button
                  className="bg-teal-800 flex-1 hover:bg-teal-700 text-white px-6 py-3 rounded-full transition-colors duration-200 mr-2  text-base"
                  onClick={() => {
                    setIsOpen(false);
                    handleUpdateOrder();
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  const DeleteModal = ({ isOpenDelete, onClose, title, children }) => {
    const handleDeleteOrder = async () => {
      try {
        const res = await fetch(`/api/v1/order/${selectedOrder._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.status === "success") {
          setIsOpenDelete(false);
          setOrders((prevOrders) =>
            prevOrders.filter((order) => order._id !== selectedOrder._id)
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (!isOpenDelete) return null;
    return (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-[500px] relative py-10">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100 transition-colors z-10"
            >
              <FaTimes className="h-5 w-5" />
            </button>

            {/* Content */}
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-16 w-16 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this Order?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={() => handleDeleteOrder()}>
                  {"Yes, I'm sure"}
                </Button>
                <Button color="gray" onClick={() => setIsOpenDelete(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="overflow-x-auto p-10">
      <p className="text-2xl font-bold pb-10">Products List</p>
      <div className="flex flex-col">
        {/* limit & search & add */}
        <div className="flex items-center justify-between">
          {/* left */}
          <div className="flex items-center gap-4 py-10">
            <TextInput
              placeholder="Search..."
              rightIcon={IoIosSearch}
              className="w-[400px]"
            />
          </div>
          {/* right */}
          <div>
            <Button outline className="bg-[#264c4f]">
              Export All Orders
            </Button>
          </div>
        </div>
        {/* table */}
        <Table striped hoverable>
          <Table.Head>
            <Table.HeadCell>User</Table.HeadCell>
            <Table.HeadCell>Order ID</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>updatedAt</Table.HeadCell>
            <Table.HeadCell>Payment</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Tracking</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {orders &&
              orders.map((order) => (
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={order._id}
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <div className="flex gap-3 items-center">
                      <FaRegUserCircle className="text-lg" />
                      {order && order.user.userName}
                    </div>
                  </Table.Cell>
                  <Table.Cell className="font-semibold">{order._id}</Table.Cell>
                  <Table.Cell className="font-semibold">
                    ${order.totalOrderPrice}.00
                  </Table.Cell>
                  <Table.Cell className="font-semibold">
                    {new Date(order.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell className="font-semibold ">
                    {order.isPaid && <FaCheck className="text-green-500" />}
                    {!order.isPaid && (
                      <IoCloseOutline className="text-red-500" />
                    )}
                  </Table.Cell>
                  <Table.Cell className="font-semibold">
                    {order.orderStatus === "Pending" && (
                      <Badge color="warning">Pending</Badge>
                    )}
                    {order.orderStatus === "In Process" && (
                      <Badge color="gray">In Process</Badge>
                    )}
                    {order.orderStatus === "In Shipping" && (
                      <Badge color="indigo">In Shipping</Badge>
                    )}
                    {order.orderStatus === "Delivered" && (
                      <Badge color="success">Delivered</Badge>
                    )}
                    {order.orderStatus === "Rejected" && (
                      <Badge color="failure">Rejected</Badge>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <Badge color="info" className="font-semibold">
                      Tracking
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-3 text-lg">
                      <FiEye
                        className="text-blue-500 cursor-pointer"
                        onClick={() => {
                          navigate(`/admin/order-details/${order._id}	`);
                        }}
                      />
                      <LuPencilLine
                        className="text-green-500 cursor-pointer"
                        onClick={() => {
                          setIsOpen(true);
                          setSelectedOrder(order);
                        }}
                      />
                      <FiTrash
                        className="text-red-500 cursor-pointer"
                        onClick={() => {
                          setIsOpenDelete(true);
                          setSelectedOrder(order);
                        }}
                      />
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
        {/* pagination */}
        <div className="flex overflow-x-auto sm:justify-center">
          <Pagination
            layout="pagination"
            currentPage={10}
            totalPages={1000}
            // onPageChange={onPageChange}
            previousLabel="Go back"
            nextLabel="Go forward"
            showIcons
          />
        </div>
      </div>
      {/* moadl edit */}
      <div className="p-4">
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={"title"}
        />
      </div>
      {/* moadl Delete */}
      <div className="p-4">
        <DeleteModal
          isOpenDelete={isOpenDelete}
          onClose={() => setIsOpenDelete(false)}
          title={"title"}
        />
      </div>
    </div>
  );
}
