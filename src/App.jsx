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
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : initialProducts;
  });

  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

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

  const addProduct = (newProduct) => {
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const deleteProduct = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const addOrder = (newOrder) => {
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );

    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
    localStorage.setItem('isAdminLoggedIn', 'true');
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('isAdminLoggedIn');
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
                addProduct={addProduct}
                deleteProduct={deleteProduct}
                updateOrderStatus={updateOrderStatus}
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