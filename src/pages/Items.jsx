import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { usePokemonList } from "../hooks/usePokemon";
import PokemonCard from "../components/PokemonCard";
import TypeBadge from "../components/TypeBadge";
import { TYPE_COLORS } from "../data/typeConfig";

const ALL_TYPES = Object.keys(TYPE_COLORS);

function Items() {
  const { pokemon, loading, error } = usePokemonList(151);
  const [search, setSearch] = useState("");
  const [activeTypes, setActiveTypes] = useState([]);
  const navigate = useNavigate();

  const toggleType = (type) => {
    setActiveTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const filtered = useMemo(() => {
    return pokemon.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchType =
        activeTypes.length === 0 || activeTypes.every((t) => p.types.includes(t));
      return matchSearch && matchType;
    });
  }, [pokemon, search, activeTypes]);

  if (error) return <div className="error-state">⚠️ {error}</div>;

  return (
    <div className="items-page">
      <div className="items-header">
        <h1 className="items-title">Pokédex</h1>
        <p className="items-sub">
          {loading ? "Loading..." : `${filtered.length} of 151 Pokémon`}
        </p>
      </div>

      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <button
          className="random-btn-inline"
          onClick={() => navigate(`/items/${Math.ceil(Math.random() * 151)}`)}
        >
          🎲
        </button>
      </div>

      <div className="type-filters">
        {ALL_TYPES.map((t) => (
          <button
            key={t}
            className={`type-filter-btn ${activeTypes.includes(t) ? "active" : ""}`}
            onClick={() => toggleType(t)}
          >
            <TypeBadge type={t} size="sm" />
          </button>
        ))}
        {activeTypes.length > 0 && (
          <button className="clear-filters" onClick={() => setActiveTypes([])}>
            Clear ✕
          </button>
        )}
      </div>

      {loading ? (
        <div className="loading-grid">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="skeleton-card" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <span>😶</span>
          <p>No Pokémon found. Try a different search.</p>
        </div>
      ) : (
        <div className="pokemon-grid">
          {filtered.map((p) => (
            <PokemonCard
              key={p.id}
              id={p.id}
              name={p.name}
              types={p.types}
              sprite={p.sprite}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Items;
