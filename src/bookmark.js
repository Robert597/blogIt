import React from 'react';
import { useContext } from 'react';
import DataContext from './context/datacontext';
import { FaArrowLeft, FaArrowRight, FaRegWindowClose } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';

const Bookmark = () => {
   const { savedpost, username, deletesavedpost}  = useContext(DataContext);
   let navigate = useNavigate();
  return (
  <div className='bookmark'>
     <div className='bookmarkHeader'>
        <div className='headerIcon'>
          <FaArrowLeft className='backicon' onClick={() => navigate("/home")}/>
        </div>

        <div className='postHeaderPost'>
        <p>Bookmark</p>
        </div>
      </div>

     

<div className='bookmarkPost'>
      {savedpost.filter(post => post.postSaver === username).length > 0 ?
savedpost.map((post) => {
  if(post.postSaver === username){
    return ( <div className="postContainer">
      <div className="PostDelete"  onClick={(e) => {
   document.getElementById(post.postId).style.display = "block";
        }}>
        <FaRegWindowClose className='savePostDeletIcon' />
      </div>
    <div className='confirmDelete' id={post.postId}>
      <div className='confirmDeleteText'>
        <p>Are you sure you want to unsave post?</p>
      </div>

      <div className='confirmDeleteButtons'>
        <button className='deleteYes' onClick={() => {
          deletesavedpost(post.id);
          document.getElementById(post.postId).style.display = "none";
        }}>Yes</button>
        <button className='deleteNo' onClick={() => {
           document.getElementById(post.postId).style.display = "none";
        }}>No</button>
      </div>
    </div>
        <div className="saveImage">
            <img src={post.postImage} alt="postImage"/>
        </div>
        <div className="postContent">
        <h2>{post.postTitle}</h2>
        <p>{post.postBody.length > 25 ? post.postBody.slice(0, 30) + '...': post.postBody}</p>
        </div>
        <div className="postinfoContainer">
            <p className="postuser">{post.postAuthor}</p>
            <p className="posttime">{post.postTime}</p>
        </div>
      <button className="viewButton"><Link to = {`/post/${post.postId}`} className="viewLink">View Post</Link><FaArrowRight className="viewArrow"/></button>
    </div>
)} else{
  return ;
}}
) : <div className="noPost"><p>No Post to Display</p></div>}
</div>
  </div>
  );
};

export default Bookmark;
/*
 onClick={() => {
                document.querySelector('.bookmarkBox').style.display = "none";
                document.querySelector('.postContent').style.opacity = 1;
         }}

          onClick={() => {
          document.querySelector('.bookmarkBox').style.display = "block";
          document.querySelector('.postContent').style.opacity = 0.5;
          
        }}
*/ 