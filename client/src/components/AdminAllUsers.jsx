import { Button, Pagination, Table, TextInput } from "flowbite-react";
import { FiEye } from "react-icons/fi";
import { LuPencilLine } from "react-icons/lu";
import { FiTrash } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function AdminAllUsers() {
  const [users, setUsers] = useState([]);
  const location = useLocation();
  const getAllUsers = async () => {
    try {
      const res = await fetch("/api/v1/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.status === "success") {
        setUsers(data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, [location.pathname]);
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
              Add New
            </Button>
          </div>
        </div>
        {/* table */}
        <Table striped hoverable>
          <Table.Head>
            <Table.HeadCell>User</Table.HeadCell>
            <Table.HeadCell>Phone</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>

            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {users &&
              users.map((user) => (
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={user._id}
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <div className="flex gap-3 items-center">
                      <img
                        src="https://remosnextjs.vercel.app/images/products/41.png"
                        alt=""
                        className="w-14 h-14"
                      />
                      <div>
                        <p>{user.userName}</p>
                        <p className="text-sm text-gray-500">Product name</p>
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell className="font-semibold">
                    +212 637 177431
                  </Table.Cell>
                  <Table.Cell className="font-semibold">
                    {user.email}
                  </Table.Cell>

                  <Table.Cell>
                    <div className="flex gap-3 text-lg">
                      <FiEye className="text-blue-500 cursor-pointer" />
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
