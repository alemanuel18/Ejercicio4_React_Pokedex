import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-ball" />
      <h1 className="not-found-code">404</h1>
      <h2 className="not-found-title">Wild Pokémon Fled!</h2>
      <p className="not-found-desc">This page doesn't exist in the Pokédex.</p>
      <Link to="/" className="btn-primary">Return Home</Link>
    </div>
  );
}

export default NotFound;
