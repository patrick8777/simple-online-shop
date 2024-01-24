import { useEffect, useState } from "react"
import "./App.css"
import Router from "./routes"
import { api } from "./common/api"
import { useDispatch, useSelector } from "react-redux"
import { login, logout } from "./store/slices/user"

function App() {
  const dispatch = useDispatch()
  const validAccessToken = useSelector((state) => state.user.validAccessToken)

  useEffect(() => {
    const localToken = localStorage.getItem("accessToken")
    if (localToken) {
      api
        .post("/auth/token/verify/", { token: localToken })
        .then(() => dispatch(login(localToken)))
        .catch(() => {
          localStorage.removeItem("accessToken")
          dispatch(logout())
        })
    } else {
      dispatch(logout())
    }
  }, [])

  if (validAccessToken === undefined) {
    return <>Validating...</>
  } else {
    return <Router />
  }
}

export default App
