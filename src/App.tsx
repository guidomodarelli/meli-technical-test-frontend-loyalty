import './App.css'
import CharacterList from "./components/CharacterList"
import { FavoriteContext, useFavorites } from "./contexts/useFavorites"
import {BrowserRouter, Route, Routes} from "react-router"

function App() {
  const {favorites, addFavorite, removeFavorite, toggleFavorite } = useFavorites()

  return (
    <FavoriteContext.Provider value={{favorites, addFavorite, removeFavorite, toggleFavorite}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CharacterList />} />
          <Route path="/favorites" element={<CharacterList onlyFavs />} />
          <Route path="*" element={<p>Not Found</p>} />
        </Routes>
      </BrowserRouter>
    </FavoriteContext.Provider>
  )
}

export default App
