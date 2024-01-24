import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

export default function ProtectedRoute() {
  const isLoggedIn = useSelector((state) => state.user.validAccessToken)
  if (isLoggedIn) {
    return <Outlet />
  } else {
    return <Navigate to="/login" />
  }
}
