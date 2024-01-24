import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "../layouts/Layout"
import Login from "./Login"
import Account from "./Account"
import NotFound from "../components/NotFound"
import Home from "./Home"
import ProtectedRoute from "../layouts/ProtectedRoute"
import Register from "./Register"
import CardsRoute from "../components/card/index"
import ProductRoute from "../components/Product/index"

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<ProductRoute />} />
          <Route path="/Cards" element={<CardsRoute />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Validation" element={<Validation />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/account" element={<Account />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
