import "./App.css"
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom"

import CharacterList from "./components/CharacterList"
import FavoritesCharacterList from "./components/FavoritesCharacterList"
import { Button } from "./components/ui/button"
import { FavoritesProvider } from "./contexts/useFavorites"
import { FiltersProvider } from "./contexts/useFilters"
import { cn } from "./lib/utils"

function App() {
  return (
    <FavoritesProvider>
      <FiltersProvider>
        <BrowserRouter>
          <div className="flex min-h-screen flex-col">
            <header className="border-b bg-background/80 backdrop-blur">
              <nav className="container flex items-center justify-between py-4">
                <NavLink to="/" className="text-xl font-semibold">
                  Rick & Morty
                </NavLink>
                <div className="flex items-center gap-2">
                  <Button asChild variant="ghost">
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        cn(
                          "text-sm font-medium transition-colors hover:text-primary",
                          isActive ? "text-primary" : "text-muted-foreground",
                        )
                      }
                    >
                      Personajes
                    </NavLink>
                  </Button>
                  <Button asChild variant="ghost">
                    <NavLink
                      to="/favorites"
                      className={({ isActive }) =>
                        cn(
                          "text-sm font-medium transition-colors hover:text-primary",
                          isActive ? "text-primary" : "text-muted-foreground",
                        )
                      }
                    >
                      Favoritos
                    </NavLink>
                  </Button>
                </div>
              </nav>
            </header>
            <main className="container flex-1 py-8">
              <Routes>
                <Route path="/" element={<CharacterList />} />
                <Route path="/favorites" element={<FavoritesCharacterList />} />
                <Route path="*" element={<p>Not Found</p>} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </FiltersProvider>
    </FavoritesProvider>
  )
}

export default App
