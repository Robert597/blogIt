import signImg from './lightt.png';
import { auth} from './firebase';
import { useState, useContext } from 'react';
import {createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom';
import DataContext from './context/datacontext';
import {  doc, setDoc } from 'firebase/firestore';
import "./login.css";

const Signup = () => {
    const [useremail, setEmail] = useState('');
    const [userpassword , setPassword] = useState('');
    const [signing, setIsSigning] = useState(false);
    const [signError, setSignError] = useState(false);
    const [signmessage, setSignMessage] = useState('');
    const {username, setUserName, usersCollectionRef, userimage, setAuthUser} = useContext(DataContext);
    let navigate = useNavigate();
const signAuth = async () => {
    try{
    setIsSigning(true);
const user = await createUserWithEmailAndPassword(auth, useremail, userpassword).then((cred) => {
    var dbUser = setDoc(doc(usersCollectionRef,cred.user.uid), {
        name: username,
        picture: userimage
    })
    
})
await setAuthUser(true);
navigate("/home");
    }catch(err){
console.log(err.message);
setSignError(true);
setSignMessage(err.message);
    } finally {
        setIsSigning(false);
    }
}

return (
        <div className='Signup'>
            <div className="signupTop">
                <div className='imgContainer'><img src={signImg} alt = "Sign up image" /></div>
                <div className="custom-shape-divider-bottom-1642343645">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
    </svg>
</div>
</div>
{signing && <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
{!signing && <>
<div className='signupText'><p>
    Welcome Onboard!
    </p></div>
<div className='signupFormContainer'>
<form className='signupForm' onSubmit={(e) => e.preventDefault()}>
<input type="text" placeholder="fullName"/>
<input type="text" placeholder="Username" value={username} onChange={(e) => { setUserName( e.target.value)
} }/>
<input type="text" placeholder="Email" value={useremail} onChange={(e) => setEmail(e.target.value)}/>
<input type="password" placeholder="password" value={userpassword} onChange={(e) => setPassword(e.target.value)}/>
{signError && <p style={{color: "red", fontSize: "18px", fontFamily: "poppins"}}>{signmessage}</p>}
<button onClick={() => signAuth()}>Sign Up</button>
</form>
<p className='adjacent'>You have an account?<Link to="/login" className='adjacentLink'>Login</Link></p>
</div>
</>
}
 </div>
 
    );
};

export default Signup;
