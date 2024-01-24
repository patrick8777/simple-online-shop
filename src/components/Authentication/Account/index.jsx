import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { api } from "../../../common/api"
import { loadUser } from "../../../store/slices/user"

export default function Account() {
  const validAccessToken = useSelector((state) => state.user.validAccessToken)
  const dispatch = useDispatch()
  const userDetails = useSelector((state) => state.user.userDetails)

  const fetchUser = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${validAccessToken}`,
        },
      }

      const res = await api.get("/users/me/", config)

      dispatch(loadUser(res.data))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // load my user
    fetchUser()
  }, [])

  if (!userDetails) {
    return <>Loading...</>
  } else {
    return (
      <>
        <h1>Hello, {userDetails.first_name}!</h1>
        <p>
          Your username is "{userDetails.username}", and your eMail is "
          {userDetails.email}".
        </p>
      </>
    )
  }
}
