import { useParams, useNavigate, Link } from "react-router-dom";
import { usePokemonDetail } from "../hooks/usePokemon";
import { useAppContext } from "../context/AppContext";
import TypeBadge from "../components/TypeBadge";
import StatBar from "../components/StatBar";
import { TYPE_GRADIENTS } from "../data/typeConfig";

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useAppContext();
  const { pokemon, loading, error } = usePokemonDetail(id);

  if (loading) {
    return (
      <div className="detail-loading">
        <div className="pokeball-spinner" />
        <p>Loading Pokémon data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <h2>Pokémon not found</h2>
        <p>{error}</p>
        <Link to="/items" className="btn-primary">Back to Pokédex</Link>
      </div>
    );
  }

  if (!pokemon) return null;

  const fav = isFavorite(pokemon.id);
  const gradient = TYPE_GRADIENTS[pokemon.types[0]] || TYPE_GRADIENTS.normal;

  return (
    <div className="detail-page">
      <div className="detail-hero" style={{ background: gradient }}>
        <div className="detail-nav">
          <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
          <div className="detail-nav-arrows">
            {pokemon.id > 1 && (
              <button className="arrow-btn" onClick={() => navigate(`/items/${pokemon.id - 1}`)}>
                ◀ #{String(pokemon.id - 1).padStart(3, "0")}
              </button>
            )}
            {pokemon.id < 151 && (
              <button className="arrow-btn" onClick={() => navigate(`/items/${pokemon.id + 1}`)}>
                #{String(pokemon.id + 1).padStart(3, "0")} ▶
              </button>
            )}
          </div>
        </div>

        <div className="detail-hero-content">
          <div className="detail-hero-text">
            <span className="detail-id">#{String(pokemon.id).padStart(3, "0")}</span>
            <h1 className="detail-name">{pokemon.name}</h1>
            <p className="detail-genus">{pokemon.genus}</p>
            <div className="detail-types">
              {pokemon.types.map((t) => <TypeBadge key={t} type={t} size="lg" />)}
            </div>
          </div>
          <div className="detail-sprite-wrap">
            <img src={pokemon.sprite} alt={pokemon.name} className="detail-sprite" />
          </div>
        </div>
      </div>

      <div className="detail-body">
        <div className="detail-card">
          <h2 className="section-title">About</h2>
          <p className="detail-description">{pokemon.description}</p>

          <div className="detail-info-grid">
            <div className="info-item">
              <span className="info-label">Height</span>
              <span className="info-value">{(pokemon.height / 10).toFixed(1)} m</span>
            </div>
            <div className="info-item">
              <span className="info-label">Weight</span>
              <span className="info-value">{(pokemon.weight / 10).toFixed(1)} kg</span>
            </div>
            <div className="info-item">
              <span className="info-label">Base XP</span>
              <span className="info-value">{pokemon.baseExperience}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Capture Rate</span>
              <span className="info-value">{pokemon.captureRate}</span>
            </div>
          </div>
        </div>

        <div className="detail-card">
          <h2 className="section-title">Abilities</h2>
          <div className="abilities-list">
            {pokemon.abilities.map((a) => (
              <span key={a} className="ability-tag">{a.replace("-", " ")}</span>
            ))}
          </div>
        </div>

        <div className="detail-card">
          <h2 className="section-title">Base Stats</h2>
          <div className="stats-list">
            {pokemon.stats.map((s) => (
              <StatBar key={s.name} statName={s.name} value={s.value} />
            ))}
          </div>
        </div>

        <div className="detail-card">
          <h2 className="section-title">Moves</h2>
          <div className="moves-list">
            {pokemon.moves.map((m) => (
              <span key={m} className="move-tag">{m.replace(/-/g, " ")}</span>
            ))}
          </div>
        </div>

        <button
          className={`fav-big-btn ${fav ? "active" : ""}`}
          onClick={() => toggleFavorite({ id: pokemon.id, name: pokemon.name })}
        >
          {fav ? "♥ Remove from Favorites" : "♡ Add to Favorites"}
        </button>
      </div>
    </div>
  );
}

export default Detail;
