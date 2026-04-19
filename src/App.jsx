import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import initialProducts from './data/products';

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    localStorage.getItem('isAdminLoggedIn') === 'true'
  );

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (indexToRemove) => {
    const updatedCart = cartItems.filter((item, index) => index !== indexToRemove);
    setCartItems(updatedCart);
  };

  const addOrder = (newOrder) => {
    setOrders([...orders, newOrder]);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
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
        <Route
          path="/admin-login"
          element={<AdminLogin onAdminLogin={handleAdminLogin} />}
        />
        <Route
          path="/admin-dashboard"
          element={
            isAdminLoggedIn ? (
              <AdminDashboard
                onAdminLogout={handleAdminLogout}
                products={products}
                orders={orders}
                cartItems={cartItems}
              />
            ) : (
              <Navigate to="/admin-login" />
            )
          }
        />
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