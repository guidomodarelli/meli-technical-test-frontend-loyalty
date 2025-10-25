import './App.css'
import CharacterList from "./components/CharacterList"
import FavoritesCharacterList from "./components/FavoritesCharacterList"
import { FavoritesProvider } from "./contexts/useFavorites"
import { FiltersProvider } from "./contexts/useFilters"
import { BrowserRouter, Route, Routes, Link } from "react-router-dom"

function App() {
  return (
    <FavoritesProvider>
      <FiltersProvider>
        <BrowserRouter>
          <header>
            <nav style={{ display: 'flex', gap: 12, padding: 12 }}>
              <Link to="/">Personajes</Link>
              <Link to="/favorites">Favoritos</Link>
            </nav>
          </header>
          <main>
            <Routes>
              <Route path="/" element={<CharacterList />} />
              <Route path="/favorites" element={<FavoritesCharacterList />} />
              <Route path="*" element={<p>Not Found</p>} />
            </Routes>
          </main>
        </BrowserRouter>
      </FiltersProvider>
    </FavoritesProvider>
  )
}

export default App
