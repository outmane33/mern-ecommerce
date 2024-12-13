import AdminAddProduct from "../components/AdminAddProduct";
import AdminAddUser from "../components/AdminAddUser";
import AdminAllUsers from "../components/AdminAllUsers";
import AdminDashboard from "../components/AdminDashboard";
import AdminHeader from "../components/AdminHeader";
import AdminOders from "../components/AdminOders";
import AdminOrderDetails from "../components/AdminOrderDetails";
import AdminProductList from "../components/AdminProductList";
import AdminSidebar from "../components/AdminSidebar";
import { useParams } from "react-router-dom";

export default function AdminPage() {
  const { content } = useParams();
  const { orderId } = useParams();
  return (
    <div className="flex min-h-screen bg-[#eef3f6]">
      {/* sidebar */}
      <div className="">
        <AdminSidebar />
      </div>
      {/* main */}
      <div className="w-full">
        {/* header */}
        <div className="w-full ">
          <AdminHeader />
        </div>
        {/* content */}
        <div className="w-full p-3">
          {content === "dashboard" && <AdminDashboard />}
          {content === "add-product" && <AdminAddProduct />}
          {content === "list-products" && <AdminProductList />}
          {content === "orders" && <AdminOders />}
          {content === "order-details" && orderId && <AdminOrderDetails />}
          {content === "users" && <AdminAllUsers />}
          {content === "add-user" && <AdminAddUser />}
        </div>
      </div>
    </div>
  );
}
