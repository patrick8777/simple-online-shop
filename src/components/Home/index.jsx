import React from "react"
import { Link } from "react-router-dom"
import Cards from "../card/index"

function Home() {
  return (
    <>
      <Link to="/cards">
        <button>Go to Card</button>
      </Link>

      <Cards title="Shopping Cart Preview" />
    </>
  )
}
export default Home
