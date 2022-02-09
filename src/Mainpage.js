import brand from "./dark.svg";
import logo from "./mainlogo.png";
import "./mainpage.css";
import { Link } from "react-router-dom";
const Mainpage = () => {
    return (
        <div className="introContainer">
           <div className="brandContainer"><img src={brand} alt={brand} /></div>
           <div className="logoContainer"><img src={logo} alt={logo} /></div>
           <div className="blogText">
               <p>
                   BlogIt is an amazing blog app designed with the intentions for users to let the world know of their thoughts, a platform to share memories, relive other people memorable events, connect with people all around the world, hear what others have to say and most importantly gain knowledge.
               </p>
           </div>
           <Link className="link"  to="/login"><button className="login">Login</button></Link>
           <Link className="link" to="/signup"><button className="signup">Signup</button></Link>
        </div>
    )
}

export default Mainpage;
