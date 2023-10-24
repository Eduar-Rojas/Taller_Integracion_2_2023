import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer";
import Form_Contact from "../Components/Form_Contact";

export function ContactUsForm() {
  return (
    <div className="grid grid-cols-1 gap-4 bg-black">
        <div className="col-span-1"><Header/></div>
        <div ><Form_Contact/></div>
        <div className="col-span-1"><Footer/></div>
    </div>
    
    
  );
}

export default ContactUsForm;