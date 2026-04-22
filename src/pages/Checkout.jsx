import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Checkout({ cartItems, addOrder, clearCart }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [orderValidated, setOrderValidated] = useState(false);
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((total, item) => {
    return total + parseInt(item.price);
  }, 0);

  const itemCount = cartItems.length;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      setMessage('Votre panier est vide.');
      return;
    }

    if (!name || !phone || !address) {
      setMessage('Veuillez remplir tous les champs.');
      return;
    }

    const newOrder = {
      id: Date.now(),
      name,
      phone,
      address,
      items: cartItems,
      status: 'En attente',
      date: new Date().toLocaleDateString(),
      total: totalPrice + ' DH'
    };

    addOrder(newOrder);
    clearCart();

    setName('');
    setPhone('');
    setAddress('');
    setMessage('');
    setOrderValidated(true);
  };

  return (
    <div className="checkout-container">
      <h2>Passer une commande</h2>

      {orderValidated ? (
        <div className="success-box">
          <h3>Commande confirmée avec succès !</h3>
          <p>Merci pour votre achat chez Vintage Clothes.</p>
          <p><strong>Nombre d’articles:</strong> {itemCount}</p>
          <p><strong>Total payé:</strong> {totalPrice} DH</p>

          <div className="success-actions">
            <button onClick={() => navigate('/')}>Retour à l’accueil</button>
            <button onClick={() => navigate('/products')}>Voir les produits</button>
          </div>
        </div>
      ) : (
        <>
          <div className="checkout-total">
            <h3>Total à payer: {totalPrice} DH</h3>
          </div>

          <form className="checkout-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nom complet"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Téléphone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <textarea
              placeholder="Adresse"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>

            <button type="submit">Confirmer la commande</button>
          </form>

          {message && <p className="message">{message}</p>}
        </>
      )}
    </div>
  );
}

export default Checkout;