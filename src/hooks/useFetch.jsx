import { useState, useEffect } from "react"

const useFetch = (endpoint) => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const apiUrl = `https://dummyjson.com/product${endpoint}`
        const res = await fetch(apiUrl)

        if (res.status === 200) {
          const result = await res.json()
          setData(result.products || [])
        } else {
          throw new Error(`Error: ${res.status}`)
        }
      } catch (error) {
        console.error("Fetch Error:", error.message)
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [endpoint])

  return { data, loading, error }
}

export default useFetch
/* 
fetch('https://dummyjson.com/carts/add', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 1,
    products: [
      {
        id: 1,
        quantity: 1,
      },
      {
        id: 50,
        quantity: 2,
      },
    ]
  })
})
.then(res => res.json())
.then(console.log);
             */
