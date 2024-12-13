import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";
import UserOrder from "./pages/UserOrder";
import LayoutForAdmin from "./components/LayoutForAdmin";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutForAdmin />}>
            <Route path="/admin/:content" element={<AdminPage />} />
            <Route path="/admin/:content/:orderId" element={<AdminPage />} />
          </Route>
          <Route path="/shop" element={<UserPage />} />
          <Route path="/shop/:content" element={<UserPage />} />
          <Route path="/shop/:content/:category" element={<UserPage />} />
          <Route path="/order/:orderId" element={<UserOrder />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
