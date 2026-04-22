import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="hero">
        <h2>Bienvenue chez Vintage Clothes</h2>
        <p>
          Découvrez notre collection unique de vêtements vintage pour un style
          élégant, original et intemporel.
        </p>
        <button onClick={() => navigate('/products')}>
          Explorer les produits
        </button>
      </div>
    </div>
  );
}

export default Home;