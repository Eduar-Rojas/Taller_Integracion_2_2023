import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer";
import { Form_LR } from "../Components/Form_LR";

const LoginRegister = () => {
  return (
    <div className="grid grid-cols-1 bg-black">
        <div className="col-span-1"><Form_LR/></div>
        <div className="col-span-1"><Footer/></div>
    </div>
    
  )
}

export default LoginRegister;
