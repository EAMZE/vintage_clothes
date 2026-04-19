import { useState } from 'react';

function Checkout({ cartItems, addOrder, clearCart }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

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
      items: cartItems
    };

    addOrder(newOrder);
    clearCart();

    setName('');
    setPhone('');
    setAddress('');
    setMessage('Commande confirmée avec succès !');
  };

  return (
    <div className="checkout-container">
      <h2>Passer une commande</h2>

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
    </div>
  );
}

export default Checkout;