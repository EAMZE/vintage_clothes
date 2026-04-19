function Orders({ orders }) {
  return (
    <div>
      <h2>Gestion des Commandes</h2>

      {orders.length === 0 ? (
        <p>Aucune commande pour le moment.</p>
      ) : (
        <div className="orders-container">
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <h3>{order.name}</h3>
              <p><strong>Téléphone:</strong> {order.phone}</p>
              <p><strong>Adresse:</strong> {order.address}</p>
              <p><strong>Produits:</strong> {order.items.length}</p>

              <div>
                {order.items.map((item, index) => (
                  <p key={index}>
                    {item.name} - {item.price}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;