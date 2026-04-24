import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function Navbar() {
  const { theme, toggleTheme, favorites } = useAppContext();
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <span className="logo-ball" />
        <span className="logo-text">PokéDex</span>
      </Link>

      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/items" className="nav-link">Pokémon</Link>
        <Link to="/favorites" className="nav-link">
          Favorites
          {favorites.length > 0 && (
            <span className="fav-count">{favorites.length}</span>
          )}
        </Link>
      </div>

      <div className="nav-actions">
        <button
          className="random-btn"
          onClick={() => navigate(`/items/${Math.ceil(Math.random() * 151)}`)}
          title="Random Pokémon"
        >
          🎲 Random
        </button>
        <button className="theme-btn" onClick={toggleTheme} title="Toggle theme">
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
