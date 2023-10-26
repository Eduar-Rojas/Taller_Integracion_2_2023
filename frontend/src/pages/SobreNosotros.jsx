import {Header} from '../Components/Header'
import {Footer} from '../Components/Footer'
import { AboutUs } from '../Components/AboutUs'

const SobreNosotros = () => {

    return(
    <div className="grid grid-cols-1 gap-4 bg-black">
        <div><Header/></div>
        <div><AboutUs/></div>
        <div ><Footer/></div>
    </div>
    )
}

export default SobreNosotros;