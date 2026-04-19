import { useState } from 'react';

function Admin({ addProduct }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
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
    <div className="admin-container">
      <h2>Espace Admin</h2>

      <form className="admin-form" onSubmit={handleSubmit}>
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
  );
}

export default Admin;