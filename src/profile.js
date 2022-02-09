import React from 'react';
import { useContext, useState } from 'react';
import DataContext from './context/datacontext';import "./profile.css";
import { FaCross, FaPencilAlt, FaRegWindowClose } from 'react-icons/fa';
import { auth } from './firebase';

   

    const Profile = () => {
        const { username, setUserName, userimage, setUserImage, classClicked, setClassClicked, usersCollectionRef, hide, setHide, handleSubmit, logout, filename, setFileName, editErrorMessage, editError, editLoading} = useContext(DataContext);
  return (
  <div className={classClicked ? "profileContainer comeup" : "profileContainer comedown" }>
      <div className='mainprofile'>
          <div className={hide?"userNameImg show": "userNameImg hide"}>
      <div className='profileImg'>
          <img src={userimage} alt="profilePicture"/>
    </div>
    <div className='profilename'>
        <p>{username}</p>
    </div>
    <button className="editProfile" onClick={() => setHide(false)}>Edit Profile</button>
    </div>
    
    <div className={hide?"profileForm hide": "profileForm"}>
    {editLoading && <div className="prof-roller"><p>Loading...</p></div>}
    {editError && <p>{editErrorMessage}</p>}
     { !editLoading && !editError &&  <form className='formProfile' onSubmit={(e) => handleSubmit(e)}>
            <input type="text"/>
            <div className='profileFile'>
                <p >{filename}</p>
                <input type="file" name="file" id="file" onChange={(e) => setFileName(e.target.files[0].name)}/>
            <FaPencilAlt className='filePencil' onClick={() => document.getElementById('file').click()}/>
            </div>
            <button>change</button>
        </form>
    }
    </div>
    <div className='logDelete'>
    <button className='logOut' onClick={() => logout()}> Logout</button>
    <div className='fileDelete' onClick={() => {setClassClicked(false); setHide(true)}}>
        <FaRegWindowClose className='fileCancel'/>
    </div>
    </div>
    </div>
  </div>);
};

export default Profile;
