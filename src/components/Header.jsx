import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import { logout } from "../store/slices/user"

export default function Header() {
  const isLoggedIn = useSelector((state) => state.user.validAccessToken)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem("accessToken")
    navigate("/login")
  }

  return (
    <header>
      <nav>
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/product"}>Product</NavLink>
        <NavLink to={"/cards"}>Cards</NavLink>
        <NavLink to={"/account"}>Account</NavLink>
        {isLoggedIn ? (
          <a onClick={handleLogout}>Logout</a>
        ) : (
          <NavLink to={"/login"}>Login</NavLink>
        )}
      </nav>
    </header>
  )
}
