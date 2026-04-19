import { Link } from 'react-router-dom';

function Navbar({ cartCount }) {
  return (
    <nav>
      <ul>
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/products">Produits</Link></li>
        <li><Link to="/orders">Commandes</Link></li>
        <li><Link to="/cart">Panier ({cartCount})</Link></li>
        <li><Link to="/checkout">Checkout</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;