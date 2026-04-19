function Cart({ cartItems, removeFromCart }) {
  return (
    <div>
      <h2>Mon Panier</h2>

      {cartItems.length === 0 ? (
        <p>Le panier est vide.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div className="cart-item" key={index}>
              <h3>{item.name}</h3>
              <p>{item.price}</p>
              <button onClick={() => removeFromCart(index)}>
                Supprimer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;