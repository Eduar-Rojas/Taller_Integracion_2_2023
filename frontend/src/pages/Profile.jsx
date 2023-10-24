import { Header } from '../Components/Header'
import { Footer } from '../Components/Footer'
import Profile_Body from '../Components/Profile_Body';

const Profile = () => {
    return (

        <div className="grid grid-cols-1 gap-4 bg-black">
            <div className='col-span-1'><Header /></div>
            <div className='col-span-1'><Profile_Body /></div>
            <div className='col-span-1'><Footer /></div>
        </div>

    );
}

export default Profile;