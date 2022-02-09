import React from 'react';
import { FaRegWindowClose, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import navLogo from "./mainlogo.png";
import "./nav.css";
import DataContext from './context/datacontext';
import { useContext } from 'react';
import {Link} from "react-router-dom";
import {FaPencilAlt} from "react-icons/fa"
const Nav = () => {
    const {username, userimage, navShow, setNavShow, hide, setHide, handleSubmit, logout, filename, setFileName, editError, editErrorMessage, editLoading, setUserName} = useContext(DataContext);

    const navClose = () => {
        setNavShow(false)
        setHide(true);
    }
  return (

  <div className={navShow? "navPage navShow": "navPage navHide"}>
      <div className='navTop'>

         <div className='NavCancel'>
         <div className='fileDelete' onClick={() => navClose()}>
        <FaRegWindowClose className='fileCancel'/>
    </div>
    <div className='navLogoContainer'>
        <img src={navLogo} alt="navLogo"/>
    </div>
         </div>

         <div className='navUserInfo'>
             <div className='editimage'>
            <div className='navUserImage'>
                <img src ={userimage} alt='userImage'/>
            </div>
            <FaPencilAlt className='navPencil' onClick={() => setHide(false)}/>
            </div>
            <div className='navUserName'>
                <p>{username}</p>
            </div>
    
         </div>

      <div className="custom-shape-divider-bottom-1642343645">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
    </svg>
</div>
      </div>
     
      <div className='navContent'>
      <div className={hide ? "Navmenu linkShow" : "Navmenu linkHide"}>
                    <ul className="navmenuList">
                        <li key = "homeLink" onClick={() => setNavShow(false)}><Link className="navlink" to = "/home">Home</Link></li>
                        <li key = "postLink" onClick={() => setNavShow(false)}><Link className="navlink" to = "/post">Post</Link></li>
                        <li key = "bookmarkLink" onClick={() => setNavShow(false)}><Link className="navlink" to = "/bookmark">Bookmark</Link></li>
                        <button className='logOutBtn'
                        onClick={() => logout()}>Logout</button>
                    </ul>
                   
                </div> 
                <div className={hide?"navForm linkHide": "navForm linkShow"}>
                {editLoading && <div className="nav-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
                {editError && <p>{editErrorMessage}</p>}
      {!editLoading && !editError && <form className='formNav' onSubmit={(e) => handleSubmit(e)}>
            <input type="text" value={username} onChange={(e) => {setUserName(e.target.value)}}/>
            <div className='navFile'>
               <p>{filename}</p>
                <input type="file" name="file" id="navfile" onChange={(e) => setFileName(e.target.files[0].name)}/>
                <button onClick={(e) => {document.getElementById('navfile').click();
            e.preventDefault()}}>Upload Image</button>
          </div>
            <button className='lastBtn'>change</button>
        </form>
}
    </div>
      </div>

<div className='navFooter'>
    <div className='navFooterIcon'>
        <FaInstagram className='footerIcon'/>
        <FaFacebook className='footerIcon'/>
        <FaTwitter className='footerIcon'/>
    </div>
    <div className='navFooterText'>
      <p>&copy; 2022 Robert Oluwaseun</p>
    </div>
    
</div>

  </div>
 
  );
};

export default Nav;
