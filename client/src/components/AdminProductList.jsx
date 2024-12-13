import { Badge, Button, Pagination, Table, TextInput } from "flowbite-react";
import { FiEye } from "react-icons/fi";
import { LuPencilLine } from "react-icons/lu";
import { FiTrash } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  productStart,
  productSuccess,
  productFailure,
} from "../redux/actions/productActions";

export default function AdminProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        dispatch(productStart());
        const res = await fetch("/api/v1/product?limit=10", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.status === "success") {
          dispatch(productSuccess(data.products));
        } else {
          dispatch(productFailure(data.errors[0].msg));
        }

        setProducts(data.products);
      } catch (error) {
        dispatch(productFailure(error));
      }
    };
    getAllProducts();
  }, [location.pathname]);

  return (
    <div className="overflow-x-auto p-10">
      <p className="text-2xl font-bold pb-10">Products List</p>
      <div className="flex flex-col">
        {/* limit & search & add */}
        <div className="flex items-center justify-between">
          {/* left */}
          <div className="flex items-center gap-4 py-10">
            <p className="text-gray-500 text-sm">Showing</p>
            <select className="p-0 m-0 h-8 rounded-lg border-gray-500 outline-none ">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
            <p className="text-gray-500 text-sm">entries</p>
            <TextInput
              placeholder="Search..."
              rightIcon={IoIosSearch}
              className="w-[400px]"
            />
          </div>
          {/* right */}
          <div>
            <Button outline className="bg-[#264c4f]">
              Add Product
            </Button>
          </div>
        </div>
        {/* table */}
        <Table striped hoverable>
          <Table.Head>
            <Table.HeadCell>Product name</Table.HeadCell>
            <Table.HeadCell>Colors</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>quantity</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Brand</Table.HeadCell>
            <Table.HeadCell>Sold</Table.HeadCell>
            <Table.HeadCell>Stcok</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {products &&
              products.map((product) => (
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={product._id}
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <div className="flex gap-3 items-center">
                      <img
                        src={product.imageCover}
                        alt=""
                        className="w-14 h-14"
                      />
                      {product.title}
                    </div>
                  </Table.Cell>
                  <Table.Cell className="font-semibold">
                    {product.colors ? product.colors.join(", ") : "N/A"}
                  </Table.Cell>
                  <Table.Cell className="font-semibold">
                    {product.category}
                  </Table.Cell>
                  <Table.Cell className="font-semibold">
                    {product.quantity}
                  </Table.Cell>
                  <Table.Cell className="font-semibold">
                    ${product.price}.00
                  </Table.Cell>
                  <Table.Cell className="font-semibold">
                    <img src={product.brand} alt="" className="w-14 h-14" />
                  </Table.Cell>
                  <Table.Cell className="font-semibold">
                    {product.sold}
                  </Table.Cell>
                  <Table.Cell>
                    {product.quantity > 10 && (
                      <Badge color="info" className="font-semibold">
                        In Stock
                      </Badge>
                    )}
                    {product.quantity <= 10 && (
                      <Badge color="warning" className="font-semibold">
                        only {product.quantity} left
                      </Badge>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-5 text-lg">
                      <FiEye
                        className="text-blue-500 cursor-pointer"
                        onClick={() => {
                          navigate(`/shop/product/${product.slug}`);
                        }}
                      />
                      <LuPencilLine className="text-green-500 cursor-pointer" />
                      <FiTrash className="text-red-500 cursor-pointer" />
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
    </div>
  );
}
