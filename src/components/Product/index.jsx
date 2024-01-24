import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { setProducts } from "../../store/slices/productSlice"

function Product() {
  const dispatch = useDispatch()
  const products = useSelector((store) => store.product.productList)
  console.log("Product: ", products)

  const fetchData = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products")
      const data = await res.json()
      /*  console.log("From Fetch", data) */
      dispatch(setProducts(data.products))
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="products">
      <h2>Our Products: </h2>

      {products.map((product) => (
        <div className="product-pet" key={product.id}>
          {product.title}
        </div>
      ))}
    </div>
  )
}

export default Product
