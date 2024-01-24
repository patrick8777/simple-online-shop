import { useState } from 'react'
import axios from 'axios'

const useApiRequest = () => {
  axios.defaults.baseURL = 'https://motion.propulsion-home.ch/backend/api'

  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const sendRequest = (method, url, data) => {
    setIsLoading(true)
    axios({ method, url, data })
      .then((response) => {
        setError(null)
        if (response.data) {
          return setData(response.data)
        }
        return setData('success')
      })
      .catch((error) => {
        return setError(error.response.data)
      })
      .finally(() => setIsLoading(false))
  }

  return { sendRequest, data, error, isLoading }
}

export default useApiRequest