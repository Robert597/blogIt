import signImg from './lightt.png';
import { auth } from './firebase';
import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import DataContext from './context/datacontext';
import { getDoc, doc } from 'firebase/firestore';
import "./login.css";
import { Link } from 'react-router-dom';

const Login = () => {
    const [loginemail, setEmail] = useState('');
    const [loginpassword, setPassword] = useState('');
    const [logging, setIsLogging] = useState(false);
    const [logError, setLogError] = useState(false);
    const [errormessage, setErrorMessage] = useState('');
    const {setUserName, setUserImage, usersCollectionRef, authUser, setAuthUser} = useContext(DataContext)
    let navigate = useNavigate();
    const loginAuth = async () => {
        try{
            setIsLogging(true);
            const user = await signInWithEmailAndPassword(auth, loginemail, loginpassword).then(async (cred) => {
                const data = await getDoc(doc(usersCollectionRef, cred.user.uid));
         
            let userdata = {...data.data()};
               setUserName(userdata.name);
              setUserImage(userdata.picture);
         });
        await setAuthUser(true);
    navigate("/home");
        }catch(err) {
            setLogError(true);
            setErrorMessage(err.message)
        }finally{
            setIsLogging(false);

        }
    }
    return (
        
        <div className='Login'>
     
             <div className="loginTop">
                <div className='imgContainer'><img src={signImg} alt = "Sign up image" /></div>
                <div className="custom-shape-divider-bottom-1642343645">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
    </svg>
</div>
</div>
{logging && <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
{!logging && <>
<div className='loginText'><p>
    Welcome Onboard!
    </p></div>
<div className='loginFormContainer'>
<form className='loginForm' onSubmit={(e) => e.preventDefault()}>
<input type="text" placeholder="Email" value={loginemail} onChange={(e) => setEmail(e.target.value)}/>
<input type="text" placeholder="password" value={loginpassword} onChange={(e) => setPassword(e.target.value)}/>
{logError && <p style={{color: "red", fontSize: "18px", fontFamily: "poppins"}}>{errormessage}</p>}
<p className='forgot'><a href='#'>Forgot password</a></p>
<button onClick={() => loginAuth()}>Login</button>
</form>
<p className='adjacent'>You don't have an account?<Link to="/signup" className='adjacentLink'>Sign Up</Link></p>
</div>
</>
}

</div>

    );
};
 
export default Login;
