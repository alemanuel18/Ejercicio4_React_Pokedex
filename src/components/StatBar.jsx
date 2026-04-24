import PropTypes from "prop-types";
import { STAT_COLORS } from "../data/typeConfig";

/**
 * StatBar - Displays a single Pokemon stat as an animated progress bar
 *
 * Props:
 * - statName (string, required): The stat identifier (e.g. "hp", "attack")
 * - value (number, required): The stat value (0-255)
 * - max (number): Maximum possible value. Default: 255
 */
function StatBar({ statName, value, max = 255 }) {
  const color = STAT_COLORS[statName] || "#aaa";
  const pct = Math.round((value / max) * 100);

  const labels = {
    hp: "HP",
    attack: "ATK",
    defense: "DEF",
    "special-attack": "SP.ATK",
    "special-defense": "SP.DEF",
    speed: "SPD",
  };

  return (
    <div className="stat-bar-row">
      <span className="stat-label">{labels[statName] || statName}</span>
      <span className="stat-value">{value}</span>
      <div className="stat-track">
        <div
          className="stat-fill"
          style={{
            width: `${pct}%`,
            background: color,
          }}
        />
      </div>
    </div>
  );
}

StatBar.propTypes = {
  statName: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  max: PropTypes.number,
};

export default StatBar;
