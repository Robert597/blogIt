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
          <button className="login"> <Link className="link"  to="/login">Login</Link></button>
           <button className="signup"> <Link className="link" to="/signup">Signup</Link></button>
        </div>
    )
}

export default Mainpage;
