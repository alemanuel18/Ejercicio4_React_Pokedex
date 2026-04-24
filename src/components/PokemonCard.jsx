import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TypeBadge from "./TypeBadge";
import { useAppContext } from "../context/AppContext";
import { TYPE_GRADIENTS } from "../data/typeConfig";

/**
 * PokemonCard - Card component for displaying a Pokemon in the list
 *
 * Props:
 * - id (number, required): Pokemon ID
 * - name (string, required): Pokemon name
 * - types (arrayOf string, required): Array of type names
 * - sprite (string): URL to the official artwork
 */
function PokemonCard({ id, name, types, sprite }) {
  const { isFavorite, toggleFavorite } = useAppContext();
  const fav = isFavorite(id);
  const gradient = TYPE_GRADIENTS[types[0]] || TYPE_GRADIENTS.normal;

  return (
    <Link to={`/items/${id}`} style={{ textDecoration: "none" }}>
      <div className="pokemon-card" style={{ "--card-gradient": gradient }}>
        <button
          className={`fav-btn ${fav ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite({ id, name });
          }}
          title={fav ? "Remove from favorites" : "Add to favorites"}
        >
          {fav ? "♥" : "♡"}
        </button>

        <span className="pokemon-id">#{String(id).padStart(3, "0")}</span>

        <div className="card-img-wrap">
          {sprite ? (
            <img src={sprite} alt={name} className="card-sprite" loading="lazy" />
          ) : (
            <div className="no-sprite">?</div>
          )}
        </div>

        <div className="card-info">
          <h3 className="card-name">{name}</h3>
          <div className="card-types">
            {types.map((t) => (
              <TypeBadge key={t} type={t} size="sm" />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

PokemonCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  types: PropTypes.arrayOf(PropTypes.string).isRequired,
  sprite: PropTypes.string,
};

export default PokemonCard;
