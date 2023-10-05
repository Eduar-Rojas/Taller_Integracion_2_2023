import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { LoginRegister } from './pages/LoginRegister'
import  {Principal}  from './pages/Principal'
import ContacUs_form from './pages/ContacUs_form'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/Contacto" element={<ContacUs_form />} />
      </Routes>
    </Router>
  )
}

export default App
