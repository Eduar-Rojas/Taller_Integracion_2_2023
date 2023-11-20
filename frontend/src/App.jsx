import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import  LoginRegister  from './pages/LoginRegister'
import  {Principal}  from './pages/Principal'
import ContacUs_form from './pages/ContacUs_form'
import Carro from './pages/Carro'
import Catalogo from './pages/Catalogo'
import SushiBuild from './pages/SushiBuild';
import SobreNosotros from './pages/SobreNosotros';
import Profile from './pages/Profile'
import { CartShopping } from './Components/CartShopping';
import AdminPedidos from './pages/AdminPedidos';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/contacto" element={<ContacUs_form />} />
        <Route path="/carro" element={<CartShopping />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/personalizarSushi" element={<SushiBuild />} />
        <Route path="/nosotros" element={<SobreNosotros />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/AdminPedidos" element={<AdminPedidos />} />
      </Routes>
    </Router>
  )
}

export default App
