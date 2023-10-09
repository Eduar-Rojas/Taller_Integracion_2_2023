import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { LoginRegister } from './pages/LoginRegister'
import  {Principal}  from './pages/Principal'
import ContacUs_form from './pages/ContacUs_form'
import Carro from './pages/Carro'
import Catalogo from './pages/Catalogo'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/contacto" element={<ContacUs_form />} />
        <Route path="/carro" element={<Carro />} />
        <Route path="/catalogo" element={<Catalogo />} />
      </Routes>
    </Router>
  )
}

export default App
