import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard({
  onAdminLogout,
  products,
  orders,
  cartItems,
  addProduct,
  deleteProduct,
  updateOrderStatus
}) {
  const [activeSection, setActiveSection] = useState('stats');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    onAdminLogout();
    navigate('/admin-login');
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    if (!name || !price || !image) {
      setMessage('Veuillez remplir tous les champs.');
      return;
    }

    const newProduct = {
      id: Date.now(),
      name,
      price: price + ' DH',
      image
    };

    addProduct(newProduct);

    setName('');
    setPrice('');
    setImage('');
    setMessage('Produit ajouté avec succès !');
  };

  return (
    <div className="admin-dashboard">
      <h2>Dashboard Admin</h2>
      <p>Bienvenue dans l’espace administrateur.</p>

      <div className="dashboard-actions">
        <button onClick={() => setActiveSection('stats')}>Statistiques</button>
        <button onClick={() => setActiveSection('products')}>Produits</button>
        <button onClick={() => setActiveSection('orders')}>Commandes</button>
        <button onClick={() => setActiveSection('addProduct')}>Ajouter Produit</button>
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
            <div className="dashboard-item admin-product-item" key={product.id}>
              <p>{product.name} - {product.price}</p>
              <button
                className="delete-product-btn"
                onClick={() => deleteProduct(product.id)}
              >
                Supprimer
              </button>
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
                <p><strong>Date:</strong> {order.date}</p>
                <p><strong>Total:</strong> {order.total}</p>

                <p>
                  <strong>Statut:</strong>{' '}
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                  >
                    <option value="En attente">En attente</option>
                    <option value="Confirmée">Confirmée</option>
                    <option value="Livrée">Livrée</option>
                  </select>
                </p>

                <p><strong>Nombre de produits:</strong> {order.items.length}</p>
              </div>
            ))
          )}
        </div>
      )}

      {activeSection === 'addProduct' && (
        <div className="admin-container">
          <h3>Ajouter un produit</h3>

          <form className="admin-form" onSubmit={handleAddProduct}>
            <input
              type="text"
              placeholder="Nom du produit"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Prix"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <input
              type="text"
              placeholder="URL de l'image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />

            <button type="submit">Ajouter le produit</button>
          </form>

          {message && <p className="message">{message}</p>}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;