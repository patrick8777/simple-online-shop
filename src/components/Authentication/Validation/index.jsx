import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useApiRequest } from "../../../common/useApiReguest"

const Validation = () => {
  const [user, setUser] = useState({})
  const { sendRequest, data, error, isLoading } = useApiRequest()
  const navigate = useNavigate()

  const inputHandler = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value })
  }

  const registerUser = (e) => {
    e.preventDefault()
    sendRequest("patch", "auth/registration/validation/", user)
  }

  useEffect(() => {
    if (data === "success") {
      navigate("/login")
    }

    return () => {}
  }, [data, navigate])

  return (
    <div className="card-container login-wrapper">
      <div className="input-container">
        <input
          type="password"
          id="password_repeat"
          placeholder={"Repeat Password"}
          onChange={inputHandler}
        />
        {error?.password_repeat && (
          <p className="error-message">{error.password_repeat}</p>
        )}
      </div>
      <div className="input-container">
        <input
          type="text"
          id="code"
          placeholder={"Validation Code"}
          onChange={inputHandler}
        />
        {error?.code && <p className="error-message">{error.code}</p>}
      </div>
      <div className="input-container">
        <input
          type="submit"
          value={"Create Account"}
          onClick={registerUser}
          disabled={isLoading}
        />
        <p className="error-message">{error?.detail}</p>
        {isLoading && <p>Request is being processed</p>}
      </div>
    </div>
  )
}

export default Validation
