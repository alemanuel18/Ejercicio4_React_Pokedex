import PropTypes from "prop-types";
import { TYPE_COLORS } from "../data/typeConfig";

/**
 * TypeBadge - Displays a Pokemon type badge with matching color
 *
 * Props:
 * - type (string, required): The Pokemon type name (e.g. "fire", "water")
 * - size ("sm" | "md" | "lg"): Badge size variant. Default: "md"
 * - onClick (func): Optional click handler
 */
function TypeBadge({ type, size = "md", onClick }) {
  const bg = TYPE_COLORS[type] || "#aaa";

  const sizes = {
    sm: { fontSize: "0.65rem", padding: "2px 8px", borderRadius: "20px" },
    md: { fontSize: "0.75rem", padding: "4px 12px", borderRadius: "20px" },
    lg: { fontSize: "0.9rem", padding: "6px 18px", borderRadius: "24px" },
  };

  return (
    <span
      onClick={onClick}
      style={{
        background: bg,
        color: "#fff",
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        cursor: onClick ? "pointer" : "default",
        display: "inline-block",
        textShadow: "0 1px 2px rgba(0,0,0,0.3)",
        userSelect: "none",
        transition: "transform 0.15s, filter 0.15s",
        ...sizes[size],
      }}
      onMouseEnter={(e) => onClick && (e.target.style.filter = "brightness(1.15)")}
      onMouseLeave={(e) => onClick && (e.target.style.filter = "brightness(1)")}
    >
      {type}
    </span>
  );
}

TypeBadge.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  onClick: PropTypes.func,
};

export default TypeBadge;
