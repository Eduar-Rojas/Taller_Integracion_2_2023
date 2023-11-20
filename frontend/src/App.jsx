import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginRegister from "./pages/LoginRegister";
import Principal from "./pages/Principal";
import ContacUs_form from "./pages/ContacUs_form";
import Catalogo from "./pages/Catalogo";
import SushiBuild from "./pages/SushiBuild";
import SobreNosotros from "./pages/SobreNosotros";
import Profile from "./pages/Profile";
import Carro from "./pages/Carro";
import ProtectedRoute from "./Components/ProtectedRoute";
import { useAuth } from "./Components/useAuth";

function App() {
  const {isAuthenticated } = useAuth(); // Esto debería ser proporcionado por el contexto, no como una función

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  console.log(isAuthenticated())
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Principal />} />
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/contacto" element={<ContacUs_form />} />
          <Route path="/carro" element={<Carro />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/nosotros" element={<SobreNosotros />} />

          {/* Utilizar ProtectedRoute como contenedor para las rutas protegidas */}
          <Route path="/" element={<ProtectedRoute isAuthenticated={isAuthenticated} />}  >
            <Route path="/profile" element={<Profile />} />
            <Route path="/personalizarSushi" element={<SushiBuild />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
