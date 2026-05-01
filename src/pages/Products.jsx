import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { addProduct, fetchProducts } from '../service/products-v1';
import { data } from 'react-router-dom';

function Products({ products, addToCart }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [productList, setProductList] = useState([])

    useEffect(() => {
      // fetch('http://localhost:3001/products')
      //   .then(res => res.json())
      //   .then(data => {
      //     console.log(data);
          
      //     setProductList(data);

      //   });

      fetchData();

        
    }, []);

    const fetchData = () => {
      fetchProducts().then(res => {
        setProductList(res.data)
        
      })
    }


    const handleAddP = () => {
      const product = {
        name: "Berrad V1",
        price: 15,
        quantity: 100,
        image: "https://live.staticflickr.com/7102/7153551343_871066df7d_b.jpg"
      }

      addProduct(product).then(res => {
        console.log(res);
        fetchData();
        
      })
    }
    



  const filteredProducts = productList.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const numericPrice = parseInt(product.price);

    let matchesPrice = true;

    if (priceFilter === 'less200') {
      matchesPrice = numericPrice < 200;
    } else if (priceFilter === 'between200and300') {
      matchesPrice = numericPrice >= 200 && numericPrice <= 300;
    } else if (priceFilter === 'more300') {
      matchesPrice = numericPrice > 300;
    }

    return matchesSearch && matchesPrice;
  });

  return (
    <div>
      <h2>Nos Produits</h2>

      <div className="search-container">
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="filter-container">
        <select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        >
          <option value="all">Tous les prix</option>
          <option value="less200">Moins de 200 DH</option>
          <option value="between200and300">Entre 200 et 300 DH</option>
          <option value="more300">Plus de 300 DH</option>
        </select>
      </div>
      <button type="button" onClick={handleAddP}>Add</button>

      <div className="products-container">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))
        ) : (
          <p>Aucun produit trouvé.</p>
        )}
      </div>
    </div>
  );
}

export default Products;