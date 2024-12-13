import { useParams } from "react-router-dom";
import UserSuccessOrder from "../components/UserSuccessOrder";

export default function UserOrder() {
  const { orderId } = useParams();
  return (
    <div>
      <UserSuccessOrder orderId={orderId} />
    </div>
  );
}
