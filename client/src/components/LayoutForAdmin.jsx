import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function LayoutForAdmin() {
  const user = useSelector((state) => state.auth.user);
  return (
    <>{user.role === "admin" ? <Outlet /> : <Navigate to="/shop/listing" />}</>
  );
}
