import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import Details from "./pages/Details";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
  const cachedCart = window.localStorage.getItem("cart");
  const [cart, setCart] = useState([]);

  function handleAddToCart(item) {
    const currentIndex = cart.length;
    const newCart = [...cart, { id: currentIndex + 1, item }];
    setCart(newCart);
    window.localStorage.setItem("cart", JSON.stringify(newCart));
  }
  function handleRemoveCartItem(e, id) {
    const revisedCart = cart.filter(function (item) {
      return item.id !== id;
    });
    setCart(revisedCart);
    window.localStorage.setItem("cart", JSON.stringify(revisedCart));
  }

  useEffect(() => {
    console.info("useEffect for localStorage");
    if (cachedCart !== null) {
      setCart(JSON.parse(cachedCart));
    }
  }, [cachedCart]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home cart={cart} />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/details/:id"
          element={<Details handleAddToCart={handleAddToCart} cart={cart} />}
        />
        <Route
          path="/cart"
          element={
            <Cart cart={cart} handleRemoveCartItem={handleRemoveCartItem} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
