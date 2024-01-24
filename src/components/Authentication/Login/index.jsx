import { useState } from "react"
import { api } from "../../../common/api"
import { useDispatch } from "react-redux"
import { loadUser, login } from "../../../store/slices/user"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const [email, setEmail] = useState("patrick8777@gmail.com")
  const [password, setPassword] = useState("admin")
  const [loginError, setLoginError] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    setLoginError("")

    try {
      const res = await api.post("/auth/token/", {
        email: email,
        password: password,
      })
      localStorage.setItem("accessToken", res.data.access)
      dispatch(login(res.data.access))
      dispatch(loadUser(res.data.user))
      navigate("/account")
    } catch (error) {
      if (error.response?.data?.detail) {
        setLoginError(error.response.data.detail)
      } else {
        setLoginError("Login failed")
      }
      console.log(error)
    }
  }

  return (
    <>
      <h1>Log in</h1>
      <form onSubmit={(e) => handleLoginSubmit(e)} id="loginForm">
        <input
          type="email"
          placeholder="eMail"
          required
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log in</button>
        <span className="errorMessage">{loginError}</span>
      </form>
    </>
  )
}
