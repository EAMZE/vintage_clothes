import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard({ onAdminLogout, products, orders, cartItems }) {
  const [activeSection, setActiveSection] = useState('stats');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    onAdminLogout();
    navigate('/admin-login');
  };

  return (
    <div className="admin-dashboard">
      <h2>Dashboard Admin</h2>
      <p>Bienvenue dans l’espace administrateur.</p>

      <div className="dashboard-actions">
        <button onClick={() => setActiveSection('stats')}>Statistiques</button>
        <button onClick={() => setActiveSection('products')}>Produits</button>
        <button onClick={() => setActiveSection('orders')}>Commandes</button>
        <button className="logout-btn" onClick={handleLogout}>
          Déconnexion
        </button>
      </div>

      {activeSection === 'stats' && (
        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Produits</h3>
            <p>{products.length}</p>
          </div>

          <div className="stat-card">
            <h3>Commandes</h3>
            <p>{orders.length}</p>
          </div>

          <div className="stat-card">
            <h3>Panier</h3>
            <p>{cartItems.length}</p>
          </div>
        </div>
      )}

      {activeSection === 'products' && (
        <div className="dashboard-section">
          <h3>Liste des produits</h3>
          {products.map((product) => (
            <div className="dashboard-item" key={product.id}>
              <p>{product.name} - {product.price}</p>
            </div>
          ))}
        </div>
      )}

      {activeSection === 'orders' && (
        <div className="dashboard-section">
          <h3>Liste des commandes</h3>
          {orders.length === 0 ? (
            <p>Aucune commande pour le moment.</p>
          ) : (
            orders.map((order) => (
              <div className="dashboard-item" key={order.id}>
                <p><strong>Client:</strong> {order.name}</p>
                <p><strong>Téléphone:</strong> {order.phone}</p>
                <p><strong>Adresse:</strong> {order.address}</p>
                <p><strong>Nombre de produits:</strong> {order.items.length}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;