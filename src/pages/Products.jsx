import ProductCard from '../components/ProductCard';

function Products({ products, addToCart }) {
  return (
    <div>
      <h2>Nos Produits</h2>

      <div className="products-container">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;