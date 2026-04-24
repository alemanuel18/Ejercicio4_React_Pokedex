import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Detail from "./pages/Detail";
import Items from "./pages/Items";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/items" element={<Items />} />
            <Route path="/items/:id" element={<Detail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
