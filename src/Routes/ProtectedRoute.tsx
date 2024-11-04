import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  condition: boolean;
  redirectPath?: string;
  children: JSX.Element;
}

const ProtectedRoute = ({
  condition,
  redirectPath = "/",
  children,
}: ProtectedRouteProps) => {
    const {user} = useSelector((state:RootState)=>state.user)
  return user&&condition ? children : <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;
