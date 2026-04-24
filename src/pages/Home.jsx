import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function Home() {
  const { favorites } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="home-hero">
        <div className="hero-ball" />
        <div className="hero-content">
          <h1 className="hero-title">
            Gotta Catch<br />
            <span className="hero-accent">Em All</span>
          </h1>
          <p className="hero-desc">
            Explore the original 151 Pokémon. Browse their types, stats, abilities and more.
          </p>
          <div className="hero-actions">
            <Link to="/items" className="btn-primary">Browse Pokédex</Link>
            <button
              className="btn-secondary"
              onClick={() => navigate(`/items/${Math.ceil(Math.random() * 151)}`)}
            >
              🎲 Surprise Me
            </button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat-pill">
            <span className="stat-pill-num">151</span>
            <span className="stat-pill-label">Pokémon</span>
          </div>
          <div className="stat-pill">
            <span className="stat-pill-num">18</span>
            <span className="stat-pill-label">Types</span>
          </div>
          <div className="stat-pill">
            <span className="stat-pill-num">{favorites.length}</span>
            <span className="stat-pill-label">Favorites</span>
          </div>
        </div>
      </div>

      <div className="home-features">
        <div className="feature-card">
          <span className="feature-icon">🔍</span>
          <h3>Search & Filter</h3>
          <p>Find any Pokémon by name or filter by type instantly.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">📊</span>
          <h3>Detailed Stats</h3>
          <p>View base stats, abilities, moves and full species info.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">❤️</span>
          <h3>Favorites</h3>
          <p>Save your favorite Pokémon — persisted across sessions.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
