import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function Favorites() {
  const { favorites, toggleFavorite } = useAppContext();

  if (favorites.length === 0) {
    return (
      <div className="empty-page">
        <span className="empty-icon">🌟</span>
        <h2>No Favorites Yet</h2>
        <p>Browse the Pokédex and heart the ones you love!</p>
        <Link to="/items" className="btn-primary">Go to Pokédex</Link>
      </div>
    );
  }

  return (
    <div className="items-page">
      <div className="items-header">
        <h1 className="items-title">Your Favorites</h1>
        <p className="items-sub">{favorites.length} Pokémon saved</p>
      </div>
      <div className="favorites-list">
        {favorites.map((p) => (
          <div key={p.id} className="fav-row">
            <Link to={`/items/${p.id}`} className="fav-row-link">
              <span className="fav-row-id">#{String(p.id).padStart(3, "0")}</span>
              <span className="fav-row-name">{p.name}</span>
            </Link>
            <button className="fav-remove-btn" onClick={() => toggleFavorite(p)}>
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
