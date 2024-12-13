import { Sidebar } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiArrowSmRight, HiChartPie } from "react-icons/hi";
import { GiJigsawBox } from "react-icons/gi";
import { FaBasketShopping } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { MdOutlineChair } from "react-icons/md";

export default function AdminSidebar() {
  return (
    <Sidebar className="hidden md:block">
      <Sidebar.Logo>
        <div className="order-1 flex items-center gap-2 pb-5">
          <MdOutlineChair className="text-4xl" />
          <p className="text-2xl font-semibold">Furniture</p>
        </div>
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item as={"div"} icon={HiChartPie} label="outmane">
            <Link to="/admin/dashboard">Dashboard</Link>
          </Sidebar.Item>
          <Sidebar.Collapse icon={FaBasketShopping} label="Products">
            <Sidebar.Item as={"div"}>
              <Link to="/admin/add-product">Add Product</Link>
            </Sidebar.Item>
            <Sidebar.Item as={"div"}>
              <Link to="/admin/list-products">Product List</Link>
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse icon={GiJigsawBox} label="Orders">
            <Sidebar.Item as={"div"}>
              <Link to="/admin/orders">Order List</Link>
            </Sidebar.Item>

            <Sidebar.Item as={"div"}>
              <Link to="/admin/order-details/ksds">Traking Order</Link>
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse icon={FaUsers} label="Users">
            <Sidebar.Item as={"div"}>
              <Link to="/admin/users">All Users</Link>
            </Sidebar.Item>
            <Sidebar.Item as={"div"}>
              <Link to="/admin/add-user">Add New User</Link>
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Item as={"div"} icon={HiArrowSmRight}>
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
