import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin({ onAdminLogin }) {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const adminPassword = 'admin123';

    if (password === adminPassword) {
      localStorage.setItem('isAdminLoggedIn', 'true');
      onAdminLogin();
      setMessage('');
      navigate('/admin-dashboard');
    } else {
      setMessage('Mot de passe incorrect');
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Connexion Admin</h2>

      <form className="admin-login-form" onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Entrez le mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Se connecter</button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default AdminLogin;