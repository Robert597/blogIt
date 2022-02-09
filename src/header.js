import React from 'react';
import { useContext } from 'react';
import DataContext from './context/datacontext';
import { FaBorderStyle, FaSearch } from 'react-icons/fa';
import homeImg from "./mainlogo.png";
import {Link} from "react-router-dom";
import { FaBars } from 'react-icons/fa';
import "./header.css";

const Header = () => {
    const{userimage, searchvalue, setSearchValue,  comeUp, setNavShow} = useContext(DataContext);

    const searchHandler = (e) => {
        setSearchValue(e.target.value);
       // filteredPost();
    }
    const navSlide = () => {
        setNavShow(true);
    }
  return (
    <div className="homeTop">
                   <div className="navBar">
                <div className='imgContainer'><img src={homeImg} alt = "Sign up image" /></div>
                <div className="searchContainer">
                    <input type="text" placeholder="search posts..."
                    value={searchvalue}
                    onChange={(e) => searchHandler(e)}
                    onFocus={() => {
                        window.scrollTo(0, 0);
                    }}
                    tabIndex="-1"
                    /> 
                    <FaSearch className="searchIcon"/>
                </div>
                <div className="menu">
                    <ul className="menuList">
                        <li key = "homeLink"><Link className="navlink" to = "/home">Home</Link></li>
                        <li key = "postLink"><Link className="navlink" to = "/post">Post</Link></li>
                        <li key = "bookmarkLink"><Link className="navlink" to = "/bookmark">Bookmark</Link></li>
                    </ul>
                </div> 
                <div className="user" onClick={() => comeUp()}>
                    <img src={userimage} alt = "profile picture"/>
                </div>
                <div className='navMenu' onClick={() => navSlide()}>
                    <FaBars className='navMenuIcon'/>
                </div>
                </div>
                <div className="custom-shape-divider-bottom-1642343645">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
    </svg>
</div>
</div>
  );
};

export default Header;
