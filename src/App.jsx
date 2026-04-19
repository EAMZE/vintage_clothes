import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Admin from './pages/Admin';
import Orders from './pages/Orders';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import initialProducts from './data/products';

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (indexToRemove) => {
    const updatedCart = cartItems.filter((item, index) => index !== indexToRemove);
    setCartItems(updatedCart);
  };

  const addProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const addOrder = (newOrder) => {
    setOrders([...orders, newOrder]);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div>
      <h1>Vintage Clothes</h1>

      <Navbar cartCount={cartItems.length} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/products"
          element={<Products products={products} addToCart={addToCart} />}
        />
        <Route path="/admin" element={<Admin addProduct={addProduct} />} />
        <Route path="/orders" element={<Orders orders={orders} />} />
        <Route
          path="/cart"
          element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />}
        />
        <Route
          path="/checkout"
          element={
            <Checkout
              cartItems={cartItems}
              addOrder={addOrder}
              clearCart={clearCart}
            />
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;