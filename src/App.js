import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/Navbar";
import useWeb3 from "./hooks/useWeb3";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";

function App() {
  const { setWalletListeners } = useWeb3();

  useEffect(() => {
    setWalletListeners();
  }, []);

  return (
    <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/favorites" exact element={<Favorites />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
