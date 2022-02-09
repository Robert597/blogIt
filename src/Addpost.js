import React from 'react';
import Header from './header';
import postLogo from "./postimg.svg";
import { storage } from './firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useContext, useState} from 'react';
import DataContext from './context/datacontext';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, addDoc, onSnapshot} from "firebase/firestore";
import {format} from 'date-fns';
import {FaArrowLeft, FaPlus} from "react-icons/fa";
import "./Addpost.css";

const Addpost = () => {
  const [filename, setFileName] = useState('click icon to add image...');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [uploadErrorMessage, setUploadErrorMessage] = useState('');

  let navigate = useNavigate();
  const {title, setTitle, body, setBody, postsCollectionRef, username, posts, likesCollectionRef, userimage} = useContext(DataContext);
  const formHandler = async (e) => {
    e.preventDefault();
    const file = e.target[1].files[0];
    try{
      setUploading(true);
      await uploadImage(file);
    }catch(err){
      setUploadError(true);
      setUploadErrorMessage(err.message);
    }finally{
      setUploading(false);
      setTitle('');
      setBody('');
    }
    
   navigate("/home");
   
}

const uploadImage =  async (file) => {
 
  if (!file) return;
  const storageRef = ref(storage, `/images/${file.name}`);
  const uploadTask =  await uploadBytesResumable(storageRef, file);
  const url = await getDownloadURL(storageRef);

const d = new Date();
  const greatest = posts.sort(function(a, b) {
    return (a.postId - b.postId);
})
  const id = await greatest.length ? greatest[greatest.length - 1].postId + 1 : 1;
  await addDoc(postsCollectionRef, {postTitle: title, postBody: body, postImage: url, postId: id, postAuthor: username, postTime: format(d, 'MMMM dd, pp'), postAutImage: userimage});
 
  await addDoc(likesCollectionRef,{
    id: id,
    likeCount: 0,
    dislikeCount: 0,
    user: []
} );

 }
  

  return (
  <div className='addPost'>
      <div className='postHeader'>
        <div className='backIcon'>
          <FaArrowLeft className='backicon' onClick={() => navigate("/home")}/>
        </div>
      </div>
      {uploading && <div className="add-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
      {uploadError && <p>{uploadErrorMessage}</p>}
      { !uploading && !uploadError && <div className='formContainer'>
         <div className='postImg'><img src={postLogo} alt="postImage"/></div> 
          <form className = "postForm" onSubmit={(e) => formHandler(e)}>
            <input type="text" placeholder = "title" required value={title} onChange={(e) => setTitle(e.target.value)}/>
            <div className='filePlaceholder'>
              <p>{filename}</p>
            <input type="file"placeholder='image' name='upload' required id='upload' onChange={(e) => setFileName(e.target.files[0].name)} style={{display: "none"}}/>
            <div className='uploadIconCont'><FaPlus className='uploadIcon' onClick={() => document.getElementById('upload').click()}/></div>
            </div>
            <textarea required placeholder='post body...'  value={body} onChange={(e) => setBody(e.target.value) }></textarea>
            <button>Post</button>
          </form>
      </div>
}
  </div>);
};

export default Addpost;

