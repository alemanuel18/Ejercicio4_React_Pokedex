# PokéDex App — React Router v6

> Proyecto de práctica con React + React Router DOM v6, consumiendo la [PokéAPI](https://pokeapi.co/)).

**Nivel objetivo: Senior**

---

## Cómo correr el proyecto

### Requisitos

- Node.js 18+
- npm 9+

### Instalación

```bash
git clone https://github.com/alemanuel18/Ejercicio4_React_Pokedex.git
cd pokedex-app
npm install
npm run dev
```

Abre http://localhost:5173 en tu navegador.

### Build para producción

```bash
npm run build
npm run preview
```

---

## Estructura del proyecto

```
src/
├── components/
│   ├── Navbar.jsx          # Navegación con Link + botón random
│   ├── PokemonCard.jsx     # Tarjeta de Pokémon (con PropTypes)
│   ├── StatBar.jsx         # Barra de estadísticas animada (con PropTypes)
│   └── TypeBadge.jsx       # Badge de tipo con color (con PropTypes)
├── context/
│   └── AppContext.jsx      # Context API: tema + favoritos
├── data/
│   └── typeConfig.js       # Colores y gradientes por tipo
├── hooks/
│   └── usePokemon.js       # Custom hooks para PokéAPI
├── pages/
│   ├── Home.jsx            # Ruta /
│   ├── Items.jsx           # Ruta /items
│   ├── Detail.jsx          # Ruta /items/:id
│   ├── Favorites.jsx       # Ruta /favorites
│   └── NotFound.jsx        # Ruta * (404)
├── App.jsx
└── index.css
```

---

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Home con estadísticas y acceso rápido |
| `/items` | Listado de 151 Pokémon con búsqueda y filtros |
| `/items/:id` | Detalle completo del Pokémon (usa useParams) |
| `/favorites` | Lista de favoritos guardados |
| `*` | Página 404 |

---

## Checklist de requerimientos

### Base (Junior)
- [x] Proyecto generado con npm create vite@latest
- [x] react-router-dom v6
- [x] Mínimo 3 rutas: /, /items, /items/:id
- [x] Datos en espacio separado (hooks + data layer)
- [x] useParams en página de detalle
- [x] Navegación con Link

### Mid
- [x] Página 404 para rutas no encontradas
- [x] Búsqueda por nombre en el listado
- [x] Filtro por tipo en el listado
- [x] Botón "Pokémon aleatorio" con useNavigate
- [x] Componentes reutilizables con props documentadas

### Senior
- [x] Context API — tema claro/oscuro + favoritos (persistidos en localStorage)
- [x] PropTypes en 3+ componentes: PokemonCard, TypeBadge, StatBar
- [x] API externa — PokéAPI (REST, sin clave de API)

---

## Componentes reutilizables

### TypeBadge

| Prop | Tipo | Requerido | Default | Descripción |
|------|------|-----------|---------|-------------|
| type | string | sí | — | Nombre del tipo (e.g. "fire") |
| size | "sm" / "md" / "lg" | no | "md" | Tamaño del badge |
| onClick | func | no | — | Handler de click |

### PokemonCard

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| id | number | sí | ID del Pokémon |
| name | string | sí | Nombre |
| types | string[] | sí | Array de tipos |
| sprite | string | no | URL del artwork |

### StatBar

| Prop | Tipo | Requerido | Default | Descripción |
|------|------|-----------|---------|-------------|
| statName | string | sí | — | Identificador de stat (e.g. "hp") |
| value | number | sí | — | Valor (0–255) |
| max | number | no | 255 | Máximo para el porcentaje |

---

## Stack

- React 18 + Vite
- React Router DOM v6
- prop-types
- PokéAPI (https://pokeapi.co/)
