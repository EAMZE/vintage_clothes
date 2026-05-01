function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price}</p>
      <p>En stock: {product.quantity}</p>
      <button onClick={() => addToCart(product)}>
        Ajouter au panier
      </button>
    </div>
  );
}

export default ProductCard;