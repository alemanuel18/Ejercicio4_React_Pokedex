import { useState, useEffect } from "react";

const BASE_URL = "https://pokeapi.co/api/v2";

export function usePokemonList(limit = 151, offset = 0) {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    async function fetchList() {
      try {
        const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
        if (!res.ok) throw new Error("Failed to fetch pokemon list");
        const data = await res.json();

        const detailed = await Promise.all(
          data.results.map(async (p) => {
            const r = await fetch(p.url);
            const d = await r.json();
            return {
              id: d.id,
              name: d.name,
              types: d.types.map((t) => t.type.name),
              sprite: d.sprites.other["official-artwork"].front_default || d.sprites.front_default,
              stats: {
                hp: d.stats[0].base_stat,
                attack: d.stats[1].base_stat,
                defense: d.stats[2].base_stat,
                speed: d.stats[5].base_stat,
              },
            };
          })
        );

        if (!cancelled) {
          setPokemon(detailed);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      }
    }

    fetchList();
    return () => { cancelled = true; };
  }, [limit, offset]);

  return { pokemon, loading, error };
}

export function usePokemonDetail(idOrName) {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!idOrName) return;
    let cancelled = false;
    setLoading(true);
    setError(null);

    async function fetchDetail() {
      try {
        const res = await fetch(`${BASE_URL}/pokemon/${idOrName}`);
        if (!res.ok) throw new Error("Pokemon not found");
        const d = await res.json();

        const speciesRes = await fetch(d.species.url);
        const species = await speciesRes.json();
        const flavorEntry = species.flavor_text_entries.find((e) => e.language.name === "en");

        if (!cancelled) {
          setPokemon({
            id: d.id,
            name: d.name,
            types: d.types.map((t) => t.type.name),
            sprite: d.sprites.other["official-artwork"].front_default || d.sprites.front_default,
            spriteBack: d.sprites.back_default,
            height: d.height,
            weight: d.weight,
            baseExperience: d.base_experience,
            abilities: d.abilities.map((a) => a.ability.name),
            stats: d.stats.map((s) => ({ name: s.stat.name, value: s.base_stat })),
            moves: d.moves.slice(0, 8).map((m) => m.move.name),
            description: flavorEntry?.flavor_text?.replace(/\f/g, " ") || "No description available.",
            genus: species.genera.find((g) => g.language.name === "en")?.genus || "",
            captureRate: species.capture_rate,
          });
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      }
    }

    fetchDetail();
    return () => { cancelled = true; };
  }, [idOrName]);

  return { pokemon, loading, error };
}
