import { useParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import DataContext from './context/datacontext';
import { FaArrowLeft, FaRegWindowClose} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FaBookmark, FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { doc, updateDoc, collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import "./postpage.css";

const Postpage = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const { filteredpost, likes, username, postDeleteId, setPostDeleteId, handlePostDelete} = useContext(DataContext);
    
    const handleLike =  (id) => {
        document.querySelector(".thumbsUp").classList.add("book");
        setTimeout(() => {
            document.querySelector(".thumbsUp").classList.remove("book");
        }, 2000);
        likes.map((like) => {
            if(!(like.user.includes(`${username}like`)) && like.id === id && !(like.user.includes(`${username}dislike`))){
                like.likeCount++
                like.user.push(`${username}like`);
            } else if(like.user.includes(`${username}dislike`) && like.id === id && !(like.user.includes(`${username}like`)) ){
                like.dislikeCount--;
                like.likeCount++;
                const index = like.user.indexOf((`${username}dislike`));
                like.user.splice(index, 1);
                like.user.push(`${username}like`);
            }else{
                return like.likeCount;
            }
            var parent = document.getElementById(id);
            var child = parent.querySelector('.likeCont').children[1];
            child.innerHTML = like.likeCount;
        const selectedLike = doc(db, "likes", like.docId)
        updateDoc(selectedLike, {...like});
        })
      }

      const handleDislike =  (id) => {
        document.querySelector(".thumbsDown").classList.add("book");
        setTimeout(() => {
            document.querySelector(".thumbsDown").classList.remove("book");
        }, 2000);
        likes.map((dislike) => {
            if(!(dislike.user.includes(`${username}dislike`)) && dislike.id === id && !(dislike.user.includes(`${username}like`))){
                dislike.dislikeCount++
                 dislike.user.push(`${username}dislike`);
            } else if(dislike.user.includes(`${username}like`) && dislike.id === id && !(dislike.user.includes(`${username}dislike`))){
                dislike.likeCount--;
                dislike.dislikeCount++;
                const index = dislike.user.indexOf((`${username}like`));
                dislike.user.splice(index, 1);
                dislike.user.push(`${username}dislike`)
            }else{
                return dislike.dislikeCount;
            }
            var parent = document.getElementById(id);
            var child = parent.querySelector('.dislikeCont').children[1];
            child.innerHTML = dislike.dislikeCount;
        const selectedLike = doc(db, "likes", dislike.docId)
        updateDoc(selectedLike, {...dislike});
        })
      }
     
     
   
    return (
    <div className='postPage'>
   
       <div className='postPageIcon'>
         <FaArrowLeft className='postBackicon' onClick={() => navigate("/home")}/>
       </div>
    

  { 
  filteredpost.map((post) => {
    const value = likes.filter((like) => {
        if(like.id === post.postId) {
            return like;
        }else {
            return ;
        }
    });
    const mainValue = value[0].likeCount;
    const hateValue = value[0].dislikeCount;

    const savePost = async (e) => {
    e.target.classList.add('book');
    setTimeout(() => {
        e.target.classList.remove("book");
    }, 2000);
    const savedCollectionRef = collection(db, "savedPosts"); 
    const savedPostData = await getDocs(savedCollectionRef);
    const savedPostDatas =  (savedPostData.docs.map((doc) => ({...doc.data()})));
    
if ( savedPostDatas.filter(savedpost => savedpost.postId === post.postId && savedpost.postSaver === username).length > 0) {
    return ;
}else{
    addDoc(savedCollectionRef, {...post, postSaver: username });
}
    }

    if(((post.postId).toString() === id)) {
        setPostDeleteId(post.id);
    return (
        <div className='opacity'>
        <div className='postPageImage' style={{backgroundImage : `url(${post.postImage})` }}>
    </div>
    
    
 <div className='handleLike'>
        <div id={post.postId} className='generalCont'>
            <div className="likeCont">
                <FaThumbsUp className="thumbsUp" onClick={() => handleLike(post.postId)}/>
                <span>{mainValue}</span>
            </div>

            <div className="dislikeCont">
                <FaThumbsDown className="thumbsDown" onClick={() => handleDislike(post.postId)}/>
                <span>{hateValue}</span>
            </div>
            <div><FaBookmark className='Bookmark' onClick={(e) => savePost(e)}/></div>
        </div>
        
 </div>
 
 <div className='userPostInfo'>
 
     <div className='postPageUserName'>
             <p>{post.postAuthor}</p>
         </div>
 
         <div className='postPageTime'>
             <p>{post.postTime}</p> 
         </div>
 </div>
 
 <div className='postPageTitle'>
     <p>{post.postTitle}</p>
 </div>
 
 <div className='postPageBody'>
     <p>{post.postBody}</p>
 </div>
 {post.postAuthor === username ? <div className='postDeleteContainer'>
     <FaRegWindowClose className='postDelete' onClick={() => {
         document.querySelector('.modalBox').style.display = "block";
         document.querySelector('.opacity').style.opacity = 0.4;
     }}/>
 </div> : null}
 </div>)
} ;
})
}
  <div className='modalBox'>
     <div className='modaltext'> <p> Are you sure you want to delete this post?</p></div>
     <div className='modalButtons'>
         <button className='yesBtn' onClick={() => handlePostDelete(postDeleteId)}>Yes</button>
         <button className='noBtn' onClick={() => {
                document.querySelector('.modalBox').style.display = "none";
                document.querySelector('.opacity').style.opacity = 1;
         }}>No</button>
     </div>
  </div>
  </div>
    )
}
  export default Postpage;

   
   
   